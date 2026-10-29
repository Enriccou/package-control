import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PickupPackageHandler } from './pickup-package.handler';
import { PackagesService } from '../../packages.service';
import { PickupPackageCommand } from '../../commands/impl/pickup-package.command';
import { PackageStatus } from '../../schemas/package.schema';

describe('PickupPackageHandler', () => {
  let handler: PickupPackageHandler;
  let service: jest.Mocked<PackagesService>;

  const mockPackage = {
    _id: '507f1f77bcf86cd799439011',
    status: PackageStatus.PENDING,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PickupPackageHandler,
        {
          provide: PackagesService,
          useValue: {
            findById: jest.fn(),
            markAsPickedUp: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<PickupPackageHandler>(PickupPackageHandler);
    service = module.get(PackagesService) as jest.Mocked<PackagesService>;
  });

  it('should mark package as picked up', async () => {
    const pickedUp = { ...mockPackage, status: PackageStatus.PICKED_UP };
    service.findById.mockResolvedValue(mockPackage as any);
    service.markAsPickedUp.mockResolvedValue(pickedUp as any);

    const command = new PickupPackageCommand('507f1f77bcf86cd799439011');
    const result = await handler.execute(command);

    expect(result).toEqual(pickedUp);
    expect(service.markAsPickedUp).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  });

  it('should throw NotFoundException when package not found', async () => {
    service.findById.mockResolvedValue(null);

    const command = new PickupPackageCommand('nonexistent');

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException when already picked up', async () => {
    const pickedUp = { ...mockPackage, status: PackageStatus.PICKED_UP };
    service.findById.mockResolvedValue(pickedUp as any);

    const command = new PickupPackageCommand('507f1f77bcf86cd799439011');

    await expect(handler.execute(command)).rejects.toThrow(BadRequestException);
  });
});
