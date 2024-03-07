import { AbstractQueue} from "./Queue/AbstractQueue";
import { IQueue, QueueError, QueueErrorType } from "./Queue/Queue.interface";

export class Queue<T> extends AbstractQueue<T>  {
    private elements: T[] = [];
    private capacity = Number.MAX_SAFE_INTEGER;


    enqueue(item: T): void {
        if (this.elements.length < this.capacity) {
            this.elements.push(item);
        } else {
            throw new QueueError(QueueErrorType.QueueMaxSizeReached, QueueErrorType.QueueMaxSizeReached)
        }
    }

    dequeue(): T | undefined {
       return this.elements.reverse().pop();
    }
    peek(): T | undefined {
        return this.elements[0];
    }
    length(): number {
        return this.elements.length;
    }
    setCapacity(capacity: number): void {
        if (capacity >= 0 && Number.isInteger(capacity)) {
            this.capacity = capacity;
        }
    }
    getCapacity(): number {
        return this.capacity;
    }
} 
