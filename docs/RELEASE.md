# Releasing Automation Hub CircleCI Orb

## Pre release

The Pre-Release is usually done in order to be tested by the QA. After it is validated, we can proceed with the release.

It is done from `develop` branch, by triggering the following event:

```bash
curl -H "Accept: application/vnd.github.everest-preview+json" \
     -H "Authorization: token ${GITHUB_PUBLISH_TOKEN}" \
     --request POST \
     --data '{"event_type": "prerelease"}' \
     https://api.github.com/repos/deepcrawl/deepcrawl-test/dispatches
```

## Release

Releasing is done from `develop` branch, by triggering the following event:

```bash
curl -H "Accept: application/vnd.github.everest-preview+json" \
     -H "Authorization: token ${GITHUB_PUBLISH_TOKEN}" \
     --request POST \
     --data '{"event_type": "prerelease"}' \
     https://api.github.com/repos/deepcrawl/deepcrawl-test/dispatches
```

_Note: Releasing is based on semver and the versioning will be handled automatically._
