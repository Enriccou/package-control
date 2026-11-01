import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from '../../commands/impl/logout.command.js';
import { AuthService } from '../../auth.service.js';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: LogoutCommand) {
    return this.authService.logout(command.managerId);
  }
}
