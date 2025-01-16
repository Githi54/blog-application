import { Test, TestingModule } from '@nestjs/testing';
import { UploadImageController } from './upload-image.controller';
import { UploadImageService } from './upload-image.service';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessages } from '../shared/messages';

describe('UploadImageController', () => {
  let controller: UploadImageController;
  let service: UploadImageService;

  const mockUploadImageService = {
    uploadImage: jest.fn(),
    deleteImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadImageController],
      providers: [
        {
          provide: UploadImageService,
          useValue: mockUploadImageService,
        },
      ],
    }).compile();

    controller = module.get<UploadImageController>(UploadImageController);
    service = module.get<UploadImageService>(UploadImageService);
  });

  describe('uploadImage', () => {
    it('should upload an image if imageType and file are valid', async () => {
      const mockFile = {
        originalname: 'test-image.png',
        buffer: Buffer.from('mocked file content'),
      } as Express.Multer.File;

      const imageType = 'avatar';
      const expectedResponse = '/images/avatar/mocked-uuid-test-image.png';

      jest.spyOn(service, 'uploadImage').mockResolvedValue(expectedResponse);

      const result = await controller.uploadImage(imageType, mockFile);

      expect(service.uploadImage).toHaveBeenCalledWith(imageType, mockFile);
      expect(result).toBe(expectedResponse);
    });

    it('should throw BadRequestException if imageType is unsupported', () => {
      const mockFile = {
        originalname: 'test-image.png',
        buffer: Buffer.from('mocked file content'),
      } as Express.Multer.File;

      const unsupportedType = 'unsupported';

      expect(() => controller.uploadImage(unsupportedType, mockFile)).toThrow(
        new BadRequestException(ErrorMessages.UNSUPPORTED_IMAGE),
      );
    });

    it('should throw BadRequestException if no file is provided', () => {
      const imageType = 'avatar';

      expect(() => controller.uploadImage(imageType, null)).toThrow(
        new BadRequestException(ErrorMessages.NO_FILE),
      );
    });
  });

  describe('deleteImage', () => {
    it('should delete an image if imageType and imageSrc are valid', async () => {
      const imageType = 'avatar';
      const imageSrc = 'mocked-uuid-test-image.png';

      jest.spyOn(service, 'deleteImage').mockResolvedValue(undefined);

      const result = await controller.deleteImage(imageType, imageSrc);

      expect(service.deleteImage).toHaveBeenCalledWith(imageType, imageSrc);
      expect(result).toBeUndefined();
    });
  });
});
