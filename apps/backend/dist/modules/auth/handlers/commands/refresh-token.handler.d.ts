import { ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../../commands/impl/refresh-token.command.js';
import { AuthService } from '../../auth.service.js';
export declare class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
    private authService;
    constructor(authService: AuthService);
    execute(command: RefreshTokenCommand): Promise<{
        access_token: string;
        refresh_token: string;
        manager: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
}
