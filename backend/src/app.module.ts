import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AuthorModule } from './author/author.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadImageModule } from './upload-image/upload-image.module';

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
    MongooseModule.forRoot(
      process.env.MONGODB_AUTHORS ?? 'mongodb://localhost/authors',
      {
        connectionName: 'authors',
      },
    ),
    UploadImageModule,
  ],
})
export class AppModule {}
