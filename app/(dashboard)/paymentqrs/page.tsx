'use client'
import { getBalance, getProducts } from '@/server/actions/stripe'
import React from 'react'
import { Card, CardHeader, CardBody, Image, Chip, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import Link from 'next/link';
import QRCode from "react-qr-code";
import { Plus, Send } from 'lucide-react';
import {Skeleton} from "@nextui-org/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, Select, SelectItem } from '@/components/ui/select';


function page() {
  const [balance, setBalance] = React.useState(5)
  const [campaigns, setCampaigns] = React.useState([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  async function getData() {
    const bal = await getBalance()
    const pro = await getProducts()
    console.log(pro)
    setCampaigns(pro)
    setBalance(bal)
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <div className="min-h-screen flex items-center flex-col z-10 justify-center bg-gray-100 p-4">
      <div className=' flex flex-col h-full  w-full gap-2 flex-1  mt-12 p-5'>
        <header className=' h-16 shadow-md w-full flex justify-between px-5 rounded-lg items-center bg-first'>
          <h1 className=' text-xl font-semibold text-zinc-800'>Campaign QRs</h1>
          <h1>Current Balance: {balance}</h1>
        </header>
        <div className=' flex-1 p-5 h-full w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
        
          <Dialog>
            <DialogTrigger asChild>
              <div className=" bg-first shadow-md rounded-lg max-w-[400px] max-h-72 overflow-visible py-4 flex justify-center items-center">
                    <Plus size={64} />
              </div>
           
              
            </DialogTrigger>
            <DialogContent className=" text-zinc-800 shadow-3xl shadow-zinc-500/40 sm:max-w-[475px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new campaign
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  {/* <Label htmlFor="name" className="text-left">
                    First Name
                  </Label> */}
                  <Input
                  // onChange={(e) => setFirstName(e.target.value)}
                  // value={firstName}
                  isRequired
                    id="cname"
                    className="col-span-4 outline-none"
                    variant='bordered'
                    radius='sm'
                    label='Campaign Name'
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  {/* <Label htmlFor="username" className="text-left">
                    Last Name
                  </Label> */}
                  <Textarea
                  // onChange={(e) => setLastName(e.target.value)}
                  // value={lastName}
                    id="desc"
                    className="col-span-4 outline-none"
                    variant='bordered'
                    radius='sm'
                    label='Description'
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <div>
                    <Label htmlFor="amount" className="text-right">
                      Suggested Amount
                    </Label>
                    <Input
                    isRequired
                      // onChange={(e) => setAmount(parseFloat(e.target.value))}
                      id="amount"
                      type="number"
                      // value={amount.toString()}
                      className="col-span-3 outline-none"
                      variant='bordered'
                      radius='sm'
                  
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency" className="text-right">
                      Currency
                    </Label>
                    <Select required 
                    // defaultValue={currency}
                    // onValueChange={(value) => setCurrency(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Currency</SelectLabel>
                          <SelectItem key={1} value="USD">USD</SelectItem>
                          <SelectItem key={2} value="CAD">CAD</SelectItem>
                          <SelectItem key={3} value="INR">INR</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant='shadow' endContent={<Send size={20}/>} className=' text-white rounded-lg bg-fourth' size='md' type="submit">Create Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {campaigns.length > 0 ? campaigns.map((campaign, index) => (
            <Link href={`/paymentqrs/${campaign['id']}`} key={campaign['id']}>
            <Card className=" max-w-[400px] py-4 max-h-72" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold mb-2 text-2xl text-fourth text-nowrap truncate w-full overflow-hidden">{campaign['name']}</h4>
              <p className="text-tiny uppercase font-bold text-zinc-500">Started On: {new Date(campaign['created'] * 1000).toUTCString()}</p>
              <small className="text-default-500 font-bold">Status: {campaign['active'] ? <Chip color='success' size='sm' className='text-white'>Live</Chip> : <Chip color='danger' size='sm'>Not Live</Chip>}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-4 flex justify-center items-center">
              <QRCode value={campaign['id']} size={128} />
            </CardBody>
          </Card>
          </Link>
          )) : [...Array(4)].map((_, index) => (
          <Card className=" max-w-[400px] py-4 max-h-72" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
              <Skeleton className="rounded-lg w-full h-6">
                <h4 className="font-bold mb-2 text-2xl text-fourth text-nowrap truncate w-full overflow-hidden"></h4>
              </Skeleton>
              <Skeleton className="w-1/2 h-4 rounded-lg">
                <p className="text-tiny uppercase font-bold text-zinc-500"></p>
              </Skeleton>
              <Skeleton className="w-1/3 h-4 rounded-lg">
                <small className="text-default-500 font-bold"></small>
              </Skeleton>
            </CardHeader>
            <CardBody className="overflow-visible py-4 flex justify-center items-center">
              <Skeleton className="w-3/5 h-full rounded-lg"></Skeleton>
            </CardBody>
          </Card>
        ))}
        </div>
      </div>
      
    </div>
  )
}

export default page
