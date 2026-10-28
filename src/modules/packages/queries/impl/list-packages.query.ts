export class ListPackagesQuery {
  constructor(
    public readonly skip: number = 0,
    public readonly limit: number = 10,
  ) {}
}
