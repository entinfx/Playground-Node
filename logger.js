const EventEmitter = require('events');

let id = 0;

class Logger extends EventEmitter {
    log(eventName, url) {
        this.emit(eventName, { id: id, eventName: eventName, url: url });
        id++;
    }
}

module.exports = Logger

