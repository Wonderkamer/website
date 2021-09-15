import Component from '@glimmer/component';
import moment from 'moment';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class OccupancyAveragesComponent extends Component {
  @service intl;

  days = [0, 1, 2, 3, 4, 5, 6];
  hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  @tracked day;
  @tracked title;

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
      const maxAverage = Math.max.apply(
        Math,
        averageOccupancySplitByDay.map(function (o) {
          return o.average;
        })
      );

      return averageOccupancySplitByDay.map((entry) => {
        const normalizedAverage = maxAverage === 0 ? maxAverage : entry.average / maxAverage;
        return Object.assign(entry, { average: normalizedAverage, label: moment.localeData(moment.locale())._weekdaysMin[entry.value] });
      });
    }

    if (!isNone(this.day)) {
      const averageOccupancySplitByHour = this.averageOccupancySplitByHour;
      const maxAverage = Math.max.apply(
        Math,
        averageOccupancySplitByHour.map(function (o) {
          return o.average;
        })
      );

      return averageOccupancySplitByHour.map((entry) => {
        const normalizedAverage = maxAverage === 0 ? maxAverage : entry.average / maxAverage;

        return Object.assign(entry, { average: normalizedAverage, label: entry.value });
      });
    }

    return [];
  }

  @action
  clicked(value, event) {
    if (isNone(value) || !isNone(this.day)) {
      this.day = null;
      this.title = null;
    } else {
      this.day = value;
      this.title = this.intl.t('occupancy.days.' + moment.localeData('en')._weekdays[value].toString().toLowerCase());
    }

    event.stopPropagation();
  }

  @action
  didInsertBar(element, [value]) {
    const pixels = value * 32;

    element.style.height = pixels <= 1 ? '1px' : pixels + 'px';
  }
}
