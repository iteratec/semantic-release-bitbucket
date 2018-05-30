export interface BitbucketPublishConfig {
  bitbucketUrl?: string;
  repositoryName: string;
  teamName?: string;
}

export interface BitbucketPluginConfig {
  verifyConditions: string[];
  publish: BitbucketPublishConfig;
}
