export interface ExchangeInterface {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export interface ExchangeRatesInterface {
  [from: string]: {
    [to: string]: number;
  };
}