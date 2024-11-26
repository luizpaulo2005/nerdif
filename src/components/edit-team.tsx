"use client";

import { editTeam } from "@/actions/edit-team";
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
import { useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditTeamProps {
  time: Time;
}

const editTeamSchema = z.object({
  nome: z
    .string()
    .optional()
    .or(z.string().max(64, { message: "Nome muito longo" })),
});

type EditTeam = z.infer<typeof editTeamSchema>;

const EditTeam = ({ time }: EditTeamProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditTeam>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      nome: time.nome ?? "",
    },
  });

  const handleEditTeam = async ({ nome }: EditTeam) => {
    toast("Editando time...");
    setIsLoading(true);

    await editTeam(time, { nome })
      .then(() => {
        toast.success("Time editado com sucesso");
        onOpenChange();
        queryClient.invalidateQueries({ queryKey: ["teams"] });
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
        onPress={onOpen}
        variant="flat"
        className="flex items-center gap-2"
        size="sm"
      >
        <Pen />
        <span className="hidden md:block">Editar time</span>
      </Button>
      <Modal
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(handleEditTeam)}>
            <ModalHeader>Editar time</ModalHeader>
            <ModalBody>
              <Input
                label="Nome"
                placeholder="Nome do time"
                {...register("nome")}
                maxLength={32}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome.message}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onOpenChange} variant="flat">
                Cancelar
              </Button>
              <Button
                variant="flat"
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditTeam };
