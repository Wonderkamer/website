import Helper from '@ember/component/helper';

const circularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '#reference';
      }
      seen.add(value);
    }
    return value;
  };
};

export default class Json extends Helper {
  compute(params: any, hash: any) {
    let [json] = params;
    const { pretty = true }: { pretty: boolean } = hash;

    if (json === undefined) {
      json = 'undefined';
    }

    try {
      return JSON.stringify(json, circularReplacer(), pretty ? 2 : undefined);
    } catch (error) {
      return error;
    }
  }
}
