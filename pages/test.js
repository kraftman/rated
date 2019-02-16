
import nextCookie from 'next-cookies';
import Router from 'next/router';
import cookie from 'js-cookie';
import { withAuthSync } from '../utils/withAuth';


const login = (event) => {
  event.preventDefault();
  cookie.set('token', 'test');
  Router.push('/test');
};

const logout = (event) => {
  event.preventDefault();
  window.localStorage.setItem('logout', Date.now())
  cookie.remove('token');
  Router.push('/test');
};

const Index = (props) => {
  if (props.token) {
    return (<div>
      logged in
      <a href="#" onClick= {logout}>
        logout
      </a>
    </div>);
  }
  return (
    <div>
      login page
      <a href="#" onClick= {login}>
        login
      </a>
    </div>
  );
};

Index.getInitialProps = async function(ctx) {
  //console.log(ctx)
  const { token } = nextCookie(ctx);
  console.log(nextCookie(ctx));

  return {
    token
  };
};

export default withAuthSync(Index);