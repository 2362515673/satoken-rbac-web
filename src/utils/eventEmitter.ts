// eslint-disable-next-line @typescript-eslint/no-unused-vars
const eventNames = ['API:UN_AUTH', 'API:INVALID']
type EventNames = (typeof eventNames)[number];

class EventEmitter {
  private listeners: Record<string, Set<(...args: never[]) => void>> = {
    'API:UN_AUTH': new Set(),
    'API:INVALID': new Set()
  }

  on(eventName: EventNames, listener: (...args: never[]) => void) {
    this.listeners[eventName].add(listener)
  }

  emit(eventName: EventNames, ...args: never[]) {
    this.listeners[eventName].forEach((listener) => listener(...args))
  }
}

export default new EventEmitter()
