import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDocument } from '../packages/schemas/package.schema.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
  ) {}

  async getPendingPackages(days: number = 7) {
    const date = new Date();
    date.setDate(date.getDate() - days);

    const packages = await this.packageModel
      .find({
        status: 'pending',
        receivedAt: { $lt: date },
        deletedAt: null,
      })
      .sort({ receivedAt: 1 })
      .populate('residentId', ['name', 'email', 'phone', 'apartment'])
      .exec();

    return {
      count: packages.length,
      days,
      packages,
    };
  }

  async getFailedNotifications(skip: number = 0, limit: number = 10) {
    const packages = await this.packageModel
      .find({
        notificationFailed: true,
        deletedAt: null,
      })
      .skip(skip)
      .limit(limit)
      .sort({ lastNotificationAt: -1 })
      .populate('residentId', ['name', 'email', 'phone', 'apartment'])
      .exec();

    const total = await this.packageModel.countDocuments({
      notificationFailed: true,
      deletedAt: null,
    });

    return {
      total,
      count: packages.length,
      skip,
      limit,
      packages,
    };
  }

  async getStatistics() {
    const totalPackages = await this.packageModel.countDocuments({
      deletedAt: null,
    });

    const byStatus = await this.packageModel.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const pendingCount = await this.packageModel.countDocuments({
      status: 'pending',
      deletedAt: null,
    });

    const pickedUpCount = await this.packageModel.countDocuments({
      status: 'picked_up',
      deletedAt: null,
    });

    return {
      totalPackages,
      pendingCount,
      pickedUpCount,
      byStatus,
    };
  }
}
