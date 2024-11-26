import { getStatus } from "@/actions/get-status";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBR from "dayjs/locale/pt-br";

dayjs.locale(ptBR);
dayjs.extend(relativeTime);

const status = {
  A: {
    status: "Inscrições abertas",
    color: "bg-emerald-500",
  },
  E: {
    status: "Encerrado",
    color: "bg-red-500",
  },
  F: {
    status: "Encerrando",
    color: "bg-yellow-500",
  },
};

const EventStatus = () => {
  const { data } = useQuery({
    queryKey: ["status"],
    queryFn: async () => getStatus(),
    staleTime: 1000 * 60 * 5,
  });

  if (!data) {
    return;
  }

  return (
    <div className="flex items-center dark:border-white/30 border-2 gap-2 px-2 py-1 rounded-3xl">
        {/* @ts-expect-error type */}
      <div className={`w-2 h-2 rounded-full ${status[data[0].status]["color"]}`} />
      {/* @ts-expect-error type */}
      <p className="dark:text-white text-xs">{status[data[0].status]["status"]} - {data[0].status === "E" ? "finalizado" : "finaliza"} {dayjs().to(data[0].eventEndDate)}</p>
    </div>
  );
};

export { EventStatus };
