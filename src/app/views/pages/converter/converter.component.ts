import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConverterApiService } from "src/app/services/converter-api.service";
import { ExchangeInterface, ExchangeRatesInterface } from "./../../../interfaces/index";
import { fakeExchange } from "src/app/db/fakeExchange";

@Component({
  selector: "app-converter",
  templateUrl: "./converter.component.html",
  styleUrls: ["./converter.component.scss"],
})
export class ConverterComponent {
  converterFromForm: FormGroup;
  converterToForm: FormGroup;

  exchanges: ExchangeInterface[] = [];
  USD: ExchangeInterface = fakeExchange;
  EUR: ExchangeInterface = fakeExchange;

  // Метод для створення форми конвертера з заданим значенням валюти за замовчуванням
  createConverterForm(defaultCc: string): FormGroup {
    return new FormGroup({
      quantity: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      cc: new FormControl(defaultCc, Validators.required),
    });
  }

  constructor(private converterApiService: ConverterApiService) {
    // Створюємо форми конвертера з валютою USD за замовчуванням
    this.converterFromForm = this.createConverterForm("USD");
    this.converterToForm = this.createConverterForm("USD");
  }

  ngOnInit() {
    // Отримуємо список валют зі служби інтернет-обміну
    this.getExchanges();
  }

  // Отримати список валют зі служби інтернет-обміну
  getExchanges() {
    this.converterApiService.getExchanges().subscribe((data: any) => {
      this.exchanges = data;

      // Знайдемо курси валют для USD і EUR
      this.USD =
        data.find((item: ExchangeInterface) => item.cc === "USD") ||
        fakeExchange;
      this.EUR =
        data.find((item: ExchangeInterface) => item.cc === "EUR") ||
        fakeExchange;
    });
  }

  // Метод для конвертації валют з форми конвертера
  convertFrom(): void {
    const forms = {
      from: {
        quantity: this.converterFromForm.get("quantity")?.value,
        cc: this.converterFromForm.get("cc")?.value,
      },
      to: {
        quantity: this.converterToForm.get("quantity")?.value,
        cc: this.converterToForm.get("cc")?.value,
      },
    };

    // Об'єкт з курсами обміну валют
    const exchangeRates: ExchangeRatesInterface = {
      UAH: {
        USD: this.USD.rate / 1000,
        EUR: this.EUR.rate / 1000,
      },
      USD: {
        UAH: this.USD.rate,
        EUR: (this.EUR.rate / 1000) * this.USD.rate,
      },
      EUR: {
        UAH: this.EUR.rate,
        USD: (this.USD.rate / 1000) * this.EUR.rate,
      },
    };

    // Знаходимо курс між валютами або встановлюємо значення 1, якщо курс не знайдено
    let rate = exchangeRates[forms.from.cc][forms.to.cc] || 1;

    // Обчислюємо результат конвертації
    let res = forms.from.quantity * rate;

    // Встановлюємо результат конвертації в поле кількості для валюти, куди конвертуємо
    this.converterToForm.get("quantity")?.setValue(res);
  }
}
