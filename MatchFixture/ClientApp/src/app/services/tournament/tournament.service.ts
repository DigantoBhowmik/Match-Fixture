import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateTournamentDto, TournamentDto } from "./tournament.model";

@Injectable({
  providedIn: "root",
})
export class TournamentService {
  private headers: HttpHeaders;
  private baseUrl: string = environment.apiUrl + "/api/Tournaments";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
  }
  public getTournaments() {
    return this.http.get<TournamentDto[]>(this.baseUrl + "/GetTournaments");
  }

  public addTournament(data: CreateTournamentDto) {
    return this.http.post(this.baseUrl + "/CreateTournament", data, {
      headers: this.headers,
    });
  }

  public updateTournamentById(id: number, data: CreateTournamentDto) {
    return this.http.put(
      this.baseUrl + "/UpdateTournamentById?id=" + id, data, {
      headers: this.headers
    });
  }

  public deleteTournamentById(id: number): Observable<TournamentDto> {
    return this.http.get<TournamentDto>(
      this.baseUrl + "/DeleteTournamentById?id=" + id
    );
  }
}
