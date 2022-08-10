import React from 'react'
import styled from 'styled-components'

const StyledBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const HeroImage = ({ alt, ...props }) => (
  <StyledBackgroundImage>
    <img {...props} alt={alt} />
  </StyledBackgroundImage>
)

export default HeroImage
