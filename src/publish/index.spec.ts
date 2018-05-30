import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as keytar from 'keytar';

import { publish } from '.';
import SemanticReleaseContext from '../@types/SemanticReleaseContext';
import { SemanticReleasePlugin } from '../@types/SemanticReleasePlugin';
import { BitbucketPublishConfig } from '../bitbucketPlugnConfig';

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
      const config = {
        branch: '',
        noCi: true,
        repositoryUrl: '',
        tagFormat: '',
      };
      const context: SemanticReleaseContext = {
        logger: {
          // tslint:disable-next-line:no-empty
          log: (message: string) => {},
        },
        nextRelease: {
          gitTag: '1.0.0',
          notes: '',
        },
        options: {
          branch: '',
          noCi: true,
          publish: [{
            path: '@iteratec/semantic-release-bitbucket',
            repositoryName: '',
          } as BitbucketPublishConfig & SemanticReleasePlugin],
          repositoryUrl: '',
          tagFormat: '',
        },
      };
      return expect(publish(config, context)).to.eventually.be.true;
    });
  });
});
