"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const AbstractQueue_1 = require("./Queue/AbstractQueue");
const Queue_interface_1 = require("./Queue/Queue.interface");
class Queue extends AbstractQueue_1.AbstractQueue {
    constructor() {
        super(...arguments);
        this.elements = [];
        this.capacity = Number.MAX_SAFE_INTEGER;
    }
    enqueue(item) {
        if (this.elements.length < this.capacity) {
            this.elements.push(item);
        }
        else {
            throw new Queue_interface_1.QueueError(Queue_interface_1.QueueErrorType.QueueMaxSizeReached, Queue_interface_1.QueueErrorType.QueueMaxSizeReached);
        }
    }
    dequeue() {
        return this.elements.reverse().pop();
    }
    peek() {
        return this.elements[0];
    }
    length() {
        return this.elements.length;
    }
    setCapacity(capacity) {
        if (capacity >= 0 && Number.isInteger(capacity)) {
            this.capacity = capacity;
        }
    }
    getCapacity() {
        return this.capacity;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map