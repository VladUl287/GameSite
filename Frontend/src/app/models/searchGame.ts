import { Guid } from "guid-typescript";

export class SearchGame {
    constructor(
        public id: Guid,
        public name: string,
        public normalaziedName: string
      ) {}
  }