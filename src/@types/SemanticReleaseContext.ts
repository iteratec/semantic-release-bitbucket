import { Logger } from './Logger';
import { NextRelease } from './NextRelease';
import SemanticReleaseConfig from './SemanticReleaseConfig';
import SemanticReleasePluginConfig from './SemanticReleasePluginConfig';

export default interface SemanticReleaseContext {
  options: SemanticReleaseConfig & SemanticReleasePluginConfig;
  nextRelease?: NextRelease;
  logger: Logger;
}
