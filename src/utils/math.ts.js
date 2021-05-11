export function mathRound (number, decimalPlaces = 6) {
  const factorOfTen = Math.pow(10, decimalPlaces)
  return Math.round(number * factorOfTen) / factorOfTen
}
