import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    getAllPosts: jest.fn(),
    getPostById: jest.fn(),
    getPostByAuthor: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should call PostsService.getAllPosts and return the result', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Test Post',
          description: 'Test Description',
          content: 'Test Content',
          featuredImage: 'image1.jpg',
          bannerImage: 'banner1.jpg',
        },
      ];
      mockPostsService.getAllPosts.mockResolvedValue(mockPosts);

      const result = await controller.getAllPosts();
      expect(service.getAllPosts).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getPostById', () => {
    it('should call PostsService.getPostById with correct id and return the result', async () => {
      const mockPost = {
        id: '1',
        title: 'Test Post',
        description: 'Test Description',
        content: 'Test Content',
        featuredImage: 'image1.jpg',
        bannerImage: 'banner1.jpg',
      };
      mockPostsService.getPostById.mockResolvedValue(mockPost);

      const result = await controller.getPostById('1');
      expect(service.getPostById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPost);
    });
  });

  describe('getPostByAuthor', () => {
    it('should call PostsService.getPostByAuthor with correct authorId and return the result', async () => {
      const mockPosts = [
        {
          id: '1',
          authorId: '123',
          title: 'Test Post',
          description: 'Test Description',
          content: 'Test Content',
          featuredImage: 'image1.jpg',
          bannerImage: 'banner1.jpg',
        },
      ];
      mockPostsService.getPostByAuthor.mockResolvedValue(mockPosts);

      const result = await controller.getPostByAuthor('123');
      expect(service.getPostByAuthor).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockPosts);
    });
  });

  describe('createPost', () => {
    it('should call PostsService.createPost with correct data and return the result', async () => {
      const mockPostData = {
        title: 'New Post',
        description: 'New Description',
        content: 'New Content',
        featuredImage: 'image2.jpg',
        bannerImage: 'banner2.jpg',
      };
      const createdPost = { id: '1', ...mockPostData };
      mockPostsService.createPost.mockResolvedValue(createdPost);

      const result = await controller.createPost(mockPostData);
      expect(service.createPost).toHaveBeenCalledWith(mockPostData);
      expect(result).toEqual(createdPost);
    });
  });

  describe('updatePost', () => {
    it('should call PostsService.updatePost with correct id and data and return the result', async () => {
      const updatedPostData = {
        title: 'Updated Post',
        description: 'Updated Description',
        content: 'Updated Content',
        featuredImage: 'image3.jpg',
        bannerImage: 'banner3.jpg',
      };
      const updatedPost = { id: '1', ...updatedPostData };
      mockPostsService.updatePost.mockResolvedValue(updatedPost);

      const result = await controller.updatePost('1', updatedPostData);
      expect(service.updatePost).toHaveBeenCalledWith('1', updatedPostData);
      expect(result).toEqual(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should call PostsService.deletePost with correct id', async () => {
      mockPostsService.deletePost.mockResolvedValue(undefined);

      const result = await controller.deletePost('1');
      expect(service.deletePost).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
