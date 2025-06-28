# Contributing to runtime-save

Thank you for your interest in contributing to runtime-save! This document provides guidelines and
instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Reporting Bugs

Bug reports help us improve runtime-save. When submitting a bug report, please include:

- A clear and descriptive title
- A detailed description of the issue
- Steps to reproduce the behavior
- Expected behavior
- Screenshots (if applicable)
- Environment information (browser/Node.js version, OS, etc.)

### Suggesting Features

We welcome feature suggestions. When submitting a feature request, please include:

- A clear and descriptive title
- A detailed description of the proposed feature
- Any relevant examples or mockups
- Explanation of why this feature would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests (`npm test` or `pnpm test`)
5. Commit your changes with a descriptive message
6. Push to the branch (`git push origin feature/your-feature`)
7. Open a Pull Request

#### Pull Request Guidelines

- Follow the existing code style
- Include tests for new features or bug fixes
- Update documentation as needed
- Keep PRs focused on a single change
- Link related issues in the PR description

## Development Setup

1. Clone your fork of the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Make your changes
4. Run tests to ensure everything works

## Commit Message Guidelines

Please use clear and descriptive commit messages. Consider using the following format:

```
type(scope): brief description

longer description if necessary
```

Types include:

- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting, missing semi-colons, etc; no code change
- refactor: code change that neither fixes a bug nor adds a feature
- test: adding or refactoring tests
- chore: updating build tasks, package manager configs, etc

## License

By contributing to runtime-save, you agree that your contributions will be licensed under the
project's [MIT License](LICENSE).
