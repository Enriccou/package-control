import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema.js';

@Injectable()
export class ManagersRepository {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
  ) {}

  async create(data: any): Promise<Manager> {
    const createdManager = new this.managerModel(data);
    return createdManager.save();
  }

  async findById(id: string): Promise<Manager | null> {
    return this.managerModel.findById(id).where('deletedAt').equals(null);
  }

  async findByEmail(email: string): Promise<Manager | null> {
    return this.managerModel
      .findOne({ email: email.toLowerCase() })
      .where('deletedAt')
      .equals(null);
  }

  async findAll(skip: number, limit: number): Promise<Manager[]> {
    return this.managerModel
      .find()
      .where('deletedAt')
      .equals(null)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async update(id: string, data: any): Promise<Manager | null> {
    return this.managerModel
      .findByIdAndUpdate(id, data, { new: true })
      .where('deletedAt')
      .equals(null);
  }

  async softDelete(id: string): Promise<Manager | null> {
    return this.managerModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const count = await this.managerModel
      .countDocuments({
        email: email.toLowerCase(),
        deletedAt: null,
      });
    return count > 0;
  }
}
