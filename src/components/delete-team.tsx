"use client";

import { deleteTeam } from "@/actions/delete-team";
import { Time } from "@/types/time";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteTeamProps {
  time: Time
}

const DeleteTeam = ({ time }: DeleteTeamProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const hasPlayers = time.jogadores.filter(jogador => jogador.role !== "owner").length > 0;

  const handleDeleteTeam = async () => {
    toast("Apagando time...");
    setIsLoading(true);

    await deleteTeam(time.id)
      .then(() => {
        toast.success("Time apagado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["teams"] });
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
      <Button
        onPress={onOpen}
        className="flex items-center gap-2"
        size="sm"
        color="danger"
        variant="flat"
      >
        <Trash2 />
        <span className="hidden md:block">Excluir time</span>
      </Button>
      <Modal
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Deseja apagar este time?</ModalHeader>
          <ModalBody>
            <p className="text-sm">Esta ação não pode ser desfeita.</p>
            <p className="text-sm">Para excluir um time, é necessário remover os jogadores antes (exceto a pessoa que criou o time)</p>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={isLoading} onPress={onOpenChange}>
              Cancelar
            </Button>
            <Button
              variant="flat"
              isLoading={isLoading}
              isDisabled={hasPlayers}
              color="danger"
              onPress={handleDeleteTeam}
            >
              Apagar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { DeleteTeam };
