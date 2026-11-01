import { ICommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from '../../commands/impl/logout.command.js';
import { AuthService } from '../../auth.service.js';
export declare class LogoutHandler implements ICommandHandler<LogoutCommand> {
    private authService;
    constructor(authService: AuthService);
    execute(command: LogoutCommand): Promise<{
        message: string;
    }>;
}
