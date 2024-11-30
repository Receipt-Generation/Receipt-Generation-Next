import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from './app-sidebar'

function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar className='bg-first border-none' />
    </SidebarProvider>
  )
}

export default Sidebar
