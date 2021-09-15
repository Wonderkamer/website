import Component from '@glimmer/component';

export default class OccupancySingularComponent extends Component {
  get occupancies() {
    return this.args.occupancies || [];
  }

  get lastOccupancy() {
    return this.occupancies.sortBy('on').pop();
  }
}
