import { Button, Group, Input, Modal, MultiSelect, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateProfessor } from "../hooks/useCreateProfessor";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { User } from "../hooks/useUser";

enum Periods {
  M1 = "M1",
  M2 = "M2",
  T1 = "T1",
  T2 = "T2",
  N1 = "N1",
  N2 = "N2",
}

const createProfessorScheme = z.object({
  userId: z
    .number()
    .min(0)
    .refine((value) => typeof value === "number", {
      message: "O valor deve ser um número",
    }),
  periods: z.nativeEnum(Periods).array().nonempty(),
});

type CreateProfessorForm = z.infer<typeof createProfessorScheme>;

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];

interface Props {
  user: User;
  open: boolean;
  close: () => void;
}

function CreateProfessor(props: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [userId, setUserId] = useState<number>(props.user.id);
  const { mutateAsync, isLoading } = useCreateProfessor();
  const handleSubmit = async (professorForm: CreateProfessorForm) => {
    await mutateAsync(professorForm);
    close();
    toast.success("Professor criado com sucesso!");
  };
  const form = useForm<CreateProfessorForm>({
    initialValues: {
      userId: 0,
      periods: [Periods.M1],
    },
    validate: zodResolver(createProfessorScheme),
  });
  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Criar um professor"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((professorForm) =>
              handleSubmit(professorForm)
            )}
          >
            <Stack spacing="xs">
              <Input type="text" placeholder="Id do usuário" value={userId} />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
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
    </>
  );
}
export default CreateProfessor;
