import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

export default class HeadDataService extends Service {
  @tracked touchIcon!: string;
}
