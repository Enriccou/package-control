import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDocument } from './schemas/package.schema.js';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';

@Injectable()
export class PackagesRepository {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const pkg = new this.packageModel(createPackageDto);
    return pkg.save();
  }

  async findAll(skip: number = 0, limit: number = 10): Promise<Package[]> {
    return this.packageModel
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Package | null> {
    return this.packageModel.findOne({ _id: id, deletedAt: null }).exec();
  }

  async findByResidentId(
    residentId: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<Package[]> {
    return this.packageModel
      .find({ residentId, deletedAt: null })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findPending(days: number = 7): Promise<Package[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return this.packageModel
      .find({
        status: 'pending',
        receivedAt: { $lt: date },
        deletedAt: null,
      })
      .sort({ receivedAt: 1 })
      .exec();
  }

  async update(id: string, updatePackageDto: UpdatePackageDto): Promise<Package | null> {
    return this.packageModel
      .findByIdAndUpdate(id, updatePackageDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Package | null> {
    return this.packageModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
  }

  async incrementNotificationAttempts(id: string): Promise<void> {
    await this.packageModel
      .findByIdAndUpdate(
        id,
        {
          $inc: { notificationAttempts: 1 },
          lastNotificationAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}
