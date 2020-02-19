import styled from 'styled-components';

import color from '../../config/color';

export const WhichBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: 100%;
  /* desktop */
  @media screen and (min-width: 800px) {
    grid-template-rows: none;
    grid-template-column: 1fr 1fr;
  }
`;

export const WhichItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const LikeItem = styled(WhichItem)`
  transition: background-color 300ms ease-out;
  &:hover {
    background-color: ${color.secondary};
  }
`;
