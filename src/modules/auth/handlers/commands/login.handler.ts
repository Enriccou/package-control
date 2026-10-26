import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../../commands/impl/login.command.js';
import { AuthService } from '../../auth.service.js';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: LoginCommand) {
    return this.authService.login(command.loginDto);
  }
}
