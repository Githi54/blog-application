import { Injectable } from '@nestjs/common';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class UploadImageService {
  private readonly uploadPath = join(__dirname, '..', '..', 'images');
  private readonly baseDir = '/images';

  async uploadImage(
    imageType: string,
    { originalname, buffer }: Express.Multer.File,
  ) {
    try {
      const fileName = `${v4()}-${originalname}`;
      const filePath = join(this.uploadPath, imageType, fileName);

      await writeFile(filePath, buffer);

      return `${this.baseDir}/${imageType}/${fileName}`;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteImage(imageType: string, imageSrc: string) {
    const absolutePath = join(this.uploadPath, imageType, imageSrc);

    try {
      await unlink(absolutePath);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
