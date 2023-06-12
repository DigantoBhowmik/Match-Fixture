import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FixtureDto } from "./fixture.model";

@Injectable({
  providedIn: "root",
})
export class FixtureService {
  private headers: HttpHeaders;
  private baseUrl: string = environment.apiUrl + "/api/fixtures";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
  }

  public genarateFixture(): Observable<FixtureDto[]> {
    return this.http.get<FixtureDto[]>(
      this.baseUrl + "/GenarateFixture"
    );
  }
}
