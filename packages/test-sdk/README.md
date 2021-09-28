# @deepcrawl/test-sdk

Our public SDK, used to start builds on Deepcrawl Test App.

## Prerequisites

[Configure npm for use with GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package) by adding the following line to your `~/.npmrc` file:

```
@deepcrawl:registry=https://npm.pkg.github.com/
```

## Installation

Add `@deepcrawl/test-sdk` as a dependency:

```shell
yarn add --dev \
  eslint-config-deepcrawl \
  @typescript-eslint/eslint-plugin@^4.8.2 \
  eslint@^7.14.0 \
  eslint-plugin-array-func@^3.1.7 \
  eslint-plugin-clean-code@^0.1.12 \
  eslint-plugin-filenames@^1.3.2 \
  eslint-plugin-import@^2.22.1 \
  eslint-plugin-jest@^24.1.3 \
  eslint-plugin-json-format@^2.0.1 \
  eslint-plugin-no-loops@^0.3.0 \
  eslint-plugin-node@^11.1.0 \
  eslint-plugin-promise@^4.2.1 \
  eslint-plugin-sonarjs@^0.5.0
```

## Usage

### Creating the client

```typescript
const testSDKClient = TestSDKClient.create();
```

### Running a build

```typescript
await testSDKClient.runBuild({
  userKeyId: "Your API User Key ID", // Required
  userKeySecret: "Your API User Key Secret", // Required
  testSuiteId: "Your Test Suite ID", // Required
  ciBuildId: "Your CI Build Id", // Optional (Default: undefined), used for filtering, should reflect the build ID in your CI/CD pipeline
  isStartOnly: false, // Optional (Defaut: false), used for flagging if a build should only be started, without waiting for finalisation
});
```
