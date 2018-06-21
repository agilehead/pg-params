export interface IParameters {
  [key: string]: any;
}

export default class Params<T extends IParameters> {
  params: [keyof T, number, any][];

  constructor(objParams: T) {
    this.params = Object.keys(objParams).map(
      (p, i): [keyof T, number, any] => [p, i + 1, objParams[p]]
    );
  }

  columns() {
    return this.params.map(p => p[0]).join(", ");
  }

  key(key: keyof T) {
    const result = this.params.find(x => x[0] === key);
    if (result) {
      return `$${result[1]}`;
    } else {
      throw new Error(`Could not find parameter by name ${key}.`);
    }
  }

  keys() {
    return this.params.map(p => `$${p[1]}`).join(", ");
  }

  values() {
    return this.params.reduce((acc, x) => acc.concat([x[2]]), [] as any[]);
  }
}
