'use server'
const Stripe = require('stripe');
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function getBalance() {
    // await createPaymentLink()
    return 0
    // const balance = await stripe.balance.retrieve();
    // return balance.available[0].amount;
}

export async function getProducts(oid: string, email: string) {
    const stripeAPIKey = await prisma.organisation.findFirst({
        where: {
            oid: oid
        },
        select: {
            StripeId: true
        }
    })
    console.log(stripeAPIKey)
    if (!stripeAPIKey) return stripeAPIKey;
    // const stripe = Stripe();
    // const products = await stripe.products.list();
    // // console.log(products);
    // return products.data;
}

// export async function createPaymentLink(){
//     const product = await stripe.products.create({
//         name: 'Donation',
//     });
// }

export async function verifyAPIKey(apiKey: string, orgId: string) {
    try {
        const stripe = Stripe(apiKey);
        const account = await stripe.accounts.retrieve();
        console.log(account);
        await prisma.organisation.update({
            where: {
                oid: orgId
            },
            data: {
                StripeId: apiKey
            }
        })
        return true;
    } catch (error) {
        console.error(error);
        return null;
    }
}