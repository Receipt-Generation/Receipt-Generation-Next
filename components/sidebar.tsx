import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './app-sidebar'

function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  )
}

export default Sidebar
