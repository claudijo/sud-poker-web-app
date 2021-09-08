export default class CommandQueue {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  enqueue(cmd, { delayStart = 0, delayEnd = 0} = {} )  {
    this.queue.push({ cmd, delayStart, delayEnd });
    this.dequeue();
  }

  dequeue() {
    if (this.isRunning || !this.queue.length) {
      return;
    }

    this.isRunning = true;
    const { cmd, delayStart, delayEnd } = this.queue.shift()
    setTimeout(() => {
      cmd.call(null)
      setTimeout(() => {
        this.isRunning = false;
        this.dequeue();
      }, delayEnd)
    }, delayStart);
  }
}