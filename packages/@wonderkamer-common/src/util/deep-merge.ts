export function deepMerge(target, ...sources) {
  if (!sources.length) return target;

  const [source, ...rest] = sources;

  if (typeof target !== 'object' || target === null) {
    return deepMerge({}, source, ...rest);
  }

  for (const key in source) {
    if (typeof source[key] !== 'object' || source[key] === null) {
      target[key] = source[key];
    } else {
      if (!target[key]) {
        target[key] = Array.isArray(source[key]) ? [] : {};
      }

      // If both the source and target have the same key and they are both arrays, then merge them
      if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        target[key] = [...target[key], ...source[key]];
      } else {
        target[key] = deepMerge(target[key], source[key]);
      }
    }
  }

  return deepMerge(target, ...rest);
}

// // Example:
// const obj1 = {
//   a: 1,
//   b: {
//     x: 10,
//     y: 20,
//     z: [1, 2, 3],
//   },
// };

// const obj2 = {
//   b: {
//     y: 25,
//     z: [4, 5, 6],
//     w: 100,
//   },
//   c: 3,
// };

// const result = deepMerge(obj1, obj2);
// // { a: 1, b: { x: 10, y: 25, z: [1, 2, 3, 4, 5, 6], w: 100 }, c: 3 }
