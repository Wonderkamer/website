import { Queue } from 'bullmq';

export default class JobQueueManager {
  private static queues = new Map<string, Queue>();

  static addQueue(name: string, queue: Queue) {
    this.queues.set(name, queue);
  }

  static getQueue<T>(name: string): Queue<T> {
    if (!this.queues.has(name)) {
      throw new Error(`Queue ${name} not found`);
    }

    return this.queues.get(name) as Queue;
  }
}
