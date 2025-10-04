"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CreditCardIcon,
  UserCircleIcon,
  BellIcon,
  HeartIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NavUser = ({
  variant = "default",
  bgColor = "bg-card",
}: {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  bgColor?: string;
}) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session || !session.user)
    return (
      <Button variant={variant} asChild>
        <Link href="/login">
          <User />
        </Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session.user.image || ""} />
          <AvatarFallback className="bg-transparent border border-gray-200">
            {session.user.name.charAt(0) + session.user.name.charAt(1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={bgColor}>
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <div>
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="User"
                  className="h-16 w-16 rounded-full"
                  width={500}
                  height={500}
                />
              ) : (
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {session.user.name.charAt(0) + session.user.name.charAt(1)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div>
              <p>{session.user.name}</p>
              <p>{session.user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserCircleIcon />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account?page=orders">
              <CreditCardIcon />
              Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account?page=saved-items">
              <HeartIcon />
              Saved Items
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account?page=notifications">
              <BellIcon />
              Notifications
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant={variant}
            onClick={async () => {
              await authClient.signOut();
              router.push("/login");
            }}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
