import { Test, TestingModule } from '@nestjs/testing';
import { UploadImageService } from './upload-image.service';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
  unlink: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadImageService],
    }).compile();

    service = module.get<UploadImageService>(UploadImageService);
  });

  describe('uploadImage', () => {
    it('should save the file and return its path', async () => {
      const mockFile = {
        originalname: 'test-image.png',
        buffer: Buffer.from('mocked file content'),
      } as Express.Multer.File;

      const result = await service.uploadImage('avatar', mockFile);

      expect(writeFile).toHaveBeenCalledWith(
        join(
          __dirname,
          '..',
          '..',
          'images',
          'avatar',
          'mocked-uuid-test-image.png',
        ),
        mockFile.buffer,
      );
      expect(result).toEqual('/images/avatar/mocked-uuid-test-image.png');
    });

    it('should log an error if writeFile fails', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      (writeFile as jest.Mock).mockRejectedValueOnce(new Error('Write error'));

      const mockFile = {
        originalname: 'test-image.png',
        buffer: Buffer.from('mocked file content'),
      } as Express.Multer.File;

      const result = await service.uploadImage('avatar', mockFile);

      expect(console.error).toHaveBeenCalledWith(new Error('Write error'));
      expect(result).toBeUndefined();
    });
  });

  describe('deleteImage', () => {
    it('should delete the file', async () => {
      const imageSrc = 'mocked-uuid-test-image.png';
      const imageType = 'avatar';

      await service.deleteImage(imageType, imageSrc);

      expect(unlink).toHaveBeenCalledWith(
        join(__dirname, '..', '..', 'images', imageType, imageSrc),
      );
    });
  });
});
