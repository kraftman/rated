import { Component } from 'react';
import nextCookie from 'next-cookies';
import Router from 'next/router';

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  // if (ctx.req && !token) {
  //   ctx.res.writeHead(302, { Location: '/test' });
  //   ctx.res.end();
  //   return;
  // }

  // if (!token) {
  //   Router.push('/test');
  // }

  return token;
}

export const withAuthSync = WrappedComponent =>
  class extends Component {

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    constructor (props) {
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/test');
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }