import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AuthorModule } from './author/author.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostsModule,
    AuthorModule,
    MongooseModule.forRoot(
      process.env.MONGODB_POSTS ?? 'mongodb://localhost/posts',
      {
        connectionName: 'posts',
      },
    ),
  ],
})
export class AppModule {}
