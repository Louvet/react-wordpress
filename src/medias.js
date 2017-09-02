import { css } from 'styled-components'

const sizes = {
  lg: 1199,
  md: 1023,
  sm: 767,
  xs: 479,
  xxs: 0
}

const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] /// 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export default media;