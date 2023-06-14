import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TeamDto } from "./team.model";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  private headers: HttpHeaders;
  private baseUrl: string = environment.apiUrl + "/api/Teams";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
  }

  public addTeam(data: TeamDto) {
    return this.http.post(this.baseUrl + "/CreateTeam", data, {
      headers: this.headers,
    });
  }

  public getTeams() {
    return this.http.get<TeamDto[]>(this.baseUrl + "/GetTeams");
  }

  public updateTeamById(id: number, data: TeamDto) {
    return this.http.put(
      this.baseUrl + "/UpdateTeamById?id=" + id, data, {
      headers: this.headers
    });
  }

  public deleteTeamById(id: number): Observable<TeamDto> {
    return this.http.get<TeamDto>(
      this.baseUrl + "/DeleteTeamById?id=" + id
    );
  }
}
