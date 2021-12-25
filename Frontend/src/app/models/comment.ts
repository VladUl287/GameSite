import { Guid } from "guid-typescript";

export class GameComment {
    constructor(
        public id: number,
        public gameId: Guid,
        public userId: Guid,
        public rating: number,
        public text: string,
        public userEmail: string
    ) {}
}