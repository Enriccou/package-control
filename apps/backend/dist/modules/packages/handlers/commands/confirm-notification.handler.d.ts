import { ICommandHandler } from '@nestjs/cqrs';
import { ConfirmNotificationCommand } from '../../commands/impl/confirm-notification.command.js';
import { PackagesService } from '../../packages.service.js';
export declare class ConfirmNotificationHandler implements ICommandHandler<ConfirmNotificationCommand> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(command: ConfirmNotificationCommand): Promise<import("../../index.js").Package | null>;
}
