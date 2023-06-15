
export interface TeamDto {
  id: number;
  name: string;
}
export interface CreateTeamDto {
  tournamentId: number;
  name: string;
}
export interface UpdateTeamDto {
  name: string;
}