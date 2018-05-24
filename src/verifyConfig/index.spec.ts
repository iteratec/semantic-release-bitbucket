import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { verifyConditions } from '.';
import { BitbucketPluginConfig } from '../bitbucketPlugnConfig';

describe('semantic-release-bitbucket', function() {

  before(function() {
    use(chaiAsPromised);
  });

  describe('verifyConditions', function() {

    afterEach(function() {
      process.env.BITBUCKET_USER = '';
      process.env.BITBUCKET_PASSWORD = '';
    });

    it('should fail if BITBUCKET_USER is not set', function() {
      const config: BitbucketPluginConfig = {
        publish: {
          repositoryName: '',
        },
        verifyConditions: [''],
      };
      return expect(verifyConditions(config))
        .to.eventually.be.rejectedWith('Environment variable BITBUCKET_USER is not set.');
    });

    it('should fail if BITBUCKET_PASSWORD is not set', function() {
      process.env.BITBUCKET_USER = 'test';
      const config: BitbucketPluginConfig = {
        publish: {
          repositoryName: '',
        },
        verifyConditions: [''],
      };
      return expect(verifyConditions(config))
        .to.eventually.be.rejectedWith('Environment variable BITBUCKET_PASSWORD is not set.');
    });

    it('should fail if the name of the repository is not set in the config', function() {
      process.env.BITBUCKET_USER = 'test';
      process.env.BITBUCKET_PASSWORD = 'test';
      const config: BitbucketPluginConfig = {
        publish: {
          repositoryName: '',
        },
        verifyConditions: [''],
      };
      expect(verifyConditions(config))
        .to.eventually.be.rejectedWith('\'repositoryName\' must be set in the publish config section.');
    });

  });

});
