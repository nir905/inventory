export const groupBy = (arr, key) =>
  arr.reduce((obj, item) => {
    const value = item[key];
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(value)) {
      obj[value] = [];
    }

    obj[value].push(item);
    return obj;
  }, {});
