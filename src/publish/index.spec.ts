import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as keytar from 'keytar';

import { publish } from '.';
import { BitbucketPluginConfig } from '../bitbucketPlugnConfig';

describe('semantic-release-bitbucket', function() {
  before(function() {
    use(chaiAsPromised);
  });

  describe('publish', function() {
    beforeEach(() => {
      process.env.BITBUCKET_USER = '';
      process.env.BITBUCKET_PASSWORD = '';
    });

    it.skip('tag a commit in the repo', async function() {
      await keytar.findCredentials('bitbucket').then((credentials) => {
        // In the typings for keytar in version 4.2.1 findCredentials() returns an object instead of an array
        process.env.BITBUCKET_USER = credentials[0].account;
        process.env.BITBUCKET_PASSWORD = credentials[0].password;
      });
      const config: BitbucketPluginConfig = {
        publish: {
          repositoryName: 'test',
        },
        verifyConditions: [''],
      };
      const params = {
        logger: {
          // tslint:disable-next-line:no-empty
          log: (message: string) => {},
        },
        nextRelease: {
          gitTag: '1.0.0',
          notes: 'trallalala',
        },
        options: {
          branch: 'master',
          repositoryUrl: '',
        },
      };
      return expect(publish(config, params)).to.eventually.be.true;
    });
  });
});
