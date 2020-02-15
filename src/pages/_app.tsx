import 'ress';
import '../static/style.css';

import App from 'next/app';
import Head from 'next/head';
import React from 'react';

import { NavBar } from '../containers/NavBar';

export default class extends App {
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
