import 'ress';

import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { ApolloProvider } from '@apollo/react-hooks';

import { Loading } from '../components/common/Loading';
import { NavBar } from '../containers/NavBar';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    line-height: 1.4;
    font-family: "Lato", "Noto Sans JP", "游ゴシック Medium", "游ゴシック体", "Yu Gothic Medium", YuGothic,
      "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  img {
  max-width: 100%;
  height: auto;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #29d;

    position: fixed;
    z-index: 1031;
    top: 6rem;
    left: 0;

    width: 100%;
    height: 5px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: none;
    /* display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px); */
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: #29d;
    border-left-color: #29d;
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default class extends App {
  render() {
    const httpLink = new HttpLink({ uri: "https://ragnar-blog-backend.herokuapp.com/graphql/", fetch: fetch });
    const cache = new InMemoryCache();
    const errorLink = onError(({ graphQLErrors }) => {
      if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
    });

    const link = ApolloLink.from([errorLink, httpLink]);
    const client = new ApolloClient({ link, cache });
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <ApolloProvider client={client}>
          <Head>
            <title key="title">Ragnar Blog</title>
          </Head>
          <NavBar />
          <Component {...pageProps} />
          <GlobalStyle />
        </ApolloProvider>
      </React.Fragment>
    );
  }
}
