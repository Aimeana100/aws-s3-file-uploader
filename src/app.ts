import express, { Request, Response, NextFunction } from 'express'
// import * as AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config()

const app = express()

// const BUCKET = process.env.AWS_NAME

const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    },
    region: process.env.AWS_REGION as string,
  })


const upload = multer({
  storage: multerS3({ 
    s3: s3,
    bucket: process.env.AWS_NAME as string,
    metadata: function (_req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (_req, _file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.post('/upload', upload.array('images', 3), (req: Request, res: Response, _next: NextFunction) => {
    console.log(req?.files)
  res.send('Successfully uploaded ' + req?.files?.length + ' files!')
})

// app.get("/list", async (_req, res) => {

    // let r = await ss3.listObjectsV2({ Bucket: BUCKET as string });
    // let x = r?.Contents?.map(item => item.Key);
    // res.send(x)

    // const params = {
    //     Bucket: process.env.AWS_NAME as string,
    // };

    // const data = await s3.send(new ListObjectsV2Command(params));
    // console.log(data)
// })


// app.get("/download/:filename", async (req, res) => {
//     const filename = req.params.filename
//     let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
//     res.send(x.Body)
// })

// app.delete("/delete/:filename", async (req, res) => {
//     const filename = req.params.filename
//     await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
//     res.send("File Deleted Successfully")

// })

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})