import { Queue } from 'bullmq';

export default class JobQueueManager {
  private static queues = new Map<string, Queue<any>>(); // Allow any type of Queue here

  static addQueue(name: string, queue: Queue<any>) {
    this.queues.set(name, queue);
  }

  static getQueue<T>(name: string): Queue<T> {
    const queue = this.queues.get(name);

    if (!queue) {
      throw new Error(`Queue ${name} not found`);
    }

    return queue as Queue<T>;
  }
}
