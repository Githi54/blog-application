import { Injectable } from '@nestjs/common';
import { Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name, 'posts') private postModel: Model<Post>,
  ) {}
  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async getPostById(postId: string) {}

  async getPostByAuthor(authorId: string) {}

  async createPost(postData: object) {}

  async updatePost(postId: string, newPostData: object) {}

  async deletePost(postId: string) {}
}
