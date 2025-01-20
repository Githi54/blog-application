import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name, 'authors')
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async createAuthor(authorData): Promise<Author> {
    const newAuthor = new this.authorModel(authorData);
    return newAuthor.save();
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async getAuthorById(authorId: string): Promise<Author | null> {
    return this.authorModel.findById(authorId).exec();
  }

  async updateAuthor(
    authorId: string,
    updateData: Partial<Author>,
  ): Promise<Author | null> {
    return this.authorModel
      .findByIdAndUpdate(authorId, updateData, { new: true })
      .exec();
  }

  async deleteAuthor(authorId: string): Promise<Author | null> {
    return this.authorModel.findByIdAndDelete(authorId).exec();
  }
}
