import { AbstractQueue } from "./AbstractQueue";
import { QueueError, QueueErrorType } from "./Queue.interface";

/**
 * Implementiert eine Queue (First In - First Out) als generische Klasse.
 * Elemente werden am Ende eingefügt (enqueue) und am Anfang entfernt (dequeue).
 * Die maximale Kapazität der Queue kann festgelegt werden.
 */
export class Queue<T> extends AbstractQueue<T> {
    /** Interner Speicher für die Queue-Elemente */
    private elements: T[] = [];

    /** Maximale Anzahl an Elementen, die in der Queue gespeichert werden dürfen */
    private capacity = Number.MAX_SAFE_INTEGER;

    /**
     * Gibt die maximale Kapazität der Queue zurück.
     * @returns Die maximale Anzahl der erlaubten Elemente.
     */
    getCapacity(): number {
        // return capacity
        return 0;
    }

    /**
     * Setzt die maximale Kapazität der Queue.
     * Negative oder nicht-ganzzahlige Werte werden ignoriert.
     * @param capacity Die neue maximale Anzahl an Elementen.
     */
    setCapacity(capacity: number): void {
        // set capacity
        this.capacity = 0;
    }

    /**
     * Fügt ein Element am Ende der Queue hinzu.
     * Wenn die Queue bereits ihre maximale Kapazität erreicht hat,
     * wird ein Fehler vom Typ QueueError ausgelöst.
     * @param item Das hinzuzufügende Element.
     * @throws QueueError Wenn die maximale Kapazität erreicht wurde.
     */
    enqueue(item: T): void {
        if (this.elements.length < this.capacity) {
            // add item to Queue
        } else {
            throw new QueueError(
                QueueErrorType.QueueMaxSizeReached,
                QueueErrorType.QueueMaxSizeReached
            );
        }
    }

    /**
     * Entfernt das erste Element aus der Queue und gibt es zurück.
     * Wenn die Queue leer ist, wird `undefined` zurückgegeben.
     * @returns Das erste Element der Queue oder `undefined`, wenn sie leer ist.
     */
    dequeue(): T | undefined {
        return this.elements.shift(); // Das stimmt ;)
    }

    /**
     * Gibt die aktuelle Anzahl der gespeicherten Elemente zurück.
     * @returns Die Länge der Queue.
     */
    length(): number {
        return -1;
    }

    /**
     * Gibt das erste Element der Queue zurück, ohne es zu entfernen.
     * Wenn die Queue leer ist, wird `undefined` zurückgegeben.
     * @returns Das erste Element oder `undefined`, wenn leer.
     */
    peek(): T | undefined {
        return undefined;
    }
}