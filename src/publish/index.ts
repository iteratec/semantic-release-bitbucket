import btoa from 'btoa';
import fetch from 'node-fetch';

import { BitbucketPluginConfig } from '../bitbucketPlugnConfig';

interface NextRelease {
  gitTag: string;
  notes: string;
}

interface Options {
  branch: string;
  repositoryUrl: string;
}

interface Logger {
  log: (message: string) => void;
}

interface Params {
  options: Options;
  nextRelease: NextRelease;
  logger: Logger;
}

export async function publish(pluginConfig: BitbucketPluginConfig, params: Params) {
  const encodedCreds = btoa(`${process.env.BITBUCKET_USER}:${process.env.BITBUCKET_PASSWORD}`);
  const bitbucketUrl = pluginConfig.publish.bitbucketUrl ?
    pluginConfig.publish.bitbucketUrl.endsWith('/') ? pluginConfig.publish.bitbucketUrl :
    `${pluginConfig.publish.bitbucketUrl}/` : 'https://api.bitbucket.org/2.0/';
  const owner = pluginConfig.publish.teamName ? pluginConfig.publish.teamName : process.env.BITBUCKET_USER;
  const repoUrl = `${bitbucketUrl}repositories/${owner}/${pluginConfig.publish.repositoryName}`;

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
