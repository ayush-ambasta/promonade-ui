import React, { useContext } from 'react'
import { NavLink as Link, useNavigate} from 'react-router-dom';
import { Menu} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import UserContext from '@/contexts/UserContext';
import { ModeToggle } from './mode-toggle';

function Navbar(){
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const user=state.user;
  const handleLogout=(e)=>{
    e.preventDefault();
    // console.log('logout');
    dispatch({type: "LOGOUT"});
    navigate('/login');
  }
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between z-20">
        <h1 className="text-lg font-bold order-2 lg:order-1">Promonade</h1>
        {user && <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 lg:order-2">
        
          <Link
            to="/me"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            User
          </Link>
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Promotions
          </Link>
          <Link
            to="/analytics"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
          
        </nav>}
        {user && 
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
            <nav className="grid gap-6 text-lg font-medium order-1">
              <Link
                to="/me"
                className="text-muted-foreground hover:text-foreground"
              >
                User
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Promotions
              </Link>
              <Link
                to="/analytics"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>}
        <div className="order-3 lg:order-3">
          <div className='flex item-center gap-5'>
            <ModeToggle/>
            {user === null ? (<Button><Link to="/login">Login</Link></Button>) : (
              <Button onClick={handleLogout}>Log Out</Button>
            )}
          </div>
          
        </div>
      </header>
  )
}

export default Navbar;
