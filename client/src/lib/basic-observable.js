class Observable {
  constructor() {
    this.observers = new Set();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.notify();
  }

  subscribe(observer) {
    observer();
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers = [...this.observers].filter(subscriber => subscriber !== observer);
  }

  unsubscribeAll() {
    this.observers = new Set();
  }

  notify() {
    this.observers.forEach(observer => observer());
  }
}

export default Observable;
