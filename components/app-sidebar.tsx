"use client"

import * as React from "react"
import {
    Home,
    BadgePlus,
    ReceiptText,
    HandCoins,
} from "lucide-react"
import { FcMoneyTransfer } from "react-icons/fc";

import {
    Sidebar,
    SidebarContent,
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
        title: "Offline Donations",
        url: "/offdonation",
        icon: HandCoins,
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
        title: "QR Codes",
        url: "/paymentqrs",
        icon: ReceiptText,
    },
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" className="dark" {...props}>
            <SidebarHeader className=" items-center flex mb-2 border-b h-16 justify-center flex-row">
                <FcMoneyTransfer className="mr-2 text-3xl" />
                <h1 className="text-lg font-semibold text-zinc-100">Donation Manager</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem className=" text-zinc-400" key={item.title}>
                                    <SidebarMenuButton asChild className=" py-5">
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
            <SidebarRail />
        </Sidebar>
    )
}
