import React, { useContext } from 'react'
import { NavLink as Link} from 'react-router-dom';
import { CircleUser, Menu} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import UserContext from '@/contexts/UserContext';

function Navbar(){
  const {user} = useContext(UserContext);
  console.log(user);
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <h1>Promonade</h1>
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            User
          </Link>
          <Link
            to="/promotions"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Promotions
          </Link>
          
          
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <h1>Promonade</h1>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground"
              >
                User
              </Link>
              <Link
                to="/promotion"
                className="text-muted-foreground hover:text-foreground"
              >
                Promotions
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div>
          {user === undefined ? (<Button><Link to="/login">Login</Link></Button>) : (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>
      </header>
  )
}

export default Navbar;
