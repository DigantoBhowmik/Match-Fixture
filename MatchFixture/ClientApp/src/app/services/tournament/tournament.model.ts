export interface TournamentDto {
    id: number;
    name: string;
    startMonth: string;
    endMonth: string;
  }
  export interface CreateTournamentDto {
    name: string;
    startMonth: string;
    endMonth: string;
  }