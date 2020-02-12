import { EventEmitter } from 'events';

/**
 * Create an EventEmitter Object
 */
function createEventEmitter() {
    return new EventEmitter();
}

export default createEventEmitter();