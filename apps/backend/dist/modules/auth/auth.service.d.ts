import { JwtService } from '@nestjs/jwt';
import { ManagersService } from '../managers/managers.service.js';
import { LoginDto } from './dtos/login.dto.js';
export declare class AuthService {
    private managersService;
    private jwtService;
    constructor(managersService: ManagersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        manager: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        manager: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    logout(managerId: string): Promise<{
        message: string;
    }>;
    private generateTokens;
}
