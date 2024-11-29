export default function orderObjectKeys<T>(config: T): T {
  const orderedObject = Object.keys(config)
    .sort() // Sort keys alphabetically
    .reduce((obj: T, key) => {
      obj[key] = config[key]; // Assign each key to the new object

      return obj;
    }, {} as T);

  return orderedObject;
}
