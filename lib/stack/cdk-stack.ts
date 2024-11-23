import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CdkPipeline } from '../construct/cdk/pipeline';
import { GithubCredentials } from '../construct/github';
import { CdkCi } from '../construct/ci';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CdkPipeline(this, 'cdk');

    const credentials = new GithubCredentials(this, 'GithubCredentials');
    const ci = new CdkCi(this, 'CdkCi');
    ci.node.addDependency(credentials);
  }
}
