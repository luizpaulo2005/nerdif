"use client";

import { getUser } from "@/actions/get-user";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserProps {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserButton = () => {
  const { status } = useSession();
  const [user, setUser] = useState<UserProps | null>(null);

  const fetchUser = async () => {
    const user = await getUser();

    return setUser(user);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  if (status !== "authenticated" || !user) {
    return (
      <Button className="w-full" onClick={() => signIn("google")} variant="flat" color="primary">
        Entrar
      </Button>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          name={user.name}
          description={user.email}
          avatarProps={{
            src: user.imageUrl,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>
          <Button
            onClick={() => signOut()}
            variant="flat"
            color="primary"
            className="w-full"
          >
            Sair
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { UserButton };
