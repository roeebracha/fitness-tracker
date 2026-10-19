import { matchPath, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useRef, useState } from "react";

import { useAuth } from "../../auth/AuthContext";
import { navItems } from "./navItems";
import { Button } from "@/components/ui/button";

import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

function UserMenu() {
  //state needed
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  //useRef needed
  const { user, logout } = useAuth();
  const name = user?.name || user?.username || "";
  const initial = name
    .split("")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleEnter() {
    setOpen(true);
    clearTimeout(closeTimer.current);
  }
  //function to handle the hover enter

  function handleLeave() {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }
  //function to handke when mouse leaves the avatar

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            <Button
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              variant="ghost"
              size="icon"
              className="rounded full"
            />
          }
        >
          <Avatar>
            <AvatarImage src={user?.picture} alt={name} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col gap-0.5 py-1.5">
              <span className="tuncate text-small font-medium text-foreground">
                {name}
              </span>
              <span className="truncate text-xs font-normal">
                {user?.email}
              </span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default function Topbar(){
const{pathname} = useLocation();

const current = navItems.find((item)=>
  matchPath({path: item.to, end: !!item.end},pathname),
);

  return(
  <header className="sticky top-0 flex h-16 items-center gap-2 border-b bg-background/80 px-4">
    <SidebarTrigger/>
    <Separator orientation="vertical"/>
    <div aria-hidden ="true" className="h-6 w-px shrink-0 bg-amber-700"> </div>

    <h1 className="text-sm font-semibold">{current?.lable}</h1>

    <div className="ml-auto">
      
    <UserMenu/>
    </div>
  </header>
  )
}