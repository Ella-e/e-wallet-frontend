# eTreasury

eTreasury is a web application that allows users to manage their finances. It is built using React and NextJS, with features of transaction and third party payment methods.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- User can create an account to the application
- User can need to activate their account by clicking the link sent to their email
- User can login to the application
- User can apply to reset their password by inputting the verification code sent to their email
- User can reset their password after inputting the verification code
- User can create a new wallet bound to their account
- User can view their wallet balance
- User can deposit money to their wallet
- User can make a payment to another user
- User can make a payment to a third party payment method (Alipay)
- User can view their transaction history

We have also implemented a fully functional backend for this application. Please refer to the following repository for more information: https://github.com/Ella-e/e-wallet-backend