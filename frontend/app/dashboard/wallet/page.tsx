"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import WallteAbi from "@/contracts/Wallet.json";
import ContractAddress from "@/contracts/contract-address.json";

interface StateType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

const walletContractAddress = ContractAddress.Wallet;
const contractABI = WallteAbi.abi;
const SEPOLIA_NETWORK_ID = "11155111";

const WalletBalanceTracker = () => {
  const [state, setState] = useState<StateType>({
    provider: null,
    signer: null,
    contract: null,
  });
  const [tab, setTab] = useState("deposit");
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.0000");
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState(""); // New state for recipient address
  const [account, setAccount] = useState<string | null>(null);
  const [walletContract, setWalletContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", async () => {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
            setUserAddress(accounts[0]);
            // Fetch balance for the new account
            const userBalance = await state.provider?.getBalance(accounts[0]);
            setBalance(userBalance ? ethers.formatEther(userBalance) : "0.0000");
          });

          if (ethereum.networkVersion === SEPOLIA_NETWORK_ID) {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });

            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
              walletContractAddress,
              contractABI,
              signer
            );
            setAccount(accounts[0]);
            setUserAddress(accounts[0]);
            setState({ provider, signer, contract });

            // Fetch the balance for the connected account
            const userBalance = await provider.getBalance(accounts[0]);
            setBalance(ethers.formatEther(userBalance));
          } else {
            setUserAddress("Please connect to the Sepolia network.");
          }
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.error(error);
        alert("Error connecting wallet");
      }
    };

    connectWallet();
  }, [state.provider]);

  const handleDeposit = async () => {
    // Validate input
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // if (!recipientAddress || !ethers.isAddress(recipientAddress)) {
    //   alert("Please enter a valid recipient address");
    //   return;
    // }

    if (!walletContract) {
      alert("Wallet contract not initialized");
      return;
    }

    try {
      // Call deposit function with recipient address
      const transaction = await walletContract.deposit(
        { value: ethers.parseEther(amount) }
      );
      await transaction.wait();
      alert("Deposit successful");

      // Update the balance
      const balance = await walletContract.getBalance();
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error(err);
      alert("Error depositing");
    }
  };

  const handleWithdraw = async () => {
    // Validate input
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // if (!recipientAddress || !ethers.isAddress(recipientAddress)) {
    //   alert("Please enter a valid recipient address");
    //   return;
    // }

    if (!walletContract) {
      alert("Wallet contract not initialized");
      return;
    }

    try {
      const transaction = await walletContract.withdraw(
        ethers.parseEther(amount),
      );
      await transaction.wait();
      alert("Withdraw successful");

      // Update the balance
      const balance = await walletContract.getBalance();
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error(err);
      alert("Error withdrawing");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 border border-gray-300 rounded-2xl shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Wallet Balance Tracker</h1>
        <p className="text-center text-gray-600 mb-6">Manage your Ethereum wallet balance</p>

        <div className="text-center">
          <h2 className="text-4xl font-semibold">{balance} ETH</h2>
          <p className="text-gray-500">Current Balance</p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-md ${tab === "deposit" ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setTab("deposit")}
          >
            Deposit
          </button>
          <button
            className={`px-4 py-2 rounded-md ${tab === "withdraw" ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setTab("withdraw")}
          >
            Withdraw
          </button>
        </div>

        {tab === "deposit" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Deposit</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (ETH)</label>
              <input
                type="text"
                placeholder="Enter amount to deposit"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
              <input
                type="text"
                placeholder="Enter recipient address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-800 text-white rounded-md" onClick={handleDeposit}>Deposit</button>
          </div>
        )}

        {tab === "withdraw" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Withdraw</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (ETH)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to withdraw"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Withdraw To (Address)</label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter the address"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-800 text-white rounded-md" onClick={handleWithdraw}>Withdraw</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletBalanceTracker;
