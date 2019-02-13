import * as uuid from 'uuid/v4';
import Link from 'next/link'

export default () => <div>
  hello world{uuid()}
  <Link href="/login">
    <a>Login Page</a>
  </Link>
</div>