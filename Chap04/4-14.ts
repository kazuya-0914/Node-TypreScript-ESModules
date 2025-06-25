import { EventEmitter } from 'events';

interface MyEvents {
  myevent: (data: string) => void;
}

class MyEmitter extends EventEmitter {
  override on<K extends keyof MyEvents>(event: K, listener: MyEvents[K]): this {
    return super.on(event, listener);
  }
  override emit<K extends keyof MyEvents>(event: K, ...args: Parameters<MyEvents[K]>): boolean {
    return super.emit(event, ...args);
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('myevent', (data) => {
  console.log('On MyEvent:', data);
});

myEmitter.emit('myevent', 'one');

setTimeout(() => {
  myEmitter.emit('myevent', 'two');
}, 1000);