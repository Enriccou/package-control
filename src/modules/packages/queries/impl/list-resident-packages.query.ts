export class ListResidentPackagesQuery {
  constructor(
    public readonly residentId: string,
    public readonly skip: number = 0,
    public readonly limit: number = 10,
  ) {}
}
