export class GetPendingPackagesQuery {
  constructor(public readonly days: number = 7) {}
}
