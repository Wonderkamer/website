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

interface Signature {
  Args: {
    Positional: [json: any];
    Named: { pretty?: boolean };
  };
  Return: string;
}

export default class JsonHelper extends Helper<Signature> {
  public compute([json]: [json: any], { pretty = true }: { pretty: boolean }): string {
    if (json === undefined) {
      return 'undefined';
    }

    try {
      return JSON.stringify(json, circularReplacer(), pretty ? 2 : undefined);
    } catch (error) {
      return String(error);
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    json: typeof JsonHelper;
  }
}
