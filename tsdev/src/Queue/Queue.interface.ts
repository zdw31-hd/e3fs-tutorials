export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    length(): number;
    setCapacity(capacity:Number): void;
    getCapacity(): Number;
  }  

export enum QueueErrorType {
    QueueMaxSizeReached = "QueueMaxSizeReached!"
}

export class QueueError extends Error {
    constructor(errorType: QueueErrorType, message?: string) {
      super(message);
      this.name = errorType;
      Object.setPrototypeOf(this, QueueError.prototype);
    }
  }
  
 