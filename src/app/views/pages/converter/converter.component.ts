import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConverterApiService } from "src/app/services/converter-api.service";
import { ExchangeInterface } from "./../../../interfaces/index";
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

  constructor(private converterApiService: ConverterApiService) {
    this.converterFromForm = new FormGroup({
      quantity: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      cc: new FormControl("USD", Validators.required),
    });

    this.converterToForm = new FormGroup({
      quantity: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      cc: new FormControl("USD", Validators.required),
    });
  }

  ngOnInit() {
    this.getExchanges();
  }

  getExchanges() {
    this.converterApiService.getExchanges().subscribe((data: any) => {
      this.exchanges = data;

      this.USD = data.filter((item: ExchangeInterface) => item.cc === "USD")[0];
      this.EUR = data.filter((item: ExchangeInterface) => item.cc === "EUR")[0];
    });
  }

  convertFrom(): number {
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

    const rate = 1;

    if (forms.from.cc === "UAH") {
      if (forms.to.cc === "EUR") {

        const res = forms.from.quantity * this.EUR.rate;
        this.converterToForm.get("quantity")?.setValue(res);
      }

      if (forms.to.cc === "USD") {
        const res = forms.from.quantity * this.USD.rate;
        this.converterToForm.get("quantity")?.setValue(res);
      }

      if (forms.to.cc === "UAH") {

        const res = forms.from.quantity;
        this.converterToForm.get("quantity")?.setValue(res);
      }
    }

    return 0;
  }
}
