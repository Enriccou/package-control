import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePackageCommand } from '../../commands/impl/create-package.command.js';
import { PackagesService } from '../../packages.service.js';
export declare class CreatePackageHandler implements ICommandHandler<CreatePackageCommand> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(command: CreatePackageCommand): Promise<import("../../index.js").Package>;
}
