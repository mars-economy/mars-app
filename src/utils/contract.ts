import BigNumber from 'bignumber.js'

export function _toBN (num, dec) {
  return new BigNumber(new BigNumber(num).multipliedBy(Math.pow(10, Number(dec)))).integerValue(BigNumber.ROUND_DOWN)
}

export function convertFromWei (str, decimals = 18) {
  if (str) {
    return +str / Math.pow(10, +decimals)
  }
}

export async function checkAllowance (contract, owner, spender, amount) {
  const approvedBalance = await contract.methods.allowance(owner, spender).call()
  if (new BigNumber(approvedBalance).gte(amount)) {
    return false
  }
  return ((new BigNumber(2).pow(256)).minus(1))
    .integerValue(BigNumber.ROUND_DOWN)
    .toFixed()
}
