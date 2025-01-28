// components/Navbar.tsx
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center space-x-20">
        <h1 className="text-gray-200 text-2xl font-semibold">Wallet Tracker</h1>
        <div className="space-x-10">
          <Link href="/dashboard" className="text-gray-100 font-semibold hover:text-blue-800">Home</Link>
          <Link href="/dashboard/wallet" className="text-gray-100 font-semibold hover:text-blue-800">Wallet Control</Link>
          <Link href="/dashboard/transaction" className="text-gray-100 font-semibold hover:text-blue-800">Transaction History</Link>
          <button className="text-gray-100 font-semibold hover:text-blue-800">
            Disconnect
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
