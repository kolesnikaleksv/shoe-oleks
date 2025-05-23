import { Button } from '@/components/ui/button';
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

export default async function Home() {
  return (
    <div>
      Hello from new project - shoe-oleks
      <div>
        <Button asChild>
          <LoginLink>Login</LoginLink>
        </Button>
        <Button>
          <LogoutLink>logout</LogoutLink>
        </Button>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </div>
  );
}
