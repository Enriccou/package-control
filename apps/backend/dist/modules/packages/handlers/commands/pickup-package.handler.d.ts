import { ICommandHandler } from '@nestjs/cqrs';
import { PickupPackageCommand } from '../../commands/impl/pickup-package.command.js';
import { PackagesService } from '../../packages.service.js';
export declare class PickupPackageHandler implements ICommandHandler<PickupPackageCommand> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(command: PickupPackageCommand): Promise<import("../../schemas/package.schema.js").Package | null>;
}
