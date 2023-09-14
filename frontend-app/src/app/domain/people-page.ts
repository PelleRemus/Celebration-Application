import { PersonOverview } from "./person-overview";

export interface PeoplePage {
    page: number;
    collectionSize: number;
    peopleList: PersonOverview[]
}