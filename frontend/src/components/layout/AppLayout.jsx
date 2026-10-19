import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {Outlet} from "react-router-dom"
import { TooltipProvider} from "@/components/ui/tooltip"
import{SidebarProvider, SidebarInset} from "@/components/ui/sidebar"
export default function AppLayout() {

  return (
   <TooltipProvider>
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Topbar />
        <main>
          <Outlet />
        </main>
        </SidebarInset>
        </SidebarProvider>
           </TooltipProvider>

      );
    }
  
