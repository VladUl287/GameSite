import { Game } from "./game";

export class Genre {
    constructor(
        public id: number,
        public name: string,
        public games?: Game[]
    ) {}
}