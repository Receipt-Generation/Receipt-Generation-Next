'use client'
import { Book, Plus, Send } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@nextui-org/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/react";
import { getPaginatedOfflineTransactions } from '@/server/actions/invoices'
import Link from 'next/link'
import { Transactions } from '@prisma/client'
import { Input } from '@nextui-org/react'
import { Label } from "@/components/ui/label"
import {Chip} from "@nextui-org/react";

export default function FileDrop() {
  const colorCurrency: Record<string, 'success' | 'warning' | 'primary'> = {
    "USD": 'success',
    "CAD": 'warning',
    "INR": 'primary'
  }
  // const [dots, setDots] = useState('')
  // const [processable, setProcessable] = useState(true)
  // const [files, setFiles] = useState<File[]>([])
  const [invoice, setInvoice] = useState<string>('')
  // const [sending, setSending] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0)
  const [purpose, setPurpose] = useState('gen')
  const [currency, setCurrency] = useState('USD')
  const [source, setSource] = useState('cash')
  const [transId, setTransId] = useState('')
  const [date, setDate] = useState(new Date())
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getPaginatedOfflineTransactions();
        setTransactions(response);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.includes(searchQuery) || transaction.email.includes(searchQuery)
  );


  function sendInvoice(){
    // setSending(true)
    const data = {
      Name: `${firstName} ${lastName}`,
      Email: email,
      Amount: amount,
      Currency: currency,
      DateOfDonation: date,
      PaymentStatus: 'Success',
      Source: source,
      Purpose: purpose,
      TransactionId: transId,
      Invoice: invoice
    }
    console.log(data)
  }

  useEffect(() => {
    // console.log(jsonData)
    console.log(invoice)
  }, [invoice])

  return (
    <div className="min-h-screen flex items-center flex-col z-10 justify-center bg-gray-100 p-4">
      <div className=' flex flex-col h-full  w-full gap-2 flex-1  mt-12 p-5'>
        <header className=' h-16 shadow-md w-full flex justify-between px-5 rounded-lg items-center dark bg-[#18181b]'>
          <h1 className=' text-xl font-semibold text-zinc-300'>Offline Donations</h1>
          <Input
            type="text"
            placeholder="Search by Name or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="  w-1/3 border-zinc-400"
            variant='bordered'
            radius='sm'
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='shadow' endContent={<Plus/>} className=' text-white rounded-lg' size='sm' color='success'>Create Receipt</Button>
            </DialogTrigger>
            <DialogContent className="dark text-zinc-200 shadow-3xl shadow-zinc-500/40 sm:max-w-[475px]">
              <DialogHeader>
                <DialogTitle>Create Receipt</DialogTitle>
                <DialogDescription>
                  Send receipts to donors for offline donations
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  {/* <Label htmlFor="name" className="text-left">
                    First Name
                  </Label> */}
                  <Input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  isRequired
                    id="fname"
                    className="col-span-4 outline-none"
                    variant='bordered'
                    radius='sm'
                    label='First Name'
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  {/* <Label htmlFor="username" className="text-left">
                    Last Name
                  </Label> */}
                  <Input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                    id="lname"
                    className="col-span-4 outline-none"
                    variant='bordered'
                    radius='sm'
                    label='Last Name'
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  {/* <Label htmlFor="email" className="text-left">
                    Email ID
                  </Label> */}
                  <Input
                  isRequired
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"  
                    type="email"
                    className="col-span-4 outline-none"
                    variant='bordered'
                    label='Email ID'
                    radius='sm'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="currency" className="text-left">
                      Purpose
                    </Label>
                    <Select defaultValue={purpose} required 
                   onValueChange={(value) => setPurpose(value)}
                    >
                      <SelectTrigger className=" col-span-3">
                        <SelectValue placeholder="Purpose of Donation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Purpose</SelectLabel>
                          <SelectItem value="gen">General Donation</SelectItem>
                          <SelectItem value="fbhoga">Full Day Bhoga</SelectItem>
                          <SelectItem value="farati">Full Day Arati</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="source" className="text-left">
                      Source
                    </Label>
                    <Select defaultValue={source} required
                    onValueChange={(value) => setSource(value)}
                    >
                      <SelectTrigger className=" col-span-3">
                        <SelectValue placeholder="Source of Donation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Purpose</SelectLabel>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="ontransfer">Online Transfer</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <div>
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                    isRequired
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      id="amount"
                      type="number"
                      value={amount.toString()}
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
                    defaultValue={currency}
                    onValueChange={(value) => setCurrency(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Currency</SelectLabel>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <div>
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                    isRequired
                      onChange={(e) => setDate(new Date(e.target.value))}
                      id="date"
                      type="datetime-local"
                      value={date.toISOString().split('Z')[0]}
                      className="col-span-3 outline-none"
                      variant='bordered'
                      radius='sm'

                    />
                  </div>
                  <div>
                    <Label htmlFor="invoice"  className="text-right">
                      Invoice Number
                    </Label>
                    <Input
                      onChange={(e) => setInvoice(e.target.value)}
                      value={invoice}
                      id="invoice"
                      type="text"
                      className="col-span-3 outline-none"
                      placeholder='Leave empty for auto-generate'
                      variant='bordered'
                      radius='sm'
                    />
                  </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transId" className="col-span-2 text-left">
                    Transaction ID
                  </Label>
                  <Input
                  onChange={(e) => setTransId(e.target.value)}
                  value={transId}
                    placeholder='Transaction ID (Optional)'
                    id="transId"
                    className="col-span-4 outline-none"
                    variant='bordered'
                    radius='sm'

                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant='shadow' endContent={<Send size={20}/>} className=' text-white rounded-lg' size='md' color='success' type="submit" onClick={sendInvoice}>Generate Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <div className=' flex-1 p-5 h-full w-full'>
          <Table className="min-w-full bg-white dark">
            <TableHeader>
                <TableColumn className="py-2">Name</TableColumn>
                <TableColumn className="py-2">Amount</TableColumn>
                <TableColumn className="py-2">Currency</TableColumn>
                <TableColumn className="py-2">Source</TableColumn>
                <TableColumn className="py-2">Date</TableColumn>
                <TableColumn className="py-2">Invoice</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.tid}  className=' text-zinc-300'>
                  <TableCell className="py-2">{transaction.name}</TableCell>
                  <TableCell className="py-2">{transaction.amount}</TableCell>
                  <TableCell className="py-2"> <Chip color={colorCurrency[transaction.currency]} size='sm'>{transaction.currency}</Chip></TableCell>
                  <TableCell className="py-2">{transaction.Source}</TableCell>
                  <TableCell className="py-2">{transaction.date.toLocaleDateString()}</TableCell>
                  <TableCell className="py-2">
                    <Link href={`/invoice/${transaction.tid}`} className=' items-center hover:underline flex gap-2'>
                      <Book /> View Invoice
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}