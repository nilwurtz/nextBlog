import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  href: string;
};

export const NavListItem: NextComponentType<NextPageContext, {}, Props> = props => {
  return (
    <li>
      <Link href={props.href}>
        <a style={{ display: "block" }}>{props.name}</a>
      </Link>
    </li>
  );
};
