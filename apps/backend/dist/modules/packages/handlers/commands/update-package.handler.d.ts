import { ICommandHandler } from '@nestjs/cqrs';
import { UpdatePackageCommand } from '../../commands/impl/update-package.command.js';
import { PackagesService } from '../../packages.service.js';
export declare class UpdatePackageHandler implements ICommandHandler<UpdatePackageCommand> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(command: UpdatePackageCommand): Promise<import("../../index.js").Package | null>;
}
