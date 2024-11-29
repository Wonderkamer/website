import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Logger , OnApplicationShutdown } from '@nestjs/common';
import { Job, Queue } from 'bullmq';

export abstract class AbstractProcessor extends WorkerHost implements OnApplicationShutdown {
  private readonly _logger: Logger;

  protected get logger() {
    return {
      log: (job: Job<any> | undefined, message: string) => this._logger.log(job?.name ? `[${job?.name}] ${message}` : `${message}`),
      error: (job: Job<any> | undefined, message: any) => this._logger.error(job?.name ? `[${job?.name}] ${message}` : `${message}`),
      warn: (job: Job<any> | undefined, message: string) => this._logger.warn(job?.name ? `[${job?.name}] ${message}` : `${message}`),
      debug: (job: Job<any> | undefined, message: string) => this._logger.debug(job?.name ? `[${job?.name}] ${message}` : `${message}`),
      verbose: (job: Job<any> | undefined, message: string) => this._logger.verbose(job?.name ? `[${job?.name}] ${message}` : `${message}`),
      fatal: (job: Job<any> | undefined, message: string) => this._logger.fatal(job?.name ? `[${job?.name}] ${message}` : `${message}`),
    };
  }

  private isStopped = false;

  protected abstract readonly queue: Queue;

  constructor(queueName: string) {
    super();

    this._logger = new Logger(queueName);
  }

  async onApplicationShutdown(): Promise<void> {
    this.isStopped = true;

    await this.worker.close();
  }

  abstract process(job: Job<any>): Promise<any>;

  protected get isShuttingDown(): boolean {
    return this.isStopped;
  }

  // @OnWorkerEvent('active')
  // onJobActive(job: Job<any>): void {
  //   this.logger.debug(job, `Job Active`);
  // }

  // @OnWorkerEvent('closed')
  // onWorkerClosed(): void {
  //   this.logger.debug(undefined, 'Worker closed');
  // }

  // @OnWorkerEvent('closing')
  // onWorkerClosing(msg: string): void {
  //   this.logger.debug(undefined, `Worker closing: ${msg}`);
  // }

  // @OnWorkerEvent('completed')
  // onJobCompleted(job: Job<any>, result: any): void {
  //   this.logger.debug(job, `completed with result: ${result}`);
  // }

  // @OnWorkerEvent('drained')
  // onWorkerDrained(): void {
  //   this.logger.debug(undefined, 'Worker drained');
  // }

  @OnWorkerEvent('error')
  onWorkerError(failedReason: Error): void {
    this.logger.error(undefined, `Worker error: ${failedReason.message}`);
  }

  // @OnWorkerEvent('failed')
  // onJobFailed(job: Job<any> | undefined, error: Error) {
  //   this.logger.error(job, `Job failed: ${error.message}`);
  // }

  // @OnWorkerEvent('paused')
  // onWorkerPaused(): void {
  //   this.logger.debug(undefined, 'Worker paused');
  // }

  // @OnWorkerEvent('progress')
  // onJobProgress(job: Job<any>, progress: number | { processed: number; total: number }) {
  //   if (typeof progress === 'object') {
  //     progress = Math.round((progress.processed / progress.total) * 1000) / 10;
  //   }
  //   this.logger.debug(job, `progress: ${progress}`);
  // }

  // @OnWorkerEvent('ready')
  // onWorkerReady() {
  //   this.logger.debug(undefined, 'Worker ready');
  // }

  // @OnWorkerEvent('resumed')
  // onJobResumed() {
  //   this.logger.debug(undefined, `Job resumed`);
  // }

  // @OnWorkerEvent('stalled')
  // onJobStalled(jobId: string) {
  //   this.logger.error(undefined, `Job ${jobId} stalled`);
  // }
}
