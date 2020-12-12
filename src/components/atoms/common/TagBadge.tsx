import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import color from '../../../config/color';

type Props = {
  href: string;
  label: string;
  linkAs?: string;
  className?: string;
};

const Base: React.FC<Props> = props => {
  return (
    <Link href={props.href} as={props.linkAs}>
      <button className={props.className}>
        <span>{props.label}</span>
      </button>
    </Link>
  );
};

export const TagBadge = styled(Base)`
  border-radius: 5em;
  font-size: 1.2rem;
  padding: 0.2em 0.7em;
  background-color: ${color.secondary};

  @media screen and (min-width: 800px) {
    font-size: 1.6rem;
  }
  & a {
    text-decoration: none;
    cursor: pointer;
    display: block;
  }
`;
