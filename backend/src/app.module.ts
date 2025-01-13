import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [PostsModule, AuthorModule],
})
export class AppModule {}
