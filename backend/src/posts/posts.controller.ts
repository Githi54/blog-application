import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
    return this.postsService.getPostById(postId);
  }

  @Get('author/:authorId')
  async getPostByAuthor(@Param('authorId') authorId: string) {
    return this.postsService.getPostsByAuthor(authorId);
  }

  @Post('create')
  async createPost(@Body() postData: CreatePostDTO) {
    return this.postsService.createPost(postData);
  }

  @Patch(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body() postData: UpdatePostDTO,
  ) {
    return this.postsService.updatePost(postId, postData);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postsService.deletePost(postId);
  }
}
