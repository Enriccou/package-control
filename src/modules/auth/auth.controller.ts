import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from './dtos/login.dto.js';
import { LoginCommand } from './commands/impl/login.command.js';
import { RefreshTokenCommand } from './commands/impl/refresh-token.command.js';
import { LogoutCommand } from './commands/impl/logout.command.js';
import { JwtAuthGuard } from './guards/jwt.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto));
  }

  @Post('refresh')
  async refresh(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    return this.commandBus.execute(new RefreshTokenCommand(token));
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: any) {
    return this.commandBus.execute(new LogoutCommand(user.userId));
  }
}
