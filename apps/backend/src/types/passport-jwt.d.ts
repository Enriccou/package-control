declare module 'passport-jwt' {
  export class Strategy {
    constructor(options: any);
    authenticate(req: any, options?: any): void;
  }

  export function ExtractJwt(): any;
  export namespace ExtractJwt {
    function fromAuthHeaderAsBearerToken(): any;
  }
}
