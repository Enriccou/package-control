import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResidentDocument = HydratedDocument<Resident>;

@Schema({ timestamps: true, collection: 'residents' })
export class Resident {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  cpf?: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  apartment?: string;

  @Prop({ required: true })
  propertyId: string;

  @Prop({ type: Date, required: true })
  moveInDate: Date;

  @Prop({ type: Date })
  moveOutDate?: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date, default: null, sparse: true })
  deletedAt: Date | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ResidentSchema = SchemaFactory.createForClass(Resident);

ResidentSchema.index({ createdAt: -1 });
ResidentSchema.index({ isActive: 1 });
ResidentSchema.index({ propertyId: 1 });
ResidentSchema.index({ email: 1 });
