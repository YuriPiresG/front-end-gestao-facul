import {
  Button,
  Input,
  Modal,
  MultiSelect,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateProfessor } from "../hooks/useCreateProfessor";
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
  id: z
    .number()
    .min(0)
    .refine((value) => typeof value === "number", {
      message: "O valor deve ser um número",
    }),
  user: z
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
  const [user, setUser] = useState<number>(props.user.id);
  const { mutateAsync, isLoading } = useCreateProfessor();
  const handleSubmit = async (professorForm: CreateProfessorForm) => {
    await mutateAsync(professorForm);
    close();
    toast.success("Professor criado com sucesso!");
  };
  const form = useForm<CreateProfessorForm>({
    initialValues: {
      id: 0,
      user: props.user.id,
      periods: [Periods.M1],
    },
    validate: zodResolver(createProfessorScheme),
  });

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
              <NumberInput
                label="Id do usuário"
                type="number"
                placeholder="Id do usuário"
                value={user}
                disabled
              />
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
