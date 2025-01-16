import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    getAllPosts: jest.fn(),
    getPostById: jest.fn(),
    getPostsByAuthor: jest.fn(),
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
    it('should return an array of posts', async () => {
      const mockPosts = [{ id: '1', title: 'Test Post' }];
      mockPostsService.getAllPosts.mockResolvedValue(mockPosts);

      const result = await controller.getAllPosts();
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getPostById', () => {
    it('should return a post by its ID', async () => {
      const mockPost = { id: '1', title: 'Test Post' };
      mockPostsService.getPostById.mockResolvedValue(mockPost);

      const result = await controller.getPostById('1');
      expect(result).toEqual(mockPost);
    });
  });

  describe('getPostByAuthor', () => {
    it('should return posts by a specific author', async () => {
      const mockPosts = [{ id: '1', authorId: '123', title: 'Test Post' }];
      mockPostsService.getPostsByAuthor.mockResolvedValue(mockPosts);

      const result = await controller.getPostByAuthor('123');
      expect(result).toEqual(mockPosts);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const newPostData: CreatePostDTO = {
        title: 'New Post',
        content: 'Content',
        description: 'Description',
      };
      const mockPost = { id: '1', title: 'New Post' };
      mockPostsService.createPost.mockResolvedValue(mockPost);

      const result = await controller.createPost(newPostData);
      expect(result).toEqual(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', async () => {
      const updatePostData: UpdatePostDTO = {
        title: 'Updated Post',
        content: 'Updated Content',
        description: 'Updated Description',
      };
      const mockUpdatedPost = { id: '1', title: 'Updated Post' };
      mockPostsService.updatePost.mockResolvedValue(mockUpdatedPost);

      const result = await controller.updatePost('1', updatePostData);
      expect(result).toEqual(mockUpdatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      mockPostsService.deletePost.mockResolvedValue(undefined);

      const result = await controller.deletePost('1');
      expect(result).toBeUndefined();
    });
  });
});
