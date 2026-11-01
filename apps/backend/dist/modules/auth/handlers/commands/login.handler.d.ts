import { ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../../commands/impl/login.command.js';
import { AuthService } from '../../auth.service.js';
export declare class LoginHandler implements ICommandHandler<LoginCommand> {
    private authService;
    constructor(authService: AuthService);
    execute(command: LoginCommand): Promise<{
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
