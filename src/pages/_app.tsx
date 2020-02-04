import 'ress';
import '../static/style.css';

import App, { AppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { NavBar } from '../containers/NavBar';

export default class extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title key="title">Ragnar Blog</title>
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
