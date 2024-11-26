"use client";

import { Time } from "@/types/time";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { addPlayer } from "@/actions/add-player";
import { useQueryClient } from "@tanstack/react-query";

interface AddPlayerProps {
  time: Time;
}

const addPlayerSchema = z.object({
  nome: z.string().nonempty("O nome do jogador é obrigatório"),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de telefone deve estar no formato (99) 99999-9999"
    ),
  discord: z
    .string()
    .optional()
    .or(z.string().max(32, { message: "Discord muito longo" })),
  turma: z
    .string()
    .optional()
    .or(z.string().max(32, { message: "Turma muito longa" })),
});

type AddPlayer = z.infer<typeof addPlayerSchema>;

const AddPlayer = ({ time }: AddPlayerProps) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { id: timeId } = time;

  const isMaxPlayers = time.jogadores.length >= time.jogo.maxJogadores;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddPlayer>({
    resolver: zodResolver(addPlayerSchema),
  });

  const handleAddPlayer = async ({
    nome,
    discord,
    turma,
    telefone,
  }: AddPlayer) => {
    if (isMaxPlayers) {
      toast.error("O time já atingiu o número máximo de jogadores");
      return;
    }

    toast("Adicionando jogador...");
    setIsLoading(true);

    await addPlayer({ nome, telefone, discord, turma, timeId })
      .then(() => {
        toast.success("Jogador adicionado com sucesso");
        reset();
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        onOpenChange();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Button
        isDisabled={isMaxPlayers}
        variant="flat"
        onPress={onOpen}
        className="flex items-center gap-2"
        size="sm"
      >
        <Plus />
        <span className="hidden md:block">Adicionar jogador</span>
      </Button>
      <Modal
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Adicionar Jogador</ModalHeader>
          <form onSubmit={handleSubmit(handleAddPlayer)}>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Input
                  {...register("nome")}
                  label="Nome"
                  placeholder="Insira o nome do jogador (obrigatório)"
                  maxLength={32}
                  isDisabled={isLoading}
                />
                {errors.nome && (
                  <span className="text-red-500 text-sm">
                    {errors.nome.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  {...register("telefone")}
                  label="Telefone"
                  placeholder="Insira o telefone do jogador (obrigatório)"
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
                <Input
                  {...register("discord")}
                  label="Discord"
                  placeholder="Insira o usuário do Discord (opcional)"
                  maxLength={32}
                  isDisabled={isLoading}
                />
                {errors.discord && (
                  <span className="text-red-500 text-sm">
                    {errors.discord.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  {...register("turma")}
                  label="Turma"
                  placeholder="Insira a turma do jogador (opcional)"
                  maxLength={32}
                  isDisabled={isLoading}
                />
                {errors.turma && (
                  <span className="text-red-500 text-sm">
                    {errors.turma.message}
                  </span>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={onOpenChange}
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="flat"
                color="success"
                type="submit"
                isLoading={isLoading}
              >
                Adicionar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddPlayer };
