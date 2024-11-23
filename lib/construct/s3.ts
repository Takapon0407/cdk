import { aws_s3 as s3, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

export class S3 extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new s3.Bucket(this, "s3", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
    });
  }
}
