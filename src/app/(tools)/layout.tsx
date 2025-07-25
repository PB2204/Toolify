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
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between">
             <h1 className="font-headline text-2xl font-bold text-primary">
                <Link href="/">Toolify</Link>
             </h1>
             <ThemeToggle />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {allTools.sort((a, b) => a.name.localeCompare(b.name)).map((tool) => (
                <SidebarMenuItem key={tool.slug}>
                  <SidebarMenuButton asChild tooltip={tool.name}>
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
        <SidebarInset className="flex flex-col flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
