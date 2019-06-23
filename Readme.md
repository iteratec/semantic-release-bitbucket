# @iteratec/semantic-release-bitbucket

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![latest npm package](https://img.shields.io/npm/v/@iteratec/semantic-release-bitbucket/latest.svg)](https://www.npmjs.com/package/@iteratec/semantic-release-bitbucket)
[![license](https://img.shields.io/npm/l/@iteratec/semantic-release-bitbucket.svg)](https://www.npmjs.com/package/@iteratec/semantic-release-bitbucket)

a [semantic-release](https://github.com/semantic-release/semantic-release) plugin to publish releases to Bitbucket.

## verifyConditions

verifies that environment variables for authentication via _username_ and _password_ are set.
It uses the Bitbucket Url from the config or defaults to Bitbucket Cloud.
It uses the _teamName_ and _repositoryName_ settings to compose the url and attempts to login.

## publish

creates a tag using the new version generated by sematic-release.
altough its not covered in the bitbucket documentation, api tag creation with message was released.

## Configuration

### Bitbucket authentication

The authentication parameters for Bitbucket are **required** and can be set via environment variables.
Consider using an app password instead of your account password.
See [App passwords](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html) in the Bitbucket documentation for further information.

### Environment variables

| Variable            | Description |
|---------------------|-------------|
| BITBUCKET_USER      | The username as given in the profile of repository owner. This can be your user or a team account. |
| BITBUCKET_PASSWORD  | The (app) password for the given user. |

### Options

| Option | Description |
|--------|-------------|
| bitbucketUrl | _Optional_. The url of the bitbucket server  **REST api**. Defaults to Bitbucket Cloud. |
| repositoryName | **_Required_**. The name of the repository to publish to |
| teamName | _Optional_. Is used as the repository owner portion in the url. BITBUCKET_USER is used as default if no `teamName` is given. |

### Usage

full configuration:

``` json
{
  "verifyConfig": [..., "@iteratec/semantic-release-bitbucket", ...],
  "publish": [
    ...,
    {
      "path": "@iteratec/semantic-release-bitbucket",
      "bitbucketUrl": "http://my.bitbucket.server",
      "teamName": "A-Team",
      "repositoryName": "bucket"
    },
    ...
  ]
}
```
minimum configuration:
``` json
{
  "verifyConfig": [..., "@iteratec/semantic-release-bitbucket", ...],
  "publish": [
    ...,
    {
      "path": "@iteratec/semantic-release-bitbucket",
      "repositoryName": "bucket"
    },
    ...
  ]
}
```
