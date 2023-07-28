import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Args {
  occupancies: any[];
}

const now = new Date();

export default class OccupancyAveragesComponent extends Component<Args> {
  @service intl!: any;

  days = [0, 1, 2, 3, 4, 5, 6];
  hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  @tracked day: number | null = null;
  @tracked title: string | null = null;

  get occupancies() {
    return this.args.occupancies || [];
  }

  /**
   * @return [{day, average}]
   */
  get averageOccupancySplitByDay() {
    return this.days.map((value) => {
      const occupanciesForDay = this.occupancies.filter((occupancy) => {
        return new Date(occupancy.on).getDay() === value;
      });

      const average = occupanciesForDay.reduce((p, c) => p + c.occupancy, 0) / occupanciesForDay.length || 0;

      return { value, average };
    });
  }

  get averageOccupancySplitByHour() {
    return this.hours.map((value) => {
      const occupanciesForHour = this.occupancies
        .filter((occupancy) => {
          return new Date(occupancy.on).getDay() === this.day;
        })
        .filter((occupancy) => {
          return new Date(occupancy.on).getHours() === value;
        });

      const average = occupanciesForHour.reduce((p, c) => p + c.occupancy, 0) / occupanciesForHour.length || 0;

      return { value, average };
    });
  }

  get mode() {
    return isNone(this.day) ? 'days' : 'hours';
  }

  get listOfNormalizedAverages() {
    if (isNone(this.day)) {
      const averageOccupancySplitByDay = this.averageOccupancySplitByDay;
      const maxAverage = Math.max(...averageOccupancySplitByDay.map((o) => o.average));

      return averageOccupancySplitByDay.map((entry) => {
        const normalizedAverage = maxAverage === 0 ? maxAverage : entry.average / maxAverage;
        const day = now.setDate(now.getDate() - (now.getDay() || 7) + entry.value);
        return Object.assign(entry, {
          average: normalizedAverage,
          label: this.intl.formatDate(day, { weekday: 'short' }),
        });
      });
    }

    if (!isNone(this.day)) {
      const averageOccupancySplitByHour = this.averageOccupancySplitByHour;
      const maxAverage = Math.max(...averageOccupancySplitByHour.map((o) => o.average));

      return averageOccupancySplitByHour.map((entry) => {
        const normalizedAverage = maxAverage === 0 ? maxAverage : entry.average / maxAverage;

        return Object.assign(entry, {
          average: normalizedAverage,
          label: entry.value,
        });
      });
    }

    return [];
  }

  @action
  clicked(value: null | number, event: Event) {
    if (isNone(value) || !isNone(this.day)) {
      this.day = null;
      this.title = null;
    } else {
      const day = now.setDate(now.getDate() - (now.getDay() || 7) + value);

      this.day = value;
      this.title = this.intl.formatDate(day, { weekday: 'long' });
    }

    event.stopPropagation();
  }

  @action
  didInsertBar(element: HTMLElement, [value]: [number]) {
    const pixels = value * 32;

    element.style.height = pixels <= 1 ? '1px' : pixels + 'px';
  }
}
