"use client";
import { getTeams } from "@/actions/get-teams";
import { CreateTeam } from "@/components/create-team";
import { TimeItem } from "@/components/team";
import type { Time } from "@/types/time";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Page = () => {
  const { status } = useSession();

  const { data: times } = useQuery<Time[]>({
    queryKey: ["teams"],
    queryFn: async () => await getTeams(),
    staleTime: 1000 * 60 * 5,
  });

  if (times?.length === 0) {
    return (
      <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
        <span>Nenhum time criado</span>
        {status === "authenticated" && <CreateTeam />}
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] gap-2 px-2 pt-2 pb-16 md:justify-normal justify-center flex-wrap">
      {times &&
        times.map((time) => {
          return <TimeItem key={time.id} time={time} />;
        })}
      {status === "authenticated" && <CreateTeam />}
    </div>
  );
};

export default Page;
