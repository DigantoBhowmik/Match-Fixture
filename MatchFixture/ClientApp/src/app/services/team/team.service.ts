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

  public addTeam(data) {
    return this.http.post(this.baseUrl + "/CreateTeam", data, {
      headers: this.headers,
    });
  }
}
