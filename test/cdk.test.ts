import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CdkStack } from '../lib/stack/cdk-stack';
import { AppStack } from '../lib/stack/app-stack';

test(`Matches the snapshot cdkStack`, () => {
  const app = new cdk.App();
  expect(
    Template.fromStack(
      new CdkStack(app, 'CdkStack', {
        env: {
          account: '945611748417',
          region: 'ap-northeast-1',
        },
      }),
    ).toJSON(),
  ).toMatchSnapshot();
});

test(`Matches the snapshot appStack`, () => {
  const app = new cdk.App();
  expect(
    Template.fromStack(new AppStack(app, 'AppStack')).toJSON(),
  ).toMatchSnapshot();
});
