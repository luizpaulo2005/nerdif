"use client";

import { deletePlayer } from "@/actions/delete-player";
import { Jogador } from "@/types/jogador";
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

interface DeletePlayerProps {
  jogador: Jogador;
}

const DeletePlayer = ({ jogador }: DeletePlayerProps) => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDeletePlayer = async () => {
    toast("Apagando jogador...");
    setIsLoading(true);

    await deletePlayer(jogador)
      .then(() => {
        toast.success("Jogador apagado com sucesso");
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
      <Button onPress={onOpen} size="sm" color="danger" variant="flat">
        <Trash2 className="size-5" />
      </Button>
      <Modal
        backdrop="opaque"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Excluir jogador</ModalHeader>
          <ModalBody>
            Deseja realmente excluir o jogador {jogador.nome}?
          </ModalBody>
          <ModalFooter>
            <Button onPress={onOpenChange} variant="flat">
              Cancelar
            </Button>
            <Button
              variant="flat"
              color="danger"
              isLoading={isLoading}
              onClick={handleDeletePlayer}
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { DeletePlayer };
