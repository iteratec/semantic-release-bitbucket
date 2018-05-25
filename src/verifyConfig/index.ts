import btoa from 'btoa';
import fetch from 'node-fetch';

import { BitbucketPluginConfig } from '../bitbucketPlugnConfig';

export async function verifyConditions(pluginConfig: BitbucketPluginConfig) {
  if (!process.env.BITBUCKET_USER) {
    throw new Error('Environment variable BITBUCKET_USER is not set.');
  }
  if (!process.env.BITBUCKET_PASSWORD) {
    throw new Error('Environment variable BITBUCKET_PASSWORD is not set.');
  }
  if (!pluginConfig.publish.repositoryName) {
    throw new Error('\'repositoryName\' must be set in the publish config section.');
  }
  const encodedCreds = btoa(`${process.env.BITBUCKET_USER}:${process.env.BITBUCKET_PASSWORD}`);
  const bitbucketUrl = pluginConfig.publish.bitbucketUrl ?
    pluginConfig.publish.bitbucketUrl.endsWith('/') ? pluginConfig.publish.bitbucketUrl :
      `${pluginConfig.publish.bitbucketUrl}/` : 'https://api.bitbucket.org/2.0/';
  const scope = pluginConfig.publish.teamName ? pluginConfig.publish.teamName : process.env.BITBUCKET_USER;
  return fetch(`${bitbucketUrl}repositories/${scope}/${pluginConfig.publish.repositoryName}`, {
      headers: {Authorization: `Basic ${encodedCreds}`},
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      return true;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
