# @deepcrawl/test-sdk

Our public SDK, used to start builds on Deepcrawl Test App.

## Prerequisites

[Configure npm for use with GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package) by adding the following line to your `~/.npmrc` file:

```
@deepcrawl:registry=https://npm.pkg.github.com/
```

## Installation

Add `@deepcrawl/test-sdk` as a dependency:

Using NPM:

```shell
npm install @deepcrawl/test-sdk
```

Using Yarn:

```shell
yarn add @deepcrawl/test-sdk
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
