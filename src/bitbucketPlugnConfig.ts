import { SemanticReleasePlugin } from './@types/SemanticReleasePlugin';

export interface BitbucketPublishConfig extends SemanticReleasePlugin {
  bitbucketUrl?: string;
  repositoryName: string;
  teamName?: string;
}

export interface BitbucketPluginConfig {
  verifyConditions: string[];
  publish: BitbucketPublishConfig;
}
