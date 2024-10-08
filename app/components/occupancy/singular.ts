import Component from '@glimmer/component';

interface Args {
  occupancies: any[];
}

export default class OccupancySingularComponent extends Component<Args> {
  get occupancies() {
    return this.args.occupancies || [];
  }

  get lastOccupancy() {
    const lastOccupancy = this.occupancies
      .map((occupancy): { on: Date; occupancy: number } => {
        return {
          on: new Date(occupancy.on),
          occupancy: occupancy.occupancy,
        };
      })
      .sort((a, b) => a.on.getTime() - b.on.getTime())
      .pop() ?? { on: new Date() };

    return { ...lastOccupancy, ago: -daysBetween(lastOccupancy.on), unit: 'day' };
  }
}

function daysBetween(startDate: Date, endDate: Date = new Date()) {
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Occupancy::Singular': typeof OccupancySingularComponent;
  }
}
