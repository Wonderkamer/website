export default class FifoList<T> {
  private items: T[] = [];
  private maxLength: number;

  constructor(maxLength: number) {
    if (maxLength < 1) {
      throw new Error('maxLength must be at least 1');
    }

    this.maxLength = maxLength;
  }

  add(item: T, append = false): FifoList<T> {
    if (append) {
      this.items.push(item);

      if (this.items.length > this.maxLength) {
        this.items.shift(); // Removes the first element
      }
    } else {
      this.items.unshift(item);

      if (this.items.length > this.maxLength) {
        this.items.pop(); // Removes the last element
      }
    }

    return this;
  }

  last(): T | undefined {
    return this.items[this.items.length - 1];
  }

  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    const items = this.items;

    return {
      next(): IteratorResult<T> {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: null, done: true };
        }
      },
    };
  }
}
