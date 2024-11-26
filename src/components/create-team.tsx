"use client";

import { getGames } from "@/actions/get-games";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createTeam } from "@/actions/create-team";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatus } from "@/actions/get-status";
import { Jogo } from "@/types/jogo";

const createTeamSchema = z.object({
  nome: z
    .string()
    .nonempty("O nome do time não pode estar vazio")
    .or(z.string().max(32, { message: "Nome muito longo" })),
  jogoId: z.string().nonempty("O jogo não pode estar vazio"),
  discord: z
    .string()
    .optional()
    .or(z.string().max(32, { message: "Discord muito longo" })),
  turma: z
    .string()
    .optional()
    .or(z.string().max(32, { message: "Turma muito longa" })),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de telefone deve estar no formato (99) 99999-9999"
    ),
});

type CreateTeamInput = z.infer<typeof createTeamSchema>;

const CreateTeam = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [jogos, setJogos] = useState<Jogo[] | undefined>([]);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
  });
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["status"],
    queryFn: async () => getStatus(),
    staleTime: 1000 * 60 * 5,
  });

  const isCreateTeamDisabled =
    data &&
    (data[0].status === "E" ||
      (data[0].dataFinalIncricoes && data[0].dataFinalIncricoes < new Date()));

  const handleCreateTeam = async (data: CreateTeamInput) => {
    setIsLoading(true);
    toast("Criando time...");

    await createTeam(data)
      .then(() => {
        toast.success("Time criado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        reset();
        onOpenChange();
      })
      .catch(() => {
        toast.error("Erro ao criar time");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGames()
      .then((data) => {
        setJogos(data);
      })
      .catch(() => {
        toast.error("Erro ao buscar jogos");
      });
  }, []);

  return (
    <>
      {!isCreateTeamDisabled && (
        <Button
          size="lg"
          className="fixed right-2 bottom-2 md:right-6 md:bottom-6 flex items-center gap-2"
          onPress={onOpen}
          variant="flat"
        >
          <Plus />
          <span className="hidden md:block">Criar time</span>
        </Button>
      )}
      <Modal
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-2">
          <ModalHeader>Criar time</ModalHeader>
          <form
            className="py-4 flex flex-col gap-2"
            onSubmit={handleSubmit(handleCreateTeam)}
          >
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Input
                  isDisabled={isLoading}
                  label="Nome"
                  maxLength={32}
                  placeholder="Insira o nome do time (obrigatório)"
                  {...register("nome")}
                />
                {errors.nome && (
                  <span className="text-red-500">{errors.nome.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  {...register("telefone")}
                  label="Telefone"
                  placeholder="Insira o telefone do criador do time (obrigatório)"
                  maxLength={32}
                  isDisabled={isLoading}
                />
                {errors.telefone && (
                  <span className="text-red-500 text-sm">
                    {errors.telefone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name="jogoId"
                  render={({ field }) => {
                    return (
                      <Select
                        isDisabled={isLoading}
                        onChange={field.onChange}
                        value={field.value}
                        label="Jogo"
                        placeholder="Selecione um jogo (obrigatório)"
                      >
                        {/* @ts-expect-error next ui */}
                        {jogos &&
                          jogos.map((jogo) => {
                            return (
                              <SelectItem key={jogo.id} value={jogo.id}>
                                {jogo.nome}
                              </SelectItem>
                            );
                          })}
                      </Select>
                    );
                  }}
                />
                {errors.jogoId && (
                  <span className="text-red-500">{errors.jogoId.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  isDisabled={isLoading}
                  label="Discord"
                  maxLength={32}
                  placeholder="Insira o usuário do Discord do dono do time (opcional)"
                  {...register("discord")}
                />
                {errors.discord && (
                  <span className="text-red-500">{errors.discord.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  isDisabled={isLoading}
                  label="Turma"
                  placeholder="Insira a turma do dono do time (opcional)"
                  {...register("turma")}
                />
                {errors.turma && (
                  <span className="text-red-500">{errors.turma.message}</span>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onOpenChange} variant="flat">
                Cancelar
              </Button>
              <Button
                isLoading={isLoading}
                color="success"
                variant="flat"
                type="submit"
              >
                Criar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreateTeam };
