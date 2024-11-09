'use client'

import { getPaginatedTransactions } from '@/server/actions/invoices';
import { Transactions } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Book } from 'lucide-react';
import { cn } from '@/lib/utils';


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getPaginatedTransactions();
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

  return (
    <div className=" p-20  flex-1 w-full flex flex-col items-center pt-12 h-full border ">
      <Input
        type="text"
        placeholder="Search by Name or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 mt-8 p-2 border w-1/2 border-zinc-400"
      />

      <Table className="min-w-full bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2">ID</TableHead>
            <TableHead className="py-2">Amount</TableHead>
            <TableHead className="py-2">Currency</TableHead>
            <TableHead className="py-2">Date</TableHead>
            <TableHead className="py-2">Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction, i) => (
            <TableRow key={transaction.tid} className={cn(i%2 === 0 ? 'bg-zinc-200/70': 'bg-zinc-100/70')}>
              <TableCell className="py-2">{transaction.name}</TableCell>
              <TableCell className="py-2">{transaction.amount}</TableCell>
              <TableCell className="py-2">{transaction.currency}</TableCell>
              <TableCell className="py-2">{transaction.date.toLocaleDateString()}</TableCell>
              <TableCell className="py-2">
                <Link href={`/invoice/${transaction.tid}`} className=' items-center hover:underline flex gap-2'>
                   <Book/> View Invoice
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsPage;