import { BitbucketPublishConfig } from './bitbucketPlugnConfig';
import { publish as publishBitbucket } from './publish';
import { PublishParams } from './PublishParams';
import { verifyConditions as verifyBitbucket} from './verifyConfig';

let verified: boolean;

async function verifyConditions(pluginConfig: BitbucketPublishConfig) {
  return verifyBitbucket(pluginConfig).then((success: boolean) => {
    verified = success;
  });
}

async function publish(pluginConfig: BitbucketPublishConfig, params: PublishParams) {
  if (!verified) {
    await verifyBitbucket(pluginConfig);
  }
  return publishBitbucket(pluginConfig, params);
}

export default {
  publish,
  verifyConditions,
};
