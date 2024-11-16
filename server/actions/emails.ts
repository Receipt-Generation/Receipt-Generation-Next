'use server'

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    // pool: true, // Use SMTP pooling to keep the connection open for multiple emails
    secure: false, // use SSL
    auth: {
      user: 'api',
      pass: 'aa6e3f2285d041fe955d95946f27643b',
    },
    // maxMessages: Infinity, // Allow an unlimited number of messages per connection
    // maxConnections: 5 // Limit the number of simultaneous connections
  });

// Configure the mailoptions object



export async function sendReceipt({orgId, orgEmail, donations}: {orgId: string, orgEmail: string, donations: {Name: string, Email: string, Currency: string, Amount: number, DateOfDonation: string, PaymentStatus: string, tid: string}[]}) {
  let res: {email: string, tid: string}[] = []

  await donations.forEach(data => {
    const mailOptions = {
      from: 'hello@demomailtrap.com',
      to: data.Email,
      subject: `Donation Receipt | ${data.Name} `,
      text: `Hello ${data.Name}, here is your dummy receipt of ${data.Currency} ${data.Amount}. Here is the link: http://localhost:3000/invoice/${data.tid}`
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(`Error:`+ error);
        } else {
          console.log('Email sent: ' + info.response);
          res.push({email: data.Email, tid: data.tid})
        }
      })})

      return res;
}


export async function testEmail(){
  const mailOptions = {
    from: 'hello@demomailtrap.com',
    to: 'vineet.22566@sscbs.du.ac.in',
    subject: 'Sending Email for Donation',
    text: 'This is a testing email!'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(`Error:`+ error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}