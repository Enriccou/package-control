export class ListResidentPackagesQuery {
    residentId;
    skip;
    limit;
    constructor(residentId, skip = 0, limit = 10) {
        this.residentId = residentId;
        this.skip = skip;
        this.limit = limit;
    }
}
//# sourceMappingURL=list-resident-packages.query.js.map