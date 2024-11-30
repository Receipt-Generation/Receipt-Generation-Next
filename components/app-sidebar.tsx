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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    const path = usePathname()


    return (
        <Sidebar collapsible="icon" className=""  {...props}>
            <SidebarHeader className=" items-center flex mb-2  h-16 justify-center flex-row">
                <FcMoneyTransfer className="mr-2 text-3xl" />
                <h1 className="text-lg font-semibold text-zinc-900">Donation Manager</h1>
            </SidebarHeader>
            <SidebarContent className=" ">
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem className=" text-zinc-400" key={item.title}>
                                    <SidebarMenuButton asChild className={cn("py-5", path.split('\\')[0] === item.url ? " bg-second text-white" : " text-zinc-900")}>
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
