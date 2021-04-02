import { Currency, Rates } from "../definitions"

export class API{
    private url: string
    data: any[] = []
    currency: Currency
    rates: Rates

    constructor(currency: Currency){
        this.currency = currency
        this.url = `https://api.coinbase.com/v2/exchange-rates?currency=${this.currency}`
    }

    async apiConnect(){
        let response = await fetch(this.url)
        let data = await response.json()
        return data
    }
}