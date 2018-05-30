import btoa from 'btoa';
import fetch from 'node-fetch';

import { BitbucketPublishConfig } from '../bitbucketPlugnConfig';
import { PublishParams } from '../PublishParams';

export async function publish(pluginConfig: BitbucketPublishConfig, params: PublishParams) {
  const encodedCreds = btoa(`${process.env.BITBUCKET_USER}:${process.env.BITBUCKET_PASSWORD}`);
  const bitbucketUrl = pluginConfig.bitbucketUrl ?
    pluginConfig.bitbucketUrl.endsWith('/') ? pluginConfig.bitbucketUrl :
    `${pluginConfig.bitbucketUrl}/` : 'https://api.bitbucket.org/2.0/';
  const owner = pluginConfig.teamName ? pluginConfig.teamName : process.env.BITBUCKET_USER;
  const repoUrl = `${bitbucketUrl}repositories/${owner}/${pluginConfig.repositoryName}`;

  const branchInfo = await fetch(`${repoUrl}/refs/branches/${params.options.branch}`, {
    headers: {Authorization: `Basic ${encodedCreds}`},
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    }).then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
  // tslint:disable-next-line:max-line-length
  params.logger.log(`CommitId retrieved from Bitbucket is ${branchInfo.target.hash}, commitId provided as input is ${params.nextRelease.gitHead!}`);
  return fetch(`${repoUrl}/refs/tags`, {
    body: JSON.stringify({
      name: params.nextRelease.gitTag,
      target: {
        hash: branchInfo.target.hash,
      },
    }),
    headers: {'Authorization': `Basic ${encodedCreds}`, 'Content-Type': 'application/json'},
    method: 'POST',
  })
  .then((response) => {
    if (response.ok) {
      return true;
    } else {
      throw new Error(`Error HTTP${response.status} ${response.statusText}`);
    }
  })
  .catch((error) => {
    throw new Error(error);
  });
}
