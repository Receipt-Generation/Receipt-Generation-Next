'use server'
const Stripe = require('stripe');

const stripe = Stripe('sk_test_51OLd6LSFNPo6BFcGfnvvblbdHcuLrTuUubJiv4NacO8ayYWIeLv4KCvkCfwdIfjBVKKBOlZ3mv3jk8FlcBnIbb7Q00Hw9kOGCw');

export async function getBalance() {
    await createPaymentLink()
    const balance = await stripe.balance.retrieve();
    return balance.available[0].amount;
}

export async function getProducts() {
    const products = await stripe.products.list();
    // console.log(products);
    return products.data;
}

export async function createPaymentLink(){
    const product = await stripe.products.create({
        name: 'Donation',
        });
    
}