import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../../commands/impl/refresh-token.command.js';
import { AuthService } from '../../auth.service.js';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: RefreshTokenCommand) {
    return this.authService.refreshToken(command.refreshToken);
  }
}
