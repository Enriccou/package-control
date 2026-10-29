import { Test, TestingModule } from '@nestjs/testing';
import { CreatePackageHandler } from './create-package.handler';
import { PackagesService } from '../../packages.service';
import { CreatePackageCommand } from '../../commands/impl/create-package.command';
import { CreatePackageDto } from '../../dtos/create-package.dto';
import { PackageStatus } from '../../schemas/package.schema';

describe('CreatePackageHandler', () => {
  let handler: CreatePackageHandler;
  let service: jest.Mocked<PackagesService>;

  const mockPackage = {
    _id: '507f1f77bcf86cd799439011',
    residentId: '507f1f77bcf86cd799439012',
    carrier: 'Sedex',
    trackingNumber: 'AA123456789BR',
    status: PackageStatus.RECEIVED,
    receivedAt: new Date(),
    notificationAttempts: 0,
    notificationFailed: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePackageHandler,
        {
          provide: PackagesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreatePackageHandler>(CreatePackageHandler);
    service = module.get(PackagesService) as jest.Mocked<PackagesService>;
  });

  it('should create a package', async () => {
    const createDto: CreatePackageDto = {
      residentId: '507f1f77bcf86cd799439012',
      carrier: 'Sedex',
      trackingNumber: 'AA123456789BR',
    };

    service.create.mockResolvedValue(mockPackage as any);

    const command = new CreatePackageCommand(createDto);
    const result = await handler.execute(command);

    expect(result).toEqual(mockPackage);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });
});
