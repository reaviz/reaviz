# How to Contribute

This guide will run through the types of contributions you can make and how to set the reaviz repository up, ready for local development.

  - [Types of Contribution](#types-of-contribution)
    - [Bugs](#bugs)
    - [Features](#features)
  - [Development](#development)
  - [Codebase Overview](#codebase-overview)

## Types of Contribution

### Bugs

Open issues can be found on our [GitHub issues](https://github.com/reaviz/reaviz/issues) page.

If you begin working on a bug, post your intent on the issue itself. This will prevent more than one person tackling a bug at once.

If the bug you wish to work on doesn't currently have an issue, make one and label it "Bug".

### Features

Before adding any features, open a Feature Proposal as a [new issue](https://github.com/reaviz/reaviz/issues).

This will let us talk through your proposed API and/or implementation before you spend time on it.

## Development

Follow these steps to get your code PR-ready:

1. [Fork the repo](https://github.com/reaviz/reaviz).
2. Clone your fork locally.
3. Add your code and supporting tests.
4. If this is a feature that requires doc changes, make as necessary.
5. Update `CHANGELOG.md`.
6. Ensure your changes build by running `npm run build` in the appropriate package directory(s).

## Codebase Overview

All code and tests must be written in Typescript.
