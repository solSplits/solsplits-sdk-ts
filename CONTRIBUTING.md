# Contributing to SolSplits Web3 Client

We welcome and appreciate contributions from the developer community! This document will provide you with guidelines on how to contribute to the SolSplits Web3 Client project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Pull Requests](#pull-requests)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Contact](#contact)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive and inclusive environment for all contributors.

## Getting Started

1. Fork the repository on GitHub.

2. Clone your fork of the repository:
   \```
   git clone https://github.com/YOUR_USERNAME/solsplits-web3-client.git
   \```

3. Add the original repository as a remote called `upstream`:
   \```
   git remote add upstream https://github.com/ORIGINAL_OWNER/solsplits-web3-client.git
   \```

4. Keep your fork in sync with the upstream repository by regularly pulling changes:
   \```
   git pull upstream main
   \```

5. Install dependencies and build the project:
   \```
   npm install
   npm run build
   \```

## Reporting Issues

If you encounter a bug or want to request a new feature, please open an issue in the repository, providing a clear and concise description of the problem or feature. Include relevant information, such as error messages, screenshots, or code samples, to help us understand and reproduce the issue.

## Feature Requests

We welcome ideas for new features! Please open an issue describing the feature, its benefits, and any relevant technical details. We will discuss your proposal and decide whether it aligns with the project's goals and roadmap.

## Pull Requests

1. Create a new branch from the latest `main` branch in your fork:
   \```
   git checkout -b feature/your-feature-name main
   \```

2. Implement your changes and commit them using descriptive commit messages.

3. Push your branch to your fork:
   \```
   git push origin feature/your-feature-name
   \```

4. Create a pull request (PR) from your branch to the original repository's `main` branch. Include a clear description of your changes and any relevant context or motivation.

5. Address any feedback or requested changes from the maintainers. We will work with you to ensure your PR gets merged!

## Coding Guidelines

Please follow these coding guidelines to maintain consistency and readability throughout the project:

- Use ESLint and Prettier for consistent formatting.
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Write clear and concise comments explaining your code.

## Testing

Ensure that your changes pass all tests and do not introduce new issues:

1. Run the test suite:
   \```
   npm run test
   \```

2. Add new tests for any added functionality or bug fixes.

## Contact

If you have any questions or need help with your contribution, feel free to reach out to us through our [community Discord](https://discord.com/invite/fQDPHVxceP) or by opening an issue in the repository.

Thank you for your interest in contributing to SolSplits SDK! Your efforts will help create a better experience for all users.
