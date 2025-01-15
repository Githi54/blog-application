import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  async getAllPosts() {}

  async getPostById(postId: string) {}

  async getPostByAuthor(authorId: string) {}

  async createPost(postData: object) {}

  async updatePost(postId: string, newPostData: object) {}

  async deletePost(postId: string) {}
}
