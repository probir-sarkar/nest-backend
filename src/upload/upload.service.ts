import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: 'us-west-002',
    credentials: {
      accessKeyId: '00247eb70c58eba0000000005',
      secretAccessKey: 'K0028xHNBpnjXZKTcehxYAysgwOZehY',
    },
    endpoint: 'https://s3.us-west-002.backblazeb2.com',
  });
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'probir-nestjs',
        Key: fileName,
        Body: file,
      }),
    );
  }
}
