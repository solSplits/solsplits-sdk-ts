# SolSplits Web3 Client

This is a Web3 Typescript/Javascript client for the SolSplits Protocol, allowing developers to seamlessly interact with the SolSplits ecosystem. The package provides the following categories and a hard-coded value for our program ID:

- Accounts
- Errors
- Instructions
- PROGRAM_ID

## Installation

```bash
npm install @solsplits/solsplits-web3-client
```

## Accounts

The accounts module exposes four methods for interacting with different account types:

1. Config
2. Split
3. Receiver
4. Referral

## Errors

The errors module contains everything required to handle error logic and exposes different error types for smoother integration.

## Instructions

Instructions are the core of this package, providing all the logic for creating Split Contracts and interacting with the SolSplits Protocol.

## Usage

```javascript
import SolSplits from '@solsplits/solsplits-web3-client';

const { Accounts, Errors, Instructions, PROGRAM_ID } = SolSplits
// Example usage with the Accounts module
const configAccount = Accounts.config(params);

// Example usage with the Errors module
try {
  // Your logic here
} catch (error) {
  if (error instanceof Errors.CustomError) {
    console.error('A custom error occurred:', error.message);
  }
}

// Example usage with the Instructions module
const createSplitInstruction = Instructions.createSplit(params);
```

## License

This package is released under the [MIT License](LICENSE).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Support

If you have any questions, issues or feature requests, feel free to open an issue in the repository or reach out to us through our [Discord Community](https://discord.com/invite/fQDPHVxceP).
