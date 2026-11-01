import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ timestamps: true, collection: 'managers' })
export class Manager {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['ADMIN', 'MANAGER'], default: 'MANAGER' })
  role: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date, default: null, sparse: true })
  deletedAt: Date | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);

// Índices adicionais para performance
// (email já tem unique: true, deletedAt já tem sparse: true)
ManagerSchema.index({ createdAt: -1 });
ManagerSchema.index({ isActive: 1 });
