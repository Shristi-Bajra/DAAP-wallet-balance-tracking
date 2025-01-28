// pages/index.js
import React from 'react'

const HomePage = () => {
  const balance = 0; 
  const walletAddress = "0x1234abcd5678efgh9012ijklmnopqrstu"; 

  return (
    <div className="bg-gray-100 min-h-screen p-8 space-x-32">
      {/* Welcome Section - Outside the Box */}
      <h1 className="text-4xl font-bold text-blue-800 mb-8 mx-10">
        Welcome to Wallet Balance Tracker
      </h1>

      {/* Flexbox Container for Total Balance and Recent Transactions */}
      <div className="flex space-x-32">
        {/* Total Balance and Wallet Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

          {/* Wallet Address Section */}
          <h1 className="text-xl font-semibold text-gray-700 mb-2">Total Balance</h1>
          <p className="text-sm text-gray-600 break-all">Your current wallet balance</p>

          {/* Total Balance Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between mb-2">
                <h1 className="text-xl font-semibold text-gray-700">Address:</h1>
                <p className="text-sm text-gray-600 break-all">{walletAddress}</p>
            </div>
            <div className="flex justify-between mb-2">
              <h1 className="text-xl font-semibold text-gray-700">Total Balance:</h1>
              <p className="text-2xl text-black font-bold">${balance}</p>
            </div>
          </div>
          
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-semibold text-gray-700 mb-2">Recent Transactions</h1>
          <p className="text-sm text-gray-600 break-all">Your recent wallet activities will appear here.</p>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-4">
              <p className="text-xl font-semibold text-gray-700">ETH: 0.001</p>
              <p className="text-xl font-semibold text-gray-700">USD: $2.00</p>
          </div>
        </div>
      </div>

      {/* Add a Wallet Network Display */}
      <div className="bg-white p-4 mt-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Network</h2>
        <p className="text-sm text-gray-600">You are currently connected to the Ethereum network</p>
      </div>

      {/* Add a Footer Section */}
      <footer className="mt-16 text-center text-gray-600">
        <p>Contact us: support@wallettracker.com</p>
        <p className="text-sm">Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  )
}

export default HomePage
