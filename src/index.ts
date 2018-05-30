import SemanticReleaseConfig from './@types/SemanticReleaseConfig';
import SemanticReleaseContext from './@types/SemanticReleaseContext';
import { publish as publishBitbucket } from './publish';
import { verifyConditions as verifyBitbucket} from './verifyConditions';

let verified: boolean;

async function verifyConditions(pluginConfig: SemanticReleaseConfig, context: SemanticReleaseContext) {
  return verifyBitbucket(pluginConfig, context).then((success: boolean) => {
    verified = success;
  });
}

async function publish(pluginConfig: SemanticReleaseConfig, context: SemanticReleaseContext) {
  if (!verified) {
    await verifyBitbucket(pluginConfig, context);
  }
  return publishBitbucket(pluginConfig, context);
}

export {
  publish,
  verifyConditions,
};
