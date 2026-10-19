import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { Activity } from "lucide-react";
import Icon from "./Icon";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <div className="flex shrink-0 size-8 items-center justify-center bg-primary text-primary-foreground rounded-lg">
                <Activity className="size-4" />
              </div>
              <span className="font-bold">Fitness tracker</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  tooltip={item.lable}
                  isActive={
                    !!matchPath({ path: item.to, end: !!item.end }, pathname)
                  }
                  render={<NavLink to={item.to} end={item.to} />}
                  onClick={() => setOpenMobile(false)}
                >
                  <Icon name={item.icon} />
                  <span>{item.lable}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail/>
    </SidebarRoot>
  );
}
