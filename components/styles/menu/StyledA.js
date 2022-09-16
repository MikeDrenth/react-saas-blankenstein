import styled from 'styled-components'

export const StyledA = styled.a`
  color: #333;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  transition: 0.3s;
  margin: 0 0.25rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  position: relative;

  &:hover {
    color: #3e78a5;
    padding: 0.25rem;
    cursor: pointer;
    transition: 0.3s;

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #3e78a5;
    }
  }
`
