type JsonPrimitive = string | number | boolean | null;

export type Json<T = JsonPrimitive> = T | JsonObject<T> | JsonArray<T>;

export interface JsonObject<T = JsonPrimitive> {
  [key: string]: Json<T>;
}

export type JsonArray<T = JsonPrimitive> = Json<T>[];

export abstract class ValueObject {
  public abstract toEvent(): any;

  protected cloneInto<T>(instance: T): T {
    const data = structuredClone(this);

    Object.entries(data).forEach(([key, value]) => {
      instance[key] = value;
    });

    return instance;
  }

  public isEqual(other: ValueObject): boolean {
    return deepEqual(this, other);
  }

  public toJSON(): Json {
    return this.toEvent();
  }
}

function deepEqual(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }

  return true;
}

function isObject(object: any) {
  return object != null && typeof object === 'object';
}
