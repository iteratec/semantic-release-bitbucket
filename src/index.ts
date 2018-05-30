import { publish as publishBitbucket } from './publish';
import { verifyConditions as verifyBitbucket } from './verifyConfig';

export default {
  publish: publishBitbucket,
  verifyConditions: verifyBitbucket,
};
