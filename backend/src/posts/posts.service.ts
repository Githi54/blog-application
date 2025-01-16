import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async getPostById(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }
    return post;
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    const posts = await this.postModel.find({ author: authorId }).exec();
    if (!posts.length) {
      throw new NotFoundException(`Post not found`);
    }
    return posts;
  }

  async createPost(postData: CreatePostDTO): Promise<Post> {
    const newPost = new this.postModel(postData);
    return newPost.save();
  }

  async updatePost(postId: string, newPostData: UpdatePostDTO): Promise<Post> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(postId, newPostData, { new: true })
      .exec();
    if (!updatedPost) {
      throw new NotFoundException(`Post not found`);
    }
    return updatedPost;
  }

  async deletePost(postId: string): Promise<void> {
    const deletedPost = await this.postModel.findByIdAndDelete(postId).exec();
    if (!deletedPost) {
      throw new NotFoundException(`Post not found`);
    }
  }
}
