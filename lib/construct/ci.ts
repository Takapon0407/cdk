import { Construct } from "constructs";
import {
  Duration,
  RemovalPolicy,
  aws_codebuild as codebuild,
} from "aws-cdk-lib";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";

export class CdkCi extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const source = codebuild.Source.gitHub({
      owner: "Takapon0407",
      repo: "cdk",
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_CREATED,
        ),
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_UPDATED,
        ),
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_REOPENED,
        ),
        codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIs(
          "main",
        ),
      ],
    });
    const logGroup = new LogGroup(this, "cdk-ci-log", {
      logGroupName: "/cdk/ci",
      retention: RetentionDays.ONE_WEEK,
    });
    logGroup.applyRemovalPolicy(RemovalPolicy.DESTROY);

    const nCommand = 'n exec "$NODE_VERSION"';
    new codebuild.Project(this, "cdkCIProject", {
      source,
      badge: true,
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: [
              "echo n version is $(n -V)",
              'n "$NODE_VERSION"',
              `${nCommand} npm ci`,
            ],
          },
          build: {
            commands: [
              `${nCommand} npm run format-check`,
              `${nCommand} npm run lint-check`,
              `${nCommand} npm run test`,
            ],
          },
        },
      }),
      environmentVariables: {
        TZ: {
          value: "Asia/Tokyo",
        },
        NODE_VERSION: {
          value: "22",
        },
      },
      timeout: Duration.minutes(30),
      queuedTimeout: Duration.hours(1),
      logging: {
        cloudWatch: {
          logGroup,
          enabled: true,
        },
      },
    });
  }
}
