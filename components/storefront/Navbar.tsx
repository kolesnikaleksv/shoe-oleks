import React from 'react';
import NavbarLinks from '@/components/storefront/NavbarLinks';
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { ShoppingBagIcon } from 'lucide-react';
import UserDropdown from '@/components/storefront/UserDropdown';
import { Button } from '@/components/ui/button';

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-black font-bold text-xl lg:text-3xl">
          Shoe<span className="text-primary">Olex</span>
        </h1>
        <NavbarLinks />
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="group-hover:text-gray-800 ml-2">5</span>
            </Link>
            <UserDropdown
              name={user.given_name as string}
              email={user.email as string}
              userImage={
                user.picture ??
                `https://avatar.vercel.sh/${user.given_name}?rounded=60`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
