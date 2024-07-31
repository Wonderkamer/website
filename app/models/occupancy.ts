import Model, { attr } from '@ember-data/model';

export default class OccupancyModel extends Model {
  @attr('date') on!: Date;

  @attr('number') occupancy!: number;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    occupancy: OccupancyModel;
  }
}
