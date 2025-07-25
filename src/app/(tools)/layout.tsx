import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { allTools } from "@/lib/tools";
import Link from "next/link";
import { Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 -z-10 h-full w-full animated-gradient-bg" />
        <div className="absolute inset-0 -z-10 h-full w-full bg-background/80 backdrop-blur-2xl" />
        <SidebarProvider>
        <div className="flex min-h-screen">
            <Sidebar className="bg-transparent border-r border-white/10 text-slate-200">
            <SidebarHeader className="flex items-center justify-between p-4 border-b border-white/10">
                <h1 className="font-headline text-2xl font-bold text-white">
                    <Link href="/">Toolify</Link>
                </h1>
                <ThemeToggle />
            </SidebarHeader>
            <SidebarContent className="bg-transparent">
                <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" className="hover:bg-white/10 text-slate-200 data-[active=true]:bg-pink-500/20 data-[active=true]:text-white">
                    <Link href="/">
                        <Home />
                        <span>Dashboard</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                {allTools.sort((a, b) => a.name.localeCompare(b.name)).map((tool) => (
                    <SidebarMenuItem key={tool.slug}>
                    <SidebarMenuButton asChild tooltip={tool.name} className="hover:bg-white/10 text-slate-300 data-[active=true]:bg-pink-500/20 data-[active=true]:text-white">
                        <Link href={`/${tool.slug}`}>
                        <tool.icon />
                        <span>{tool.name}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarContent>
            </Sidebar>
            <SidebarInset className="flex flex-col flex-1 bg-transparent">
            {children}
            </SidebarInset>
        </div>
        </SidebarProvider>
    </div>
  )
}
