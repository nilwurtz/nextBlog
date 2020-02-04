import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  href: string;
};

export const NavListItem: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <li>
      <Link href={props.href}>
        <a>{props.name}</a>
      </Link>
    </li>
  );
};
