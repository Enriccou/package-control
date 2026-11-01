export class ListManagersQuery {
    skip;
    limit;
    constructor(skip = 0, limit = 10) {
        this.skip = skip;
        this.limit = limit;
        if (isNaN(this.skip) || this.skip < 0)
            this.skip = 0;
        if (isNaN(this.limit) || this.limit < 1)
            this.limit = 10;
    }
}
//# sourceMappingURL=list-managers.query.js.map