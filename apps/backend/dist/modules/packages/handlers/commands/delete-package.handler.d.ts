import { ICommandHandler } from '@nestjs/cqrs';
import { DeletePackageCommand } from '../../commands/impl/delete-package.command.js';
import { PackagesService } from '../../packages.service.js';
export declare class DeletePackageHandler implements ICommandHandler<DeletePackageCommand> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(command: DeletePackageCommand): Promise<import("../../index.js").Package | null>;
}
