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

  exchanges: ExchangeInterface[] = []; // Масив об'єктів валют з API
  USD: ExchangeInterface = fakeExchange; // Об'єкт валюти USD, за замовчуванням - фейкові дані
  EUR: ExchangeInterface = fakeExchange; // Об'єкт валюти EUR, за замовчуванням - фейкові дані

  constructor(private converterApiService: ConverterApiService) {}

  // Метод для отримання списку валют зі служби API обміну валют
  getExchanges() {
    this.converterApiService.getExchanges().subscribe((data: any) => {
      this.exchanges = data;

      // Знаходимо об'єкти валют для USD і EUR зі списку
      this.USD =
        data.find((item: ExchangeInterface) => item.cc === "USD") ||
        fakeExchange;
      this.EUR =
        data.find((item: ExchangeInterface) => item.cc === "EUR") ||
        fakeExchange;
    });
  }

  ngOnInit() {
    this.getExchanges(); // Отримуємо список валют при завантаженні компонента
  }
}
