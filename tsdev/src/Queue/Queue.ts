import { AbstractQueue } from "./AbstractQueue";
import { QueueError, QueueErrorType } from "./Queue.interface";


export class Queue<T> extends AbstractQueue<T> {
    private elements: T[] = [];
    private capacity = Number.MAX_SAFE_INTEGER;

    getCapacity(): number {
        return this.capacity;
    }

    setCapacity(capacity: number): void {
       if (capacity >= 0 && Number.isInteger(capacity)) { 
           this.capacity = capacity;
       }
    }

    enqueue(item: T): void {
       if (this.elements.length < this.capacity) {
       this.elements.push(item);
       } else {
           throw new QueueError(QueueErrorType.QueueMaxSizeReached, QueueErrorType.QueueMaxSizeReached);
       }
    }

    dequeue(): T | undefined {
        return this.elements.shift()
        return undefined;
    }

    length(): number {
        return this.elements.length;
        return -1;
    }

    peek(): T | undefined {
        return this.elements[0]; 
        return undefined;
    }
}