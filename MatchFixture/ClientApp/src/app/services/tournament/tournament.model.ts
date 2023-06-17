import { CompetitionType } from "./competition-type.enum";

export interface TournamentDto {
    id: number;
    name: string;
    startMonth: string;
    endMonth: string;
    startYear: string;
    endYear: string;
    competitionType: CompetitionType
  }
  export interface CreateTournamentDto {
    name: string;
    startMonth: string;
    endMonth: string;
    startYear: string;
    endYear: string;
    // competitionType: CompetitionType
  }