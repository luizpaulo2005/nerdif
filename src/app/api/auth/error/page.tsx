"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const errorMap = {
  [Error.AccessDenied]: (
    <p>
      Login permitido apenas para e-mails do domínio <code>@ifms.edu.br</code> e{" "}
      <code>@estudante.ifms.edu.br</code>
    </p>
  ),
  [Error.Verification]: (
    <p>
      Sua conta ainda não foi verificada. Verifique seu e-mail e clique no link
      de verificação.
    </p>
  ),
  [Error.Default]: (
    <p>
      Ocorreu um erro inesperado. Por favor, tente novamente mais tarde. Se o
      erro persistir, entre em contato conosco.
    </p>
  ),
  [Error.Configuration]: (
    <p>Ocorreu um erro de configuração. Por favor, entre em contato conosco.</p>
  ),
};

const Page = () => {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
      <div className="rounded-xl py-5 px-6 dark:bg-zinc-900 bg-zinc-300 space-y-2 flex flex-col gap-2 max-w-md">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Algo deu errado
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400 text-justify">
          {errorMap[error] || "Please contact us if this error persists."}
        </div>
        <Button variant="flat" onClick={() => signIn("google")}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};

export default Page;
