"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const AbstractQueue_1 = require("./AbstractQueue");
const Queue_interface_1 = require("./Queue.interface");
class Queue extends AbstractQueue_1.AbstractQueue {
    constructor() {
        super(...arguments);
        this.elements = [];
        this.capacity = Number.MAX_SAFE_INTEGER;
    }
    getCapacity() {
        return this.capacity;
    }
    setCapacity(capacity) {
        if (capacity >= 0 && Number.isInteger(capacity)) {
            this.capacity = capacity;
        }
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
        return this.elements.shift();
        return undefined;
    }
    length() {
        return this.elements.length;
        return -1;
    }
    peek() {
        return this.elements[0];
        return undefined;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map