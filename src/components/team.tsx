"use client";

import type { Time } from "@/types/time";
import { User } from "@nextui-org/react";
import Image from "next/image";
import { DeleteTeam } from "./delete-team";
import { AddPlayer } from "@/components/add-player";
import { DeletePlayer } from "@/components/delete-player";
import { EditTeam } from "./edit-team";
import { useEffect, useState } from "react";
import { getUser } from "@/actions/get-user";
import { EditPlayer } from "@/components/edit-player";

interface TimeItemProps {
  time: Time;
}

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const TimeItem = ({ time }: TimeItemProps) => {
  const [user, setUser] = useState<User | null>(null);

  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const getUserInfo = async () => {
    setUser(await getUser());
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div
      className="max-w-96 border dark:border-0 h-[calc(24rem-2rem)] w-full flex justify-between flex-col gap-2  p-2 rounded-md dark:bg-zinc-800"
      key={time.id}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            className="bg-zinc-50 rounded-full"
            src={time.jogo.logoUrl}
            alt={time.jogo.nome}
            width={40}
            height={40}
          />
          <p className="font-semibold truncate">{time.nome}</p>
          <p className="hidden md:block text-nowrap">{time.jogo.nome}</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          {time.jogadores.map((jogador) => {
            let playerName = jogador.nome;
            let maxLength;

            if (jogador.role === "owner") {
              maxLength = 41;
            } else if (time.ownerId === user?.id) {
              maxLength = 23;
            } else {
              maxLength = 41;
            }

            if (playerName.length > maxLength) {
              playerName = playerName.substring(0, maxLength) + "...";
            }

            const discord = jogador.discord ? `@${jogador.discord}` : "";
            const turma = jogador.turma ? `${jogador.turma}` : "";
            const description = [discord, turma].filter(Boolean).join(" - ");

            return (
              <div
                key={jogador.id}
                className="flex w-full items-center gap-2 justify-between"
              >
                <User
                  name={playerName}
                  description={description}
                  avatarProps={{
                    name: jogador.nome[0].toUpperCase(),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    color: getRandomColor(),
                  }}
                />
                {time.ownerId === user?.id && (
                  <div className="flex items-center gap-2">
                    {jogador.role !== "owner" && <EditPlayer jogador={jogador} />}
                    {jogador.role !== "owner" && (
                      <DeletePlayer jogador={jogador} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {time.ownerId === user?.id && (
        <div className="flex items-center gap-2 justify-end">
          <EditTeam time={time} />
          <AddPlayer time={time} />
          <DeleteTeam time={time} />
        </div>
      )}
    </div>
  );
};

export { TimeItem };
