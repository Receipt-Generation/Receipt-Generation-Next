'use server'

import {PrismaClient} from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const donationSchema = z.object({
    Name: z.string().min(1, { message: "Name is required" }),
    Email: z.string().email({ message: "Invalid email format" }),
    Currency: z.enum(['CAD', 'USD'], { message: "Invalid currency" }),
    Amount: z.number().positive({ message: "Amount must be a positive number" }),
    DateOfDonation: z.string().regex(
      /^\d{2}-[A-Za-z]{3}-\d{2}$/,
      { message: "Date must be in DD-MMM-YY format, e.g., 22-Oct-24" }
    ),
    PaymentStatus: z.enum(['Success', 'Failed'], { message: "Invalid payment status" }),
  });
  


export async function sendMailsandInvoices(data:  z.infer<typeof donationSchema>[], orgId = 'cm3a66pyx0000jvb4wirvymwf') {
    const invoices = data.slice(1).map(donation => {
        
        return {
            
                oid: orgId,
                name: donation.Name,
                email: donation.Email,
                currency: donation.Currency,
                amount: donation.Amount,
                date: new Date(donation.DateOfDonation),
                status: donation.PaymentStatus,
                mailStatus: false,

        }
    })
    const res = await prisma.transactions.createMany({
        data: invoices
    })
    console.log(res)

}


export async function getPaginatedTransactions(page = 1, limit = 10, orgId = 'cm3a66pyx0000jvb4wirvymwf') {
    const transactions = await prisma.transactions.findMany({
        where: {
            oid: orgId
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            date: 'desc'
        }
    })
    return transactions
}