# OpenPoll Mini App

OpenPoll is a Base Mini App for permissionless proposal creation, transparent voting, and public results.

It provides a simple interface for creating proposals, participating in votes, and viewing outcomes in a public, easy-to-read format.

## Repository

GitHub: https://github.com/EverleyIsaac/openpoll-miniapp.git

## Overview

OpenPoll is designed to make community polling straightforward and transparent.

The app focuses on three core actions:

- Create proposals without a gatekeeper
- Vote on active proposals
- View results publicly

The project is built as a modern web application using Next.js, TypeScript, and Tailwind CSS.

## Features

- Permissionless proposal creation
- Transparent voting flow
- Public proposal results
- Base Mini App experience
- Responsive interface built with Tailwind CSS
- Type-safe frontend code with TypeScript
- Onchain interaction support through wagmi and viem
- Icon support through lucide-react
- Motion and interface transitions with framer-motion

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- wagmi
- viem
- lucide-react
- framer-motion

## Contract

The app is configured to interact with the following contract:

- Address: `0x7b9381D03c76a96097aCeEce4e2519EF905c1901`

## Production

Production target:

- https://openpoll-miniapp.vercel.app

## Getting Started

Clone the repository:

```bash
git clone https://github.com/EverleyIsaac/openpoll-miniapp.git
cd openpoll-miniapp
```

Install dependencies:

```bash
npm install
```

Create a local environment file if needed:

```bash
cp .env.example .env.local
```

The local environment file is only required if you want to override builder attribution values.

Start the development server:

```bash
npm run dev
```

Open the local app in your browser:

```text
http://localhost:3000
```

## Environment

The project includes an `.env.example` file.

Use `.env.local` for local overrides.

Do not commit local environment files that contain machine-specific or private values.

## Usage

Use the app to browse existing proposals and their current results.

Create a proposal through the proposal creation flow.

Vote on available proposals from the app interface.

Review final or current results directly in the public results view.

## Development Notes
