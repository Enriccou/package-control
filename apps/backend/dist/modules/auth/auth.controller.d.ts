import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from './dtos/login.dto.js';
export declare class AuthController {
    private commandBus;
    constructor(commandBus: CommandBus);
    login(loginDto: LoginDto): Promise<any>;
    refresh(authHeader: string): Promise<any>;
    logout(user: any): Promise<any>;
}
