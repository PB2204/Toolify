import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { allTools } from "@/lib/tools";
import Link from "next/link";
import { Home, Info, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full">
        <SidebarProvider>
        <div className="flex min-h-screen">
            <Sidebar className="border-r bg-transparent dark:border-white/10">
            <SidebarHeader className="hidden md:flex items-center justify-between p-4 border-b dark:border-white/10">
                <h1 className="font-headline text-2xl font-bold text-foreground dark:text-white">
                    <Link href="/">Toolify</Link>
                </h1>
            </SidebarHeader>
            <SidebarContent className="bg-transparent">
                <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" className="text-muted-foreground hover:bg-primary/20 hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:text-slate-200 dark:hover:bg-white/10 dark:data-[active=true]:bg-primary/20 dark:data-[active=true]:text-white">
                    <Link href="/">
                        <Home />
                        <span>Dashboard</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="About Us" className="text-muted-foreground hover:bg-primary/20 hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:text-slate-300 dark:hover:bg-white/10 dark:data-[active=true]:bg-primary/20 dark:data-[active=true]:text-white md:hidden">
                        <Link href="/about">
                            <Info />
                            <span>About Us</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Contact" className="text-muted-foreground hover:bg-primary/20 hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:text-slate-300 dark:hover:bg-white/10 dark:data-[active=true]:bg-primary/20 dark:data-[active=true]:text-white md:hidden">
                        <a href="https://mbwebbers.tech/contact" target="_blank" rel="noopener noreferrer">
                            <Mail />
                            <span>Contact</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <Separator className="my-2 md:hidden" />
                {allTools.sort((a, b) => a.name.localeCompare(b.name)).map((tool) => (
                    <SidebarMenuItem key={tool.slug}>
                    <SidebarMenuButton asChild tooltip={tool.name} className="text-muted-foreground hover:bg-primary/20 hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:text-slate-300 dark:hover:bg-white/10 dark:data-[active=true]:bg-primary/20 dark:data-[active=true]:text-white">
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
