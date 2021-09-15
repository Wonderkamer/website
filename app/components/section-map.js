import Component from '@glimmer/component';
import mapStyle from '../config/google-map-style/renault';

export default class SectionMapComponent extends Component {
  lat = 52.362;
  lng = 4.86325;
  zoom = 15;

  mapStyle = mapStyle;
}
