"use client"

import * as React from "react"
import {
    Home,
    BadgePlus,
    ReceiptText,
    HandCoins,
} from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import { FcMoneyTransfer } from "react-icons/fc";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Add Donations",
        url: "/add",
        icon: BadgePlus,
    },
    {
        title: "Transactions",
        url: "/transactions",
        icon: HandCoins,
    },
    {
        title: "Invoices",
        url: "/invoices",
        icon: ReceiptText,
    },
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUser()
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className=" items-center flex mb-2 border-b h-12 justify-center flex-row">
                <FcMoneyTransfer className="mr-2 text-3xl" />
                <h1 className="text-lg font-semibold">Donation Manager</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {user &&
                    <label htmlFor="user" className=" p-2 flex items-center border rounded-md bg-zinc-100 hover:bg-zinc-200 gap-2">
                        <UserButton />
                        <div className=" flex-1 h-full text-left text-sm leading-tight">
                            <h1 className="truncate font-semibold">{user.fullName}</h1>
                            <h2 className=" truncate text-xs">{user.primaryEmailAddress?.emailAddress}</h2>
                        </div>
                    </label>
                }
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
