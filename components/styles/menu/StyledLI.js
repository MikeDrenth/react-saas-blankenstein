import styled from 'styled-components'

export const StyledLi = styled.li`
  display: flex;
  align-items: center;
  padding: 0.25rem;

  &.active {
    a {
      color: #3e78a5;

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
  }
`
