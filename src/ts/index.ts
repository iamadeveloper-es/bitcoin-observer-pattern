import '../scss/style.scss';
import { API } from './class/api';
import {BitCoinObserver, RateObservable } from './class/observer';
import { Currency} from './definitions';


const bitCoinPrice = document.querySelector('#bitcoin .crypto__price')
const bitCoinStatus = document.querySelector('#bitcoin .fas');

let sub = new RateObservable();
let api = new API(Currency.BTC)

let ob = new BitCoinObserver(sub, bitCoinPrice, bitCoinStatus);

sub.setRate(api)

document.addEventListener('DOMContentLoaded', () => api.apiConnect().then(data => bitCoinPrice.innerHTML = `${data.data.rates.EUR} €`))

