class Observable {
  constructor() {
    this._observers = new Set();
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.notify();
  }
  subscribe(observer) {
    observer();
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
  }
  unsubscribeAll() {
    this._observers = new Set();
  }
  notify() {
    this._observers.forEach(observer => observer());
  }
}

export default Observable;
