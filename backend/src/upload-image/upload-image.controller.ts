import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ErrorMessages } from '../shared/messages';
import { imageTypes } from '../shared/constants';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post(':imageType')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('imageType') imageType = 'uploaded',
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!imageTypes.has(imageType)) {
      throw new BadRequestException(ErrorMessages.UNSUPPORTED_IMAGE);
    }

    if (!file) {
      throw new BadRequestException(ErrorMessages.NO_FILE);
    }

    return this.uploadImageService.uploadImage(imageType, file);
  }

  @Delete(':imageType/:imageSrc')
  @UseInterceptors(FileInterceptor('file'))
  deleteImage(
    @Param('imageType') imageType: string,
    @Param('imageSrc') imageSrc: string,
  ) {
    return this.uploadImageService.deleteImage(imageType, imageSrc);
  }
}
