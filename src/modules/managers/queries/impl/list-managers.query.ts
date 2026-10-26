export class ListManagersQuery {
  constructor(
    public readonly skip: number = 0,
    public readonly limit: number = 10,
  ) {
    // Garantir que são números válidos
    if (isNaN(this.skip) || this.skip < 0) this.skip = 0;
    if (isNaN(this.limit) || this.limit < 1) this.limit = 10;
  }
}
