

export const stripe = require('stripe')(process.env.STRIPE_API_KEY,{
    apiVersion: '2022-11-15',
    typescript: true
});