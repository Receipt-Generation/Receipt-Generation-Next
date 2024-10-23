'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Transition } from '@headlessui/react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { app } from './lib/firebase/config'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState<User | boolean | null>(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth(app);
  const router = useRouter();
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUser(user)
      if(!user){
        router.replace('/')
      }else{
        router.replace('/dashboard')
      }
    });

    return () => unsubscribe();
  }, []);


  const handleCreateAccount = () => {
    console.log('Create Account')
  }

  const handleLogin = async () => {
    if (!isLogin) {
      handleCreateAccount()
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user)
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  const toggleForm = () => setIsLogin(!isLogin)

  
  return !user && (
    <div className="min-h-screen flex flex-col bg-slate-100">
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-lg ">
          <CardHeader className="bg-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">
              <Transition
                show={true}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                as="span"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </Transition>
            </CardTitle>
            <CardDescription className="text-purple-100">
              <Transition
                show={true}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                as="span"
              >
                {isLogin ? 'Welcome back!' : 'Join us today!'}
              </Transition>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <Transition
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              as="div"
            >
              {isLogin ? (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input className="outline-none" id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input className="outline-none" id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                </form>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input className="outline-none" id="firstName" placeholder="" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input className="outline-none" id="lastName" placeholder="" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input className="outline-none" id="orgName" placeholder="Krishna Temple" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input className="outline-none" id="email" type="email" placeholder="manager@temp.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input className="outline-none" id="phone" type="tel" placeholder="+91 987654321" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input className="outline-none" id="address" placeholder="123 Main St, City, Country" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input className="outline-none" id="password" type='password' placeholder="*******" required />
                  </div>
                </form>
              )}
            </Transition>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300"
              type="submit"
              onClick={handleLogin}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors duration-300"
              onClick={toggleForm}
            >
              {isLogin ? 'Create new Account' : 'Back to Login'}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p> 2023 Your Company Name. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-teal-400 hover:text-teal-300 mx-2">Privacy Policy</a>
            <a href="#" className="text-teal-400 hover:text-teal-300 mx-2">Terms of Service</a>
            <a href="#" className="text-teal-400 hover:text-teal-300 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}