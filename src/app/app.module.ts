import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./views/shared/header/header.component";
import { ConverterComponent } from './views/pages/converter/converter.component';
import { CurrencyConverterComponent } from './views/pages/converter/currency-converter/currency-converter.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ConverterComponent, CurrencyConverterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
