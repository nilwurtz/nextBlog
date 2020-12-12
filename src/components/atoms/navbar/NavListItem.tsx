import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  href: string;
};

export const NavListItem: React.FC<Props> = props => {
  return (
    <li>
      <Link href={props.href}>
        <a style={{ display: "block" }}>{props.name}</a>
      </Link>
    </li>
  );
};
