"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const Queue_interface_1 = require("./Queue.interface");
const Queue_1 = require("./Queue");
// Jest-Tests
(0, globals_1.describe)("Queue Tests", () => {
    let emptyQueue;
    let singleElementQueue;
    let multiElementQueue;
    let alternatingQueue;
    let overCapacityQueue;
    let mixedTypeQueue;
    (0, globals_1.beforeEach)(() => {
        // Leere Queue
        emptyQueue = new Queue_1.Queue();
        // Queue mit einem Element
        singleElementQueue = new Queue_1.Queue();
        singleElementQueue.enqueue(42);
        // Queue mit mehreren Elementen
        multiElementQueue = new Queue_1.Queue();
        multiElementQueue.enqueue(1);
        multiElementQueue.enqueue(2);
        multiElementQueue.enqueue(3);
        // Queue für abwechselnde Enqueue und Dequeue
        alternatingQueue = new Queue_1.Queue();
        alternatingQueue.enqueue(10);
        alternatingQueue.dequeue();
        alternatingQueue.enqueue(20);
        // Queue für gemischte Datentypen
        mixedTypeQueue = new Queue_1.Queue();
        mixedTypeQueue.enqueue(1);
        mixedTypeQueue.enqueue("two");
        // Queue für max size Test
        overCapacityQueue = new Queue_1.Queue();
        overCapacityQueue.setCapacity(2);
        overCapacityQueue.enqueue("Dies");
        overCapacityQueue.enqueue("ist ein ..");
    });
    // Testfälle für leere Queue
    (0, globals_1.test)("Testfall 1: Dequeue aus einer leeren Queue", () => {
        (0, globals_1.expect)(emptyQueue.dequeue()).toBeUndefined();
    });
    (0, globals_1.test)("Testfall 2: Size einer leeren Queue", () => {
        (0, globals_1.expect)(emptyQueue.length()).toBe(0);
    });
    // Testfälle für Queue mit einem Element
    (0, globals_1.test)("Testfall 3: Enqueue eines Elements in die leere Queue", () => {
        singleElementQueue.enqueue(99);
        (0, globals_1.expect)(singleElementQueue.length()).toBe(2);
    });
    (0, globals_1.test)("Testfall 4: Dequeue aus der Queue mit einem Element", () => {
        (0, globals_1.expect)(singleElementQueue.dequeue()).toBe(42);
    });
    (0, globals_1.test)("Testfall 5: Size nach Enqueue und Dequeue in der Queue mit einem Element", () => {
        singleElementQueue.enqueue(55);
        singleElementQueue.dequeue();
        (0, globals_1.expect)(singleElementQueue.length()).toBe(1);
    });
    // Testfälle für Queue mit mehreren Elementen
    (0, globals_1.test)("Testfall 6: Enqueue mehrerer Elemente in die leere Queue", () => {
        (0, globals_1.expect)(multiElementQueue.length()).toBe(3);
    });
    (0, globals_1.test)("Testfall 7: Dequeue aus der Queue mit mehreren Elementen", () => {
        (0, globals_1.expect)(multiElementQueue.dequeue()).toBe(1);
    });
    (0, globals_1.test)("Testfall 8: Size nach mehreren Enqueue und Dequeue-Operationen in der Queue mit mehreren Elementen", () => {
        multiElementQueue.enqueue(4);
        multiElementQueue.dequeue();
        (0, globals_1.expect)(multiElementQueue.length()).toBe(3);
    });
    // Testfälle für abwechselndes Enqueue und Dequeue
    (0, globals_1.test)("Testfall 9: Abwechselndes Enqueue und Dequeue und Überprüfung der korrekten Reihenfolge", () => {
        (0, globals_1.expect)(alternatingQueue.dequeue()).toBe(20);
        alternatingQueue.enqueue(30);
        (0, globals_1.expect)(alternatingQueue.dequeue()).toBe(30);
    });
    // Testfall für Enqueue mehr Elemente als die Kapazität der Queue
    (0, globals_1.test)("Testfall 10: Enqueue mehr Elemente als die maximale Kapazität der Queue und Überprüfung des Verhaltens", () => {
        (0, globals_1.expect)(overCapacityQueue.getCapacity()).toBe(2);
        (0, globals_1.expect)(overCapacityQueue.length()).toBe(2);
        (0, globals_1.expect)(() => overCapacityQueue.enqueue("Test")).toThrow(Queue_interface_1.QueueError);
        try {
            overCapacityQueue.enqueue("Test");
        }
        catch (e) {
            (0, globals_1.expect)(e.message).toBe(Queue_interface_1.QueueErrorType.QueueMaxSizeReached);
        }
    });
    // Testfall für Mischung von Datentypen
    (0, globals_1.test)("Testfall 11: Enqueue von verschiedenen Datentypen in die Queue und Überprüfung der korrekten Verarbeitung", () => {
        (0, globals_1.expect)(mixedTypeQueue.length()).toBe(2);
        (0, globals_1.expect)(mixedTypeQueue.peek()).toBe(1);
        (0, globals_1.expect)(mixedTypeQueue.dequeue()).toBe(1);
        (0, globals_1.expect)(mixedTypeQueue.dequeue()).toBe("two");
    });
});
//# sourceMappingURL=Queue.test.js.map