import { NextComponentType } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { HamburgerButton } from '../components/common/HamburgerButton';
import { NavListItem } from '../components/NavBar/NavListItem';
import color from '../config/color';
import fonts from '../config/fonts';
import { scrollTop } from '../utils/scroll';

export const NavBar: NextComponentType = () => {
  const [open, setOpen] = useState(false);
  const [isTop, setIsTop] = useState<boolean>(true);

  const onScroll = (): void => {
    const position = scrollTop();
    if (position >= 60) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });

  const navBarContents = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Posts", href: "/post" },
    { name: "Contact", href: "/contact" },
  ];

  const handleOpen = (): void => {
    setOpen(!open);
  };

  const containerClassName = `${isTop ? "" : "dark"} ${open ? "is-Active" : ""}`;

  return (
    <NavRoot className={isTop ? "" : "dark"}>
      <NavTitle>
        <Link href="/">
          <a>Ragnar Blog</a>
        </Link>
      </NavTitle>
      <Btn>
        <HamburgerButton onClick={handleOpen} />
      </Btn>
      <NavContainer className={containerClassName}>
        <ul onClick={handleOpen}>
          {navBarContents.map((item, key) => (
            <NavListItem name={item.name} href={item.href} key={key} />
          ))}
        </ul>
      </NavContainer>
    </NavRoot>
  );
};

const NavRoot = styled.header`
  background: white;
  color: ${color.primary.dark};
  transition: background-color 400ms ease-in;
  opacity: 1;
  text-align: center;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & .ham-icon {
    background-color: ${color.primary.dark};
  }

  &.dark {
    background: ${color.primary.dark};
    color: white;
    & .ham-icon {
      background-color: white;
    }
  }

  /* desktop */
  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr auto minmax(600px, 1fr) 1fr;
    & h1 {
      grid-column: 2/3;
    }
    & nav {
      grid-column: 3/4;
    }
  }
`;

const Btn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 17px;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const NavContainer = styled.nav`
  position: absolute;
  text-align: left;
  opacity: 1;
  background: inherit;
  top: 100%;
  width: 100%;
  left: 0;
  margin: 0 auto;
  transition: transform 400ms ease-in-out, background-color 400ms ease-in;
  transform-origin: top;
  transform: scale(1, 0);
  background-color: white;
  color: ${color.primary.dark};

  & ul {
    list-style: none;
    position: relative;
    background: white;
    transition: background-color 400ms ease-in;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: -1;
    }
  }
  & li {
    padding: 1.5em;
    transition: background-color 200ms ease-in-out;
    &:hover {
      background-color: ${color.white};
      color: ${color.primary.dark};
    }
  }
  & a {
    color: inherit;
    text-decoration: none;
    font-size: 1.5rem;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

  &.is-Active {
    display: block;
    transform: scale(1, 1);
    & a {
      opacity: 1;
      transition: opacity 600ms ease-out 150ms;
    }
  }

  &.dark {
    background-color: ${color.primary.dark};
    color: white;
    & ul {
      background: ${color.primary.dark};
    }
    & li:hover {
      background-color: ${color.primary.main};
      color: white;
    }
  }

  /* desktop */
  @media screen and (min-width: 800px) {
    display: block;
    transform: scale(1, 1);
    position: static;
    height: 100%;

    & ul {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &:before {
        display: none;
      }
    }
    & li {
      display: inline-block;
      padding: 0;
      position: relative;
      &:hover {
        background-color: white;
        color: ${color.primary.dark};
      }
      &:hover:after {
        transform: scaleX(1);
      }
    }
    & li::after {
      content: "";
      height: 2px;
      width: 100%;
      display: block;
      background-color: ${color.primary.dark};
      position: absolute;
      top: calc(100% - 2px);
      left: 0;
      text-align: center;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }

    & a {
      opacity: 1;
      width: 100%;
      display: block;
      padding: 10px 15px;
    }

    &.dark {
      & li:hover {
        background-color: ${color.primary.dark};
        color: white;
      }
      & li::after {
        background-color: white;
      }
    }
  }
`;

const NavTitle = styled.h1`
  margin: 1rem;
  font-family: ${fonts.logo};
  & a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;
