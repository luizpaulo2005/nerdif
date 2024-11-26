"use client";

import { Jogador } from "@/types/jogador";
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
import { useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { editPlayer } from "@/actions/edit-player";
import { useState } from "react";

interface EditPlayerProps {
  jogador: Jogador;
}

const editPlayerSchema = z.object({
  nome: z
    .string()
    .nonempty("O nome do jogador é obrigatório")
    .max(32, { message: "Nome muito longo" }),
  turma: z
    .string()
    .optional()
    .or(z.string().max(32, { message: "Turma muito longa" })),
  discord: z
    .string()
    .optional()
    .or(z.string().max(32, { message: "Discord muito longo" })),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de telefone deve estar no formato (99) 99999-9999"
    ),
});

type EditPlayer = z.infer<typeof editPlayerSchema>;

const EditPlayer = ({ jogador }: EditPlayerProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditPlayer>({
    resolver: zodResolver(editPlayerSchema),
    defaultValues: {
      nome: jogador.nome ?? "",
      turma: jogador.turma ?? "",
      discord: jogador.discord ?? "",
      telefone: jogador.telefone ?? "",
    },
  });

  const handleEditPlayer = async ({
    nome,
    turma,
    discord,
    telefone,
  }: EditPlayer) => {
    setIsLoading(true);
    toast("Editando jogador...");

    await editPlayer({ id: jogador.id, nome, turma, discord, telefone })
      .then(() => {
        toast.success("Jogador editado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        reset();
        onOpenChange();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Button variant="flat" size="sm" color="primary" onPress={onOpen}>
        <Pen className="size-4" />
      </Button>
      <Modal
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-2">
          <ModalHeader>Editar {jogador.nome}</ModalHeader>
          <form
            className="py-4 flex flex-col gap-2"
            onSubmit={handleSubmit(handleEditPlayer)}
          >
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Input
                  isDisabled={isLoading}
                  label="Nome"
                  placeholder="Nome do jogador"
                  {...register("nome")}
                  maxLength={32}
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
                  placeholder="Telefone do jogador"
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
                  isDisabled={isLoading}
                  label="Turma"
                  placeholder="Turma do jogador"
                  {...register("turma")}
                  maxLength={32}
                />
                {errors.turma && (
                  <span className="text-red-500 text-sm">
                    {errors.turma.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  isDisabled={isLoading}
                  label="Discord"
                  placeholder="Discord do jogador"
                  {...register("discord")}
                  maxLength={32}
                />
                {errors.discord && (
                  <span className="text-red-500 text-sm">
                    {errors.discord.message}
                  </span>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onOpenChange}>
                Cancelar
              </Button>
              <Button
                variant="flat"
                color="primary"
                isLoading={isLoading}
                type="submit"
              >
                Editar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditPlayer };
