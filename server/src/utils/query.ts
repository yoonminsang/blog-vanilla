/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const objectSpread = (obj: any, type: string) => {
  const spreadObject: any = {};
  const objType: any = obj[type];
  for (const key in objType) {
    spreadObject[key] = objType[key];
  }
  delete obj[type];
  return { ...obj, ...spreadObject };
};

const sliceText = (obj: any, type: string, count: number) => {
  obj[type] = obj[type].slice(0, count);
  return obj;
};

export { objectSpread, sliceText };
