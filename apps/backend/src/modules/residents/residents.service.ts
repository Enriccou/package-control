import { Injectable } from '@nestjs/common';
import { ResidentsRepository } from './residents.repository.js';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';
import { Resident } from './schemas/resident.schema.js';

@Injectable()
export class ResidentsService {
  constructor(private residentsRepository: ResidentsRepository) {}

  async create(createResidentDto: CreateResidentDto): Promise<Resident> {
    return this.residentsRepository.create(createResidentDto);
  }

  async findAll(skip: number = 0, limit: number = 10): Promise<Resident[]> {
    return this.residentsRepository.findAll(skip, limit);
  }

  async findById(id: string): Promise<Resident | null> {
    return this.residentsRepository.findById(id);
  }

  async findByEmail(email: string): Promise<Resident | null> {
    return this.residentsRepository.findByEmail(email);
  }

  async findByPropertyId(propertyId: string): Promise<Resident[]> {
    return this.residentsRepository.findByPropertyId(propertyId);
  }

  async update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident | null> {
    return this.residentsRepository.update(id, updateResidentDto);
  }

  async delete(id: string): Promise<Resident | null> {
    return this.residentsRepository.delete(id);
  }
}
