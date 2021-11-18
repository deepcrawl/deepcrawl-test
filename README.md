# Automation Hub Tools

[<img src="https://www.deepcrawl.com/wp-content/themes/deepcrawl/images/logo-footer.svg">](https://www.deepcrawl.com/)

## Introduction

Automation Hub is a platform for ensuring that deployments are not causing SEO regressions. It works by connecting DeepCrawl to your CI/CD pipeline to kick off a crawl of a staging or development environment, and returns a "passed" or "failed" status along with notifications about the specific regressions.

Users can define specific tests, thresholds, and severity of regressions in the Automation Hub app, as well as view test results or set notification preferences.

## Connecting Automation Hub to your CI pipeline

At the moment we offer the following possibilites of connecting Automation Hub to your CI/CD pipeline:

- [Automation Hub Github Action](https://github.com/deepcrawl/deepcrawl-test-action)
- [Automation Hub CircleCI Orb](https://github.com/deepcrawl/deepcrawl-test-orb)
- [Automation Hub CLI Tools](./packages/test-cli/README.md)
- [Automation Hub SDK NodeJS Client](./packages/test-nodejs-sdk/README.md)
- [Automation Hub API](https://deepcrawl.github.io/automator-sdk/)

### Preventing Automation Hub from delaying or blocking builds

Crawling a test environment can take several minutes depending on the configured speed and number of URLs. During your initial usage of Automation Hub, you may not want Automation Hub to delay your builds, or have the ability to block a deployment.
In this case, you can configure the shell script to have a "start only" behaviour.

Under this strategy, the integration will start a crawl on the environment and then immediately return a passed status. The crawl will continue in the background and a notification will be sent when test results are ready.

## Configuring tests

When a Automation Hub crawl is run on your environment, Deepcrawl will crawl a sample of webpages and assert a number of configured tests against them. Tests can be configured to look at a specific issue (i.e. broken links), with a threshold (i.e. greater than 10 broken links), to cause a given result (Fail - block deployment, Warn - pass deployment but notify).

All configuration takes place within the Automation Hub app - contact your DeepCrawl Customer Success Manager for more information.

## Using the Automation Hub API

The Automation Hub API can directly be used, without using any of our options specified above. It uses the GraphQL protocol to make it easy to retrieve any information or make any changes you need. [You can find the full API documentation here.](https://deepcrawl.github.io/automator-sdk/)
