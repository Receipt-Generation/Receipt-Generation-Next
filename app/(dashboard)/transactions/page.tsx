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
  Spinner
} from "@nextui-org/react";

import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { Book, Search } from 'lucide-react';
import { cn } from '@/lib/utils';


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getPaginatedTransactions();
        setTransactions(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.includes(searchQuery) || transaction.email.includes(searchQuery) || transaction.receiptNo.toString().includes(searchQuery)
  );

  return (
    <div className=" p-20 dark flex-1 w-full flex flex-col items-center pt-12 h-full border ">
      <div className='w-full flex justify-center items-center gap-3'>
      <Input
        type="text"
        placeholder="Search by Name or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-1/2 my-3"
        variant='bordered'
        radius='sm'

        />
      <Button radius='sm' className=' bg-zinc-900 text-white' endContent={<Search size={20}/>} >
        Search
      </Button>
        </div>

      <Table isStriped  className="min-w-full">
        <TableHeader className=' bg-zinc-800'>
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
        isLoading={loading}
          // emptyContent={"No rows to display."}
        loadingContent={<Spinner label="Loading..." />}
        >
          {filteredTransactions ? filteredTransactions.map((transaction, i) => (
            <TableRow className=' text-zinc-200' key={transaction.tid}>
              <TableCell className="py-2">{transaction.receiptNo}</TableCell>
              <TableCell className="py-2 font-semibold">{transaction.name}</TableCell>
              <TableCell className="py-2">{transaction.amount.toFixed(2).toString()}</TableCell>
              <TableCell className="py-2">{transaction.currency}</TableCell>
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