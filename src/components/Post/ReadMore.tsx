import styled from 'styled-components';

import color from '../../config/color';

export const ReadMoreButton = styled.button`
  color: ${color.primary.dark};
  border: solid 1px ${color.primary.dark};
  padding: 0.5em 1em;
  font-size: 1.6rem;
  transition: background-color 200ms ease-out, color 200ms ease-out;
  &:hover {
    background: ${color.primary.dark};
    color: white;
  }
`;

export const ReadMoreArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-top: 5rem;
`;
