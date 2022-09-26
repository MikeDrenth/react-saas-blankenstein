import styled from 'styled-components'

export const StyledBlockGrid = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 190px 190px 190px 190px;
  gap: 15px 15px;
  grid-template-areas: 'tile-1 tile-1 tile-2 tile-3' 'tile-1 tile-1 tile-2 tile-4' 'tile-5 tile-7 tile-8 tile-8' 'tile-6 tile-7 tile-8 tile-8';
  width: 100%;
  height: 100%;
  padding: 3rem;

  a {
    background-color: rgba(158, 211, 253, 0.5);
    border-radius: 0.25rem;
    padding: 0.75rem;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.25);
    transition: all 0.1s ease-in-out;
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    img {
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      img {
        transform: scale(1.1);
        transition: 0.3s;
      }
    }

    &:nth-child(1) {
      background: red;
      grid-area: tile-1;
    }
    &:nth-child(2) {
      background: red;
      grid-area: tile-2;
    }
    &:nth-child(3) {
      background: red;
      grid-area: tile-3;
    }
    &:nth-child(4) {
      background: red;
      grid-area: tile-4;
    }
    &:nth-child(5) {
      background: red;
      grid-area: tile-5;
    }
    &:nth-child(6) {
      background: red;
      grid-area: tile-6;
    }
    &:nth-child(7) {
      background: red;
      grid-area: tile-7;
    }
    &:nth-child(8) {
      background: red;
      grid-area: tile-8;
    }
  }
`
