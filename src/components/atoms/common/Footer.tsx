import React from 'react';
import styled from 'styled-components';

import color from '../../../config/color';
import fonts from '../../../config/fonts';

const BaseFooter: React.FCX = props => {
  return (
    <div className={props.className}>
      <div className="content">
        <div style={{ gridColumn: "1/2" }}>
          <h1>Ragnar Blog</h1>
        </div>
        <div style={{ gridColumn: "2/3" }}>
          <p>&copy;2020 Ragnar Blog</p>
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(BaseFooter)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.white};
  color: ${color.primary.dark};
  height: 30vh;
  .content {
    width: 75%;
    text-align: center;
    & h1 {
      font-family: ${fonts.logo};
      margin: 0.5em;
    }
    /* desktop */
    @media screen and (min-width: 800px) {
      & h1 {
        font-size: 2.8rem;
      }
      & p {
        font-size: 1.3rem;
      }
    }
  }
`;
