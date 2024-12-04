enum GenericState {
  erroneous = 'erroneous',
}

export default class State<T, E> {
  readonly state: T | GenericState.erroneous;
  readonly error?: E;
  readonly detail?: string;

  private constructor({ state, error, detail }: { state?: T | GenericState.erroneous; error?: E; detail?: string }) {
    this.state = state;
    this.error = error;
    this.detail = detail;
  }

  static state<T, E>(state: T) {
    return new State<T, E>({ state });
  }

  static error<T, E>(error: E, detail?: string) {
    return new State<T, E>({ state: GenericState.erroneous, error, detail });
  }

  get isErroneous(): boolean {
    return this.state === GenericState.erroneous;
  }

  toString() {
    if (this.error) {
      if (this.detail) {
        return `${this.state}: ${this.error} (${this.detail})`;
      } else {
        return `${this.state}: ${this.error}`;
      }
    }

    return `${this.state}`;
  }

  toJSON() {
    return {
      state: this.state,
      error: this.error,
      detail: this.detail,
    };
  }

  static fromJSON<T, E>(json: { state: T | GenericState; error?: E; detail?: string }) {
    return new State<T, E>(json);
  }
}
