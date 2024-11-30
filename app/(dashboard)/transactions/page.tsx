'use client'

import { getPaginatedTransactions } from '@/server/actions/invoices';
import { Transactions } from '@prisma/client';
import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Chip
} from "@nextui-org/react";

import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { Book, Search } from 'lucide-react';



const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [firstloading, setFirstLoading] = useState(true);


  const colorCurrency: Record<string, 'success' | 'warning' | 'primary'> = {
    "USD": 'success',
    "CAD": 'warning',
    "INR": 'primary'
  }
  
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedTransactions(page+1);
      setPage((prev) => prev + 1);
      console.log(page)
      setTransactions((prevTransactions) => [...prevTransactions, ...response]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    setFirstLoading(false);
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.includes(searchQuery) || transaction.email.includes(searchQuery) || transaction.receiptNo.toString().includes(searchQuery)
  );

  return (
    <div className=" p-20  flex-1 w-full flex flex-col items-center pt-12 h-full border ">
      <div className='w-full flex justify-center items-center gap-3 my-6'>
      <Input
        type="text"
        placeholder="Search by Name or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-1/2 my-3"
        variant='bordered'
        radius='sm'

        />
      <Button radius='sm' className=' bg-fourth text-white' endContent={<Search size={20}/>} >
        Search
      </Button>
        </div>

      <Table isStriped  className="min-w-full max-h-[80vh] "
      isHeaderSticky
      aria-label="Transactions Table"
      bottomContent={
        (
          <div className="flex w-full justify-center ">
            <Button isDisabled={loading} variant="solid" onPress={fetchTransactions}>
              {loading && <Spinner className=' text-zinc-700' size="sm" />}
              Load More
            </Button>
          </div>
        ) 
      }>
        <TableHeader className=' bg- '>
          {/* <TableRow> */}
            <TableColumn className="py-2">Invoice ID</TableColumn>
            <TableColumn className="py-2" allowsSorting allowsResizing>Name</TableColumn>
            <TableColumn className="py-2">Amount</TableColumn>
            <TableColumn className="py-2">Currency</TableColumn>
            <TableColumn className="py-2">Email</TableColumn>
            <TableColumn className="py-2">Date & Time</TableColumn>
            <TableColumn className="py-2">Invoice</TableColumn>
          {/* </TableRow> */}
        </TableHeader>
        <TableBody
        isLoading={firstloading}
          // emptyContent={"No rows to display."}
        loadingContent={<Spinner className=' text-zinc-700' label="Loading..." />}
        >
          {filteredTransactions ? filteredTransactions.map((transaction) => (
            <TableRow className=' text-zinc-800' key={transaction.tid}>
              <TableCell className="py-2">{transaction.receiptNo}</TableCell>
              <TableCell className="py-2 font-semibold">{transaction.name}</TableCell>
              <TableCell className="py-2">{transaction.amount.toFixed(2).toString()}</TableCell>
              <TableCell className="py-2"><Chip size='sm' color={colorCurrency[transaction.currency as keyof typeof colorCurrency] as "default" | "success" | "warning" | "primary" | "secondary" | "danger"}>{transaction.currency}</Chip></TableCell>
              <TableCell className="py-2">{transaction.email}</TableCell>
              <TableCell className="py-2">{transaction.date.toLocaleString()}</TableCell>
              <TableCell className="py-2">
                <Link href={`/invoice/${transaction.tid}`} className=' items-center hover:underline flex gap-2'>
                   <Book/> View Invoice
                </Link>
              </TableCell>
            </TableRow>
          )) : 
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsPage;
