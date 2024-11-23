import { Construct } from 'constructs';
import { CfnConnection } from 'aws-cdk-lib/aws-codeconnections';
import { aws_codepipeline as pipeline, pipelines } from 'aws-cdk-lib';
import { AppStage } from './pipeline-stage';

export class CdkPipeline extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // const config = Config;
    const codePipeline = new pipeline.Pipeline(this, 'cdk-pipeline-pipeline', {
      crossAccountKeys: true,
      pipelineType: pipeline.PipelineType.V2,
      restartExecutionOnUpdate: false,
    });

    new CfnConnection(this, 'cdk-pipeline-connection', {
      connectionName: 'cdk-pipeline-connection',
      providerType: 'GitHub',
    });

    const cdkPipeline = new pipelines.CodePipeline(this, 'cdk-pipeline', {
      codePipeline: codePipeline,
      selfMutation: true,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection(
          `Takapon0407/cdk`,
          `main`,
          {
            connectionArn: `arn:aws:codeconnections:ap-northeast-1:945611748417:connection/d21725d1-5940-4a2c-8024-b0830305527f`,
            triggerOnPush: true,
          },
        ),
        commands: ['npm ci', 'npm run build', 'npm run cdk synth'],
      }),
    });

    const prdWave = cdkPipeline.addWave('prd');
    const prd = new AppStage(this, 'prd', {
      env: {
        account: '945611748417',
        region: 'ap-northeast-1',
      },
    });
    prdWave.addStage(prd);
  }
}
