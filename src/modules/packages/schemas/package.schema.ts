import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type PackageDocument = HydratedDocument<Package>;

export enum PackageStatus {
  RECEIVED = 'received',
  PENDING = 'pending',
  PICKED_UP = 'picked_up',
  FAILED = 'failed',
}

@Schema({ timestamps: true, collection: 'packages' })
export class Package {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true })
  residentId: string;

  @Prop({ required: true })
  carrier: string;

  @Prop()
  trackingNumber?: string;

  @Prop()
  description?: string;

  @Prop({ enum: PackageStatus, default: PackageStatus.RECEIVED })
  status: PackageStatus;

  @Prop({ type: Date, default: Date.now })
  receivedAt: Date;

  @Prop()
  pickupAt?: Date;

  @Prop({ default: 0 })
  notificationAttempts: number;

  @Prop({ default: null, sparse: true })
  lastNotificationAt?: Date;

  @Prop({ default: false })
  notificationFailed: boolean;

  @Prop({ type: Date, default: null, sparse: true })
  deletedAt: Date | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);

PackageSchema.index({ createdAt: -1 });
PackageSchema.index({ status: 1 });
PackageSchema.index({ residentId: 1 });
PackageSchema.index({ pickupAt: 1 });
