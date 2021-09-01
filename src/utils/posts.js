export const getTotal = (all, limit) => {
  return Math.ceil(all / limit)
}

export const getArrayToNumber = (to) => {
  return new Array(to).fill(0).map((_, idx) => idx + 1)
}
