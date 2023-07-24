import { Component } from "@angular/core";
import { ConverterApiService } from "src/app/services/converter-api.service";
import { ExchangeInterface } from "./../../../interfaces/index";
import { fakeExchange } from "src/app/db/fakeExchange";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isActiveHeader: boolean = false;

  exchanges: ExchangeInterface[] = [];
  USD: ExchangeInterface = fakeExchange;
  EUR: ExchangeInterface = fakeExchange;

  constructor(private converterApiService: ConverterApiService) {}

  getExchanges() {
    this.converterApiService.getExchanges().subscribe((data: any) => {
      this.exchanges = data;

      this.USD = data.filter((item: ExchangeInterface) => item.cc === "USD")[0];
      this.EUR = data.filter((item: ExchangeInterface) => item.cc === "EUR")[0];
    });
  }

  ngOnInit() {
    this.getExchanges();
  }
}
