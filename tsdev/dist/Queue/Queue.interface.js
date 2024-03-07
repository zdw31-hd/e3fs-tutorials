"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueError = exports.QueueErrorType = void 0;
var QueueErrorType;
(function (QueueErrorType) {
    QueueErrorType["QueueMaxSizeReached"] = "QueueMaxSizeReached!";
})(QueueErrorType || (exports.QueueErrorType = QueueErrorType = {}));
class QueueError extends Error {
    constructor(errorType, message) {
        super(message);
        this.name = errorType;
        Object.setPrototypeOf(this, QueueError.prototype);
    }
}
exports.QueueError = QueueError;
//# sourceMappingURL=Queue.interface.js.map