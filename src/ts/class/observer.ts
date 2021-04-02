
import { Observable, Observer } from "../interfaces"
import { API } from "./api"
import gsap from "gsap";

export class RateObservable implements Observable {
    private observers: Array<Observer> = []
    private rate: number

    
    registerObserver(o: Observer) {
        this.observers.push(o)
    }
    notifyObservers() {
        this.observers.map(observer => observer.update())
    }
    setRate(api: API) {
        setInterval(() => {
            api.apiConnect()
            .then(data => {
                this.rate = data.data.rates.EUR
                //console.log('RateObservable', this.rate)
                this.notifyObservers()
            })
        }, 2000)

    }
    getRate(): number{
        return this.rate
    }

}


export class BitCoinObserver implements Observer {
    private observable: RateObservable
    private rate: any
    private node: Element
    private statusNode: Element

    constructor(observable: RateObservable, node: Element, statusNode: Element) {
        this.observable = observable
        this.observable.registerObserver(this)
        this.node = node
        this.statusNode = statusNode
    }

    update(): number {
        if(this.rate < this.observable.getRate()){
            this.statusNode.classList.add('fa-long-arrow-alt-up')
            this.statusNode.classList.remove('fa-long-arrow-alt-down')
            let tl = new TimelineMax()
            tl.to('.fa-long-arrow-alt-up', 1, {
                y: -50,
                opacity: 0
            })
        }
        if(this.rate > this.observable.getRate()){
            this.statusNode.classList.add('fa-long-arrow-alt-down')
            this.statusNode.classList.remove('fa-long-arrow-alt-up')
            let tl = new TimelineMax({repeat:1, yoyo:true})
            tl.to('.fa-long-arrow-alt-down', 1, {
                y: 50,
                opacity: 0
            })
        }
        if(this.rate != this.observable.getRate()){
            this.rate = this.observable.getRate()
            console.log(this.rate)
            this.node.innerHTML = `${this.rate.toString()} €`
        }
        return this.rate
    }


}
