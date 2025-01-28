// app/dashboard/layout.tsx
import React from 'react'
import Navbar from '../components/navbar'  // Import Navbar from the components folder

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />  {/* Navbar will be visible on all pages under /dashboard */}
      <div>{children}</div>  {/* Render the page content here */}
    </div>
  )
}

export default DashboardLayout
