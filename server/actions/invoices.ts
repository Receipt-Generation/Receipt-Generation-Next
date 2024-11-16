'use server'

import {PrismaClient} from '@prisma/client'
import { z } from 'zod'
import { sendReceipt } from './emails';


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
  


export async function sendMailsandInvoices(data:  z.infer<typeof donationSchema>[], orgId = 'cm3a66pyx0000jvb4wirvymwf', orgEmail = 'test@test.com') {
    const invoices = data.slice(1).map(donation => {
        return {
            tid: crypto.randomUUID(),
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

    await prisma.transactions.createMany({
        data: invoices
    })


    const donations = invoices.map(d=>{
        return {Name: d.name,
        Email: d.email,
        Currency: d.currency,
        Amount: d.amount,
        DateOfDonation: d.date.toUTCString(),
        PaymentStatus: d.status,
        tid: d.tid}
    })
    const mailConfirmations = await sendReceipt({orgId, orgEmail, donations})

    mailConfirmations.slice(1).forEach((data => {
        mailSentUpdate(data.tid)
    }))

    
    console.log(mailConfirmations)

}



export async function mailSentUpdate(tid: string){
    await prisma.transactions.update({
        where: {
            tid: tid
        }, 
        data: {
            mailStatus: true
    }
})
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


export async function getOrganisationByInvoice(invoiceId: string){
    const invoice = await prisma.transactions.findUnique({
        where: {
            tid: invoiceId,
        }
    })
    if(!invoice){
        return []
    }
    const org = await prisma.organisation.findUnique({
        where: {
            oid: invoice.oid
        }
    })
    if(!org){
        return []
    }
    return [org, invoice]
}