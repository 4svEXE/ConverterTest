import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConverterApiService {
  readonly API_URL;

  constructor(private http: HttpClient) {
    this.API_URL =
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
  }

  getExchanges() {
    return this.http.get(this.API_URL);
  }
}
