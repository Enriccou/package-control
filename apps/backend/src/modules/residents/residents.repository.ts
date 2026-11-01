import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resident, ResidentDocument } from './schemas/resident.schema.js';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';

@Injectable()
export class ResidentsRepository {
  constructor(
    @InjectModel(Resident.name) private residentModel: Model<ResidentDocument>,
  ) {}

  async create(createResidentDto: CreateResidentDto): Promise<Resident> {
    const resident = new this.residentModel(createResidentDto);
    return resident.save();
  }

  async findAll(skip: number = 0, limit: number = 10): Promise<Resident[]> {
    return this.residentModel
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Resident | null> {
    return this.residentModel.findOne({ _id: id, deletedAt: null }).exec();
  }

  async findByEmail(email: string): Promise<Resident | null> {
    return this.residentModel
      .findOne({ email: email.toLowerCase(), deletedAt: null })
      .exec();
  }

  async findByPropertyId(propertyId: string): Promise<Resident[]> {
    return this.residentModel
      .find({ propertyId, deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident | null> {
    return this.residentModel
      .findByIdAndUpdate(id, updateResidentDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Resident | null> {
    return this.residentModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
  }
}
