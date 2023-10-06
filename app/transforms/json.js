import Transform from '@ember-data/serializer/transform';

export default class JsonTransform extends Transform {
  deserialize(serialized) {
    if (typeof serialized === 'string') {
      return JSON.parse(serialized);
    } else {
      return serialized;
    }
  }

  serialize(deserialized) {
    if (typeof deserialized === 'object') {
      return JSON.stringify(deserialized);
    } else {
      return deserialized;
    }
  }
}
