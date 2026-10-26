export class AuthResponseDto {
  access_token: string;
  refresh_token: string;
  manager: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
