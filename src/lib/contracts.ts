import { Contract } from "ethers";
import type { ContractRunner, InterfaceAbi, ContractTransactionResponse } from "ethers";
import LendingPoolAbi from "../abi/LendingPool.json";
import ERC20Abi from "../abi/ERC20.json";
import { CONTRACTS } from "../config/constants";

// Narrow ABIs to ethers v6 InterfaceAbi instead of any
const LENDING_POOL_ABI = LendingPoolAbi as InterfaceAbi;
const ERC20_ABI = ERC20Abi as InterfaceAbi;

// Minimal typed contract surfaces we rely on
export type LendingPool = Contract & {
  createLendingOffer(
    lendToken: string,
    amount: bigint,
    interestRateBPS: number,
    durationSecs: number,
    collateralToken: string,
    collateralRatioBPS: number
  ): Promise<ContractTransactionResponse>;
};

export type ERC20 = Contract & {
  decimals(): Promise<number>;
  approve(spender: string, amount: bigint): Promise<ContractTransactionResponse>;
};

export function getLendingPool(runner: ContractRunner): LendingPool {
  return new Contract(CONTRACTS.LENDING_POOL, LENDING_POOL_ABI, runner) as LendingPool;
}

export function getERC20(address: string, runner: ContractRunner): ERC20 {
  return new Contract(address, ERC20_ABI, runner) as ERC20;
}
