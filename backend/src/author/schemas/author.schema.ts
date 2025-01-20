import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({
  timestamps: true,
})
export class Author {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: '/images/avatar/default-avatar.png',
    validate: /\w+\.(jpg|jpeg|png|gif|webp)$/i,
  })
  avatar: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
