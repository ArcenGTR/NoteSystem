import { HomeIcon, File, UserRound } from "lucide-react";
import Link from "next/link";
import NavButton from "@/components/NavButton";
import { ModeToggle } from "./ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"; 
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { NavButtonMenu } from "./NavButtonMenu";

export function Header() {
    return (
        <header className="animate-slide h-12 p-2 border-b sticky top-0 z-20 bg-orange-100 dark:bg-gray-900">
            <div className="flex flex-row h-8 items-center justify-between mx-auto">
                
                <div className="flex items-center gap-2">
                    <NavButton href="/home" icon={HomeIcon} label="Home" />

                    <Link href="/home" className="flex justify-center gap-2 ml-0" title="Home">
                        <h1 className="hidden sm:block texzt-xl font-bold m-0 mt-1">
                            Repair Shop
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center">
                    <NavButton href="/tickets" icon={File} label="Tickets" />

                    <NavButtonMenu
                        icon={UserRound}
                        label="Customers Menu"
                        choises={[
                            { title: "Search Customers", href: "/customers" },
                            { title: "New Customer", href: "/customers/form" },

                        ]}
                    >

                    </NavButtonMenu>

                    <ModeToggle />

                    <Button variant="ghost" size="icon" aria-label="LogOut" title="Logout" className="rounded-full" asChild>
                        <LogoutLink>
                            <LogOutIcon></LogOutIcon>
                        </LogoutLink>
                    </Button>
                </div>

            </div>
        </header>
    )
}