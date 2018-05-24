export interface BitbucketPluginConfig {
  verifyConditions: string[];
  publish: {
    bitbucketUrl?: string;
    repositoryName: string;
    teamName?: string;
  };
}
