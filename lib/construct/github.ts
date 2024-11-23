import { SecretValue } from "aws-cdk-lib";
import { GitHubSourceCredentials } from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";

export class GithubCredentials extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GitHubSourceCredentials(this, "github-credentials", {
      accessToken: SecretValue.secretsManager("github/ci", {
        jsonField: "token",
      }),
    });
  }
}
