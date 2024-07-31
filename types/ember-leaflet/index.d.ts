declare module 'ember-leaflet/components/leaflet-map' {
  import Component from '@glimmer/component';

  interface Signature {
    Args: {
      lat: number;
      lng: number;
      zoom: number;
    };
    Blocks: { default: any };
  }

  export default class LeafletMap extends Component<Signature> {}

  declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
      LeafletMap: typeof LeafletMap;
    }
  }
}
