import { LoginDto } from '../../dtos/login.dto.js';

export class LoginCommand {
  constructor(public readonly loginDto: LoginDto) {}
}
