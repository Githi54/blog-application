import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Post.name, schema: PostSchema }],
      'posts',
    ),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
