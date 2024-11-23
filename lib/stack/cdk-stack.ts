import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkPipeline } from "../construct/cdk/pipeline";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CdkPipeline(this, "cdk");
  }
}
