import styled from 'styled-components'

export const StyledObjectInfo = styled.aside`
  background: white;
  padding: 1rem;

  h1 {
    margin-top: 0;
    color: #3e78a5;
    margin-bottom: 0.75rem;
  }

  p {
    margin-top: 0;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;

    li {
      padding-right: 1.25rem;
      font-size: 0.75rem;
    }
  }

  a {
    margin-top: 2rem;
    display: inline-block;
    border: 1px solid #3e78a5;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
`
