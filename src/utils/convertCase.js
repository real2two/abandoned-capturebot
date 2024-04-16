export function camelize(object) {
  if (Array.isArray(object)) return object.map((element) => camelize(element));

  if (typeof object === 'object' && object !== null) {
    const obj = {};
    Object.keys(object).forEach((key) => {
      obj[snakeToCamelCase(key)] = camelize(object[key]);
    });
    return obj;
  }

  return object;
}

export function snakelize(object) {
  if (Array.isArray(object)) return object.map((element) => snakelize(element));

  if (typeof object === 'object' && object !== null) {
    const obj = {};
    Object.keys(object).forEach((key) => {
      obj[camelToSnakeCase(key)] = snakelize(object[key]);
    });
    return obj;
  }

  return object;
}

export function camelToSnakeCase(str) {
  let result = '';
  for (let i = 0, len = str.length; i < len; ++i) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      result += `_${str[i].toLowerCase()}`;
      continue;
    }
    result += str[i];
  }
  return result;
}

export function snakeToCamelCase(str) {
  if (!str.includes('_')) return str;

  let result = '';
  for (let i = 0, len = str.length; i < len; ++i) {
    if (str[i] === '_') {
      result += str[++i].toUpperCase();
      continue;
    }
    result += str[i];
  }

  return result;
}
