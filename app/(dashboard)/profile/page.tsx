"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@nextui-org/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@nextui-org/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BoxSelect, BoxSelectIcon, CheckCheck, Loader2 } from 'lucide-react'
import { useUser } from "@clerk/nextjs"
import { getOrganisation, removeStripeId } from "@/server/actions/profile"
import { Organisation } from "@prisma/client"
import { SelectIcon } from "@radix-ui/react-select"
import { verifyAPIKey } from "@/server/actions/stripe"

export default function ProfilePage() {
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false)
  const [stripeAccountId, setStripeAccountId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userData, setUserData] = useState<Organisation>({} as Organisation)
  const [bio, setBio] = useState("")
  const { user } = useUser();

  useEffect(() => {
    async function fetchData(email: string) {
        const response = await getOrganisation(email);
        console.log(response)
        if(response)  setUserData(response);
    }
    if (user) {
      console.log(user.fullName)
        fetchData(user.emailAddresses[0].emailAddress)
    }
  }, [user])

  const handleStripeDisconnect = async () => {
    if (!userData.oid) return;
    setIsLoading(true)
    const response = await removeStripeId(userData.oid);
    console.log(response)
    setIsLoading(false)
    if(response) setUserData({...userData, StripeId: null})
    setIsStripeModalOpen(false)
  }


  const handleStripeIntegration = async () => {
      if(!stripeAccountId) return;
      if(!userData.oid) return;
      setIsLoading(true)
    const verified = await verifyAPIKey(stripeAccountId, userData.oid);
    console.log(verified)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      // Reset after 2 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setIsStripeModalOpen(false)
      }, 2000)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-third p-8">
      <Card className="max-w-3xl w-1/4 mx-auto shadow-md">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organisation Name</Label>
            <Input id="org-name" value={userData.orgName} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={userData.orgAddr} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={userData.orgEmail} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Enter your organisation's bio"
              value={userData.orgDesc || ""}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="space-y-2 flex justify-between items-center w-full">
          <Dialog open={isStripeModalOpen} onOpenChange={setIsStripeModalOpen}>
            <DialogTrigger asChild>
                {userData && userData.StripeId ? (
              <Button variant='bordered' color="success" endContent={<CheckCheck/>}>Connected with Stripe</Button>
                ) : (
                  <Button variant='bordered' color="warning" className="">Connect Stripe</Button>
                )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Stripe Integration</DialogTitle>
                <DialogDescription>
                  Enter your Stripe API to integrate with our platform.
                </DialogDescription>
              </DialogHeader>
              {!isLoading && !isSuccess && (
                <>
                  <Input
                    placeholder="Stripe API Key"
                    disabled={userData.StripeId ? true : false}
                    value={userData.StripeId || stripeAccountId}
                    onChange={(e) => setStripeAccountId(e.target.value)}
                  />
                  <DialogFooter>
                    { userData.StripeId ? <Button color="danger" onClick={handleStripeDisconnect}>Disconnect</Button> : 
                    <Button onClick={handleStripeIntegration}>Submit</Button>
                    }
                  </DialogFooter>
                </>
              )}
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
              {isSuccess && (
                <div className="text-center text-green-600 p-4">
                  Stripe integration successful!
                </div>
              )}
            </DialogContent>
          </Dialog>
          <Button variant="solid" disabled className=" ml-2">Update Signature</Button>
            </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-fourth text-white" variant="solid" >Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}