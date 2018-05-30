import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as keytar from 'keytar';

import { verifyConditions } from '.';
import SemanticReleaseConfig from '../@types/SemanticReleaseConfig';
import SemanticReleaseContext from '../@types/SemanticReleaseContext';
import { SemanticReleasePlugin } from '../@types/SemanticReleasePlugin';
import { BitbucketPublishConfig } from '../bitbucketPlugnConfig';

describe('semantic-release-bitbucket', function() {

  before(function() {
    use(chaiAsPromised);
  });

  describe('verifyConditions', function() {
    let config: SemanticReleaseConfig;

    beforeEach(function() {
      process.env.BITBUCKET_USER = '';
      process.env.BITBUCKET_PASSWORD = '';
      config = {
        branch: '',
        noCi: true,
        repositoryUrl: '',
        tagFormat: '',
      };
    });

    it('should fail if BITBUCKET_USER is not set', function() {
      const context: SemanticReleaseContext = {
        logger: {
          // tslint:disable-next-line:no-empty
          log: (message: string) => {}},
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
      return expect(verifyConditions(config, context))
        .to.eventually.be.rejectedWith('Environment variable BITBUCKET_USER is not set.');
    });

    it('should fail if BITBUCKET_PASSWORD is not set', function() {
      process.env.BITBUCKET_USER = 'test';
      const context: SemanticReleaseContext = {
        logger: {
          // tslint:disable-next-line:no-empty
          log: (message: string) => {}},
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
      return expect(verifyConditions(config, context))
        .to.eventually.be.rejectedWith('Environment variable BITBUCKET_PASSWORD is not set.');
    });

    it('should fail if the name of the repository is not set in the config', function() {
      process.env.BITBUCKET_USER = 'test';
      process.env.BITBUCKET_PASSWORD = 'test';
      const context: SemanticReleaseContext = {
        logger: {
          // tslint:disable-next-line:no-empty
          log: (message: string) => {}},
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
      return expect(verifyConditions(config, context))
        .to.eventually.be.rejectedWith('\'repositoryName\' must be set in the publish config section.');
    });

    it('should attempt to login', async function() {
      await keytar.findCredentials('bitbucket').then((credentials) => {
        // In the typings for keytar in version 4.2.1 findCredentials() returns an object instead of an array
        process.env.BITBUCKET_USER = credentials[0].account;
        process.env.BITBUCKET_PASSWORD = credentials[0].password;
      });
      const context: SemanticReleaseContext = {
        logger: {
          // tslint:disable-next-line:no-empty
          log: (message: string) => {}},
        options: {
          branch: '',
          noCi: true,
          publish: [{
            path: '@iteratec/semantic-release-bitbucket',
            repositoryName: 'test',
          } as BitbucketPublishConfig & SemanticReleasePlugin],
          repositoryUrl: '',
          tagFormat: '',
        },
      };
      return expect(verifyConditions(config, context)).to.eventually.be.fulfilled;
    });

  });

});
