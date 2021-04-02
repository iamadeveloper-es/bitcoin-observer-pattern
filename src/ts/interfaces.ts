export interface Observable{
    registerObserver(o: Observer)
    notifyObservers()
}

export interface Observer{
    update()
}