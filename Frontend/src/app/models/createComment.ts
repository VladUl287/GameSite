import { Guid } from "guid-typescript";

export class GameCommentCreate {
    constructor(
        public gameId: Guid,
        public userId: Guid,
        public rating: number,
        public text: string,
        public userEmail: string
    ) {}
}