import { dateSortDesc } from '../dateSortDesc'

describe('dateSortDesc', () => {
  it('should return -1 when the first date is greater than the second date', () => {
    expect(dateSortDesc(3, 2)).toBe(-1)
    expect(dateSortDesc(100, 50)).toBe(-1)
    expect(dateSortDesc(new Date('2022-01-01').getTime(), new Date('2021-01-01').getTime())).toBe(
      -1
    )
  })

  it('should return 1 when the first date is less than the second date', () => {
    expect(dateSortDesc(2, 3)).toBe(1)
    expect(dateSortDesc(50, 100)).toBe(1)
    expect(dateSortDesc(new Date('2021-01-01').getTime(), new Date('2022-01-01').getTime())).toBe(1)
  })

  it('should return 0 when both dates are equal', () => {
    expect(dateSortDesc(3, 3)).toBe(0)
    expect(dateSortDesc(100, 100)).toBe(0)
    expect(dateSortDesc(new Date('2021-01-01').getTime(), new Date('2021-01-01').getTime())).toBe(0)
  })
})
