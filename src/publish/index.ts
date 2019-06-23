import btoa from 'btoa';
import fetch from 'node-fetch';

import SemanticReleaseConfig from '../@types/SemanticReleaseConfig';
import SemanticReleaseContext from '../@types/SemanticReleaseContext';
import { BitbucketPublishConfig } from '../bitbucketPlugnConfig';

export async function publish(pluginConfig: SemanticReleaseConfig, context: SemanticReleaseContext) {
  const encodedCreds = btoa(`${process.env.BITBUCKET_USER}:${process.env.BITBUCKET_PASSWORD}`);
  const publishConfig = context.options.publish!
    .find((p) => p.path === '@iteratec/semantic-release-bitbucket')! as BitbucketPublishConfig;
  const bitbucketUrl = publishConfig.bitbucketUrl ?
    publishConfig.bitbucketUrl.endsWith('/') ? publishConfig.bitbucketUrl :
    `${publishConfig.bitbucketUrl}/` : 'https://api.bitbucket.org/2.0/';
  const owner = publishConfig.teamName ? publishConfig.teamName : process.env.BITBUCKET_USER;
  const repoUrl = `${bitbucketUrl}repositories/${owner}/${publishConfig.repositoryName}`;

  return fetch(`${repoUrl}/refs/tags`, {
    body: JSON.stringify({
      name: context.nextRelease!.gitTag,
      message: context.nextRelease!.notes,
      target: {
        hash: context.nextRelease!.gitHead!,
      },
    }),
    headers: {'Authorization': `Basic ${encodedCreds}`, 'Content-Type': 'application/json'},
    method: 'POST',
  })
  .then((response) => {
    if (response.ok) {
      return {
        publishedTag: context.nextRelease!.gitTag,
      };
    } else {
      throw new Error(`Error HTTP${response.status} ${response.statusText}`);
    }
  })
  .catch((error) => {
    throw new Error(error);
  });
}
