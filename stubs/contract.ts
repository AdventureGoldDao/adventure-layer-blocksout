import type { SmartContract, SolidityscanReport } from 'types/api/contract';
import type { VerifiedContract, VerifiedContractsCounters } from 'types/api/contracts';

import { ADDRESS_PARAMS } from './addressParams';

// Unverified contract code with default properties
export const CONTRACT_CODE_UNVERIFIED = {
  creation_bytecode: '0x60806040526e', // Initial bytecode for contract creation
  deployed_bytecode: '0x608060405233', // Bytecode after deployment
  is_self_destructed: false, // Indicates if the contract can self-destruct
  has_methods_read: true, // Indicates if the contract has read methods
  has_methods_read_proxy: true, // Indicates if the contract has proxy read methods
  has_methods_write: true, // Indicates if the contract has write methods
  has_methods_write_proxy: true, // Indicates if the contract has proxy write methods
  has_custom_methods_read: true, // Indicates if the contract has custom read methods
  has_custom_methods_write: true, // Indicates if the contract has custom write methods
} as SmartContract;

// Verified contract code with detailed properties
export const CONTRACT_CODE_VERIFIED = {
  abi: [], // Application Binary Interface
  additional_sources: [], // Additional source files
  can_be_visualized_via_sol2uml: true, // Can be visualized using sol2uml tool
  compiler_settings: {
    compilationTarget: {
      'contracts/StubContract.sol': 'StubContract', // Target contract for compilation
    },
    evmVersion: 'london', // Ethereum Virtual Machine version
    libraries: {}, // Libraries used in the contract
    metadata: {
      bytecodeHash: 'ipfs', // Hashing method for bytecode
    },
    optimizer: {
      enabled: false, // Optimization status
      runs: 200, // Number of optimization runs
    },
    remappings: [], // Remappings for imports
  },
  compiler_version: 'v0.8.7+commit.e28d00a7', // Compiler version used
  creation_bytecode: '0x6080604052348', // Initial bytecode for contract creation
  deployed_bytecode: '0x60806040', // Bytecode after deployment
  evm_version: 'london', // Ethereum Virtual Machine version
  external_libraries: [], // External libraries used
  file_path: 'contracts/StubContract.sol', // File path of the contract
  is_verified: true, // Verification status
  name: 'StubContract', // Name of the contract
  optimization_enabled: false, // Optimization status
  optimization_runs: 200, // Number of optimization runs
  source_code: 'source_code', // Source code of the contract
  verified_at: '2023-02-21T14:39:16.906760Z', // Verification timestamp
  license_type: 'mit', // License type
  has_methods_read: true, // Indicates if the contract has read methods
  has_methods_read_proxy: true, // Indicates if the contract has proxy read methods
  has_methods_write: true, // Indicates if the contract has write methods
  has_methods_write_proxy: true, // Indicates if the contract has proxy write methods
  has_custom_methods_read: true, // Indicates if the contract has custom read methods
  has_custom_methods_write: true, // Indicates if the contract has custom write methods
} as unknown as SmartContract;

// Information about a verified contract
export const VERIFIED_CONTRACT_INFO: VerifiedContract = {
  address: { ...ADDRESS_PARAMS, name: 'StubContract' }, // Contract address and name
  coin_balance: '30319033612988277', // Coin balance of the contract
  compiler_version: 'v0.8.17+commit.8df45f5f', // Compiler version used
  has_constructor_args: true, // Indicates if the contract has constructor arguments
  language: 'solidity', // Programming language used
  market_cap: null, // Market capitalization
  optimization_enabled: false, // Optimization status
  tx_count: 565058, // Transaction count
  verified_at: '2023-04-10T13:16:33.884921Z', // Verification timestamp
  license_type: 'mit', // License type
};

// Counters for verified contracts
export const VERIFIED_CONTRACTS_COUNTERS: VerifiedContractsCounters = {
  smart_contracts: '123456789', // Total number of smart contracts
  new_smart_contracts_24h: '12345', // New smart contracts in the last 24 hours
  verified_smart_contracts: '654321', // Total number of verified smart contracts
  new_verified_smart_contracts_24h: '1234', // New verified smart contracts in the last 24 hours
};

// Solidity scan report for a contract
export const SOLIDITYSCAN_REPORT: SolidityscanReport = {
  scan_report: {
    contractname: 'BullRunners', // Name of the contract
    scan_status: 'scan_done', // Status of the scan
    scan_summary: {
      issue_severity_distribution: {
        critical: 0, // Number of critical issues
        gas: 1, // Number of gas-related issues
        high: 0, // Number of high severity issues
        informational: 0, // Number of informational issues
        low: 2, // Number of low severity issues
        medium: 0, // Number of medium severity issues
      },
      lines_analyzed_count: 18, // Number of lines analyzed
      scan_time_taken: 1, // Time taken for the scan
      score: '3.61', // Overall score
      score_v2: '72.22', // Version 2 score
      threat_score: '94.74', // Threat score
    },
    // eslint-disable-next-line max-len
    scanner_reference_url: 'https://solidityscan.com/quickscan/0xc1EF7811FF2ebFB74F80ed7423f2AdAA37454be2/blockscout/eth-goerli?ref=blockscout', // URL for the scan report
  },
};
