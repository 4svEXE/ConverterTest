// currency-converter.component.ts
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-currency-converter",
  templateUrl: "./currency-converter.component.html",
  styleUrls: ["./currency-converter.component.scss"],
})
export class CurrencyConverterComponent {
  @Input() converterForm: FormGroup = new FormGroup({});
  @Input() title: string = '';
  @Output() formValueChanged = new EventEmitter<void>();
}
