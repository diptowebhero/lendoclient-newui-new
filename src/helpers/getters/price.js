export function networkPrice(unitPrice = 0) {
  if (unitPrice !== null && unitPrice != undefined) {
    return `${unitPrice}`;
  } else {
    return "--";
  }
}
export function usdPriceDollor(unitPrice = 0) {
  if (unitPrice != null && unitPrice != undefined && unitPrice != "") {
    return `$${unitPrice.toFixed(2)}`;
  } else {
    return "--";
  }
}
export function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
