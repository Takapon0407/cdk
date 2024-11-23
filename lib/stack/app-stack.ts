import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3 } from "../construct/s3";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new S3(this, "s3");
  }
}
