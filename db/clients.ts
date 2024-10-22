import { S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "invalid",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "invalid",
  },
});