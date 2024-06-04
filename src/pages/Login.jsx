import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserContext from "@/contexts/UserContext";
import { login } from "@/services/userService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";


function Login() {
  const { toast } = useToast()
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const {state,dispatch,setteam} = useContext(UserContext);
  const user = state?.user || null;
  const navigate = useNavigate();

  useEffect(() => {
    if(user!==null){
      navigate('/');
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = await login(username, password);
      const data = JSON.stringify(response);
      localStorage.setItem('user', data);
      dispatch({type:'LOGIN',payload:response});
      navigate('/');
    }catch(e){
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: String(e).split(":")[1],
      })
      setusername('');
      setpassword('');
      return;
    }
    
  };
  const handleUsernameChange = (e) => {
    setusername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };
  return (
    <div className="flex min-h-[90vh] items-center justify-center px-6 lg:px-8">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input id="username" type="text" placeholder="username" required onChange={handleUsernameChange} value={username}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required onChange={handlePasswordChange}  value={password}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Sign in</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Login;