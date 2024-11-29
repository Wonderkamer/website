declare module 'multi-ini' {
  export default {
    ini: {
      Parser: Parser,
      Serializer: Serializer,
    },
    Parser: Parser,
    Serializer: Serializer,
  };
  export class Parser {
    constructor(options?: any);
    parse(value: string[]): any;
  }
  export class Serializer {
    constructor(options?: any);
    serialize(object: Record<string, any>): string;
  }
}
