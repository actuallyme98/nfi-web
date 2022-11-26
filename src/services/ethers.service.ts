import { ethers } from "ethers";

const ethereum = (window as any)?.ethereum;

const provider = new ethers.providers.Web3Provider(ethereum);

export const connectWallet = async () => {
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
};
