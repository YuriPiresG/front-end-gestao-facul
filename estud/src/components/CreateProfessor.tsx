import { Button, Group, Input, Modal, MultiSelect, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateProfessor } from "../hooks/useCreateProfessor";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];

function CreateProfessor() {
  const [opened, { open, close }] = useDisclosure(false);
  const [userId, setUserId] = useState<number>(0);
  const [periods, setPeriods] = useState<string[]>([]);
  const handlePeriodsChange = (selectedItems: any[]) => {
    setPeriods(selectedItems.map((item) => item.value) as string[]);
  };

  const { mutateAsync, isLoading } = useCreateProfessor();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      userId,
      periods,
    });
    close();
    toast.success("Professor criado com sucesso!");
  };
  const resetForm = () => {
    setPeriods([]);
  };
  const handleClose = () => {
    resetForm();
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um curso">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Input
                type="text"
                placeholder="Id do usuário"
                onChange={(event) => setUserId(Number(event.target.value))}
              />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                value={periods}
                onChange={(values) => setPeriods(values)}
                multiple
                required
                maxDropdownHeight={80}
                
                
              />
              <Button color="green" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green" style={{ left: "60vh" }}>
          Criar um professor
        </Button>
      </Group>
    </>
  );
}
export default CreateProfessor;
