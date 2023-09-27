# AWS S3 File Upload App

This is a simple Node.js and Express.js application that allows you to upload files to AWS S3 using TypeScript.

## Prerequisites

- Node.js and npm installed
- AWS S3 account with access credentials

## Installation

1. Clone this repository.
2. Run `yarn install` to install the required dependencies.

## Configuration

Set up your AWS S3 credentials in the `app.ts` file:

```typescript
// src/app.ts
const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    },
    region: process.env.AWS_REGION as string,
  })
