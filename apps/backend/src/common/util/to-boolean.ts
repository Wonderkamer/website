const toBoolean = (value: any): boolean => {
  if (value === null || value === undefined) return false;

  switch (typeof value) {
    case 'string':
      return ['true', 't', 'yes', 'y', 'on', '1'].includes(value.trim().toLowerCase());

    case 'number':
      return value !== 0;

    case 'boolean':
      return value;

    default:
      return false;
  }
};

export { toBoolean };
