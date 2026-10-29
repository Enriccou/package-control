import { PackageStatus } from '../schemas/package.schema.js';

export class PackageResponseDto {
  id: string;
  residentId: string;
  carrier: string;
  trackingNumber?: string;
  description?: string;
  status: PackageStatus;
  receivedAt: Date;
  pickupAt?: Date;
  notificationAttempts: number;
  lastNotificationAt?: Date;
  notificationConfirmedAt?: Date;
  notificationFailed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
