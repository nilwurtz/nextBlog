import React from 'react';
import styled from 'styled-components';

import color from '../config/color';

type Props = {
  paths: {
    href: string;
    label: string;
  }[];
  className?: string;
};

const Base: React.FC<Props> = props => {
  return (
    <div className={props.className}>
      <ol>
        {props.paths.map((item, key) => {
          return (
            <li key={key} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {item.href !== location.pathname ? (
                <a itemProp="item" href={item.href}>
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <a className="now" itemProp="item" href="#">
                  <span itemProp="name">{item.label}</span>
                </a>
              )}
              <meta itemProp="position" content={String(key + 1)} />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export const Breadcrumb = styled(Base)`
  margin: 0;
  padding: 1.1em 0;
  list-style: none;
  overflow: scroll;
  color: ${color.primary.dark};
  position: relative;
  @media screen and (min-width: 800px) {
    overflow: hidden;
    font-size: 1.8rem;
  }
  &:before {
    position: absolute;
    display: block;
    height: 100%;
    top: 0;
    left: 0;
    width: 5px;
    /* content: ""; */
    background-color: ${color.secondary};
  }
  li {
    display: inline;
    list-style: none;
    &:after {
      content: " /";
      padding: 0 0.2em;
      color: ${color.primary.dark};
    }
    &:last-child:after {
      content: "";
    }
    & a {
      text-decoration: none;
      color: ${color.primary.dark};
      transition: color 150ms ease-in-out;
      &:hover {
        color: ${color.primary.main};
      }
      &.now {
        color: ${color.primary.main};
        cursor: default;
      }
    }
  }
`;
