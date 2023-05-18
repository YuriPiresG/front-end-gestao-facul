import {
  Button,
  Group,
  Input,
  Modal,
  NumberInput,
  PasswordInput,
  Stack,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateUser } from "../hooks/useCreateUser";

const createUserSchema = z.object({
  username: z.string().nonempty({ message: "Username não pode estar vazio" }),
  name: z.string().nonempty({ message: "Nome não pode estar vazio" }),
  email: z.string().nonempty({ message: "Email não pode estar vazio" }),
  password: z.string().nonempty({ message: "Senha não pode estar vazio" }),
  role: z
    .number()
    .min(0)
    .max(3, { message: "Função tem que estar entre 0 e 3" })
    .refine((value) => typeof value === "number", {
      message: "O valor deve ser um número",
    }),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

function CreateUser() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutateAsync, isLoading } = useCreateUser();
  const handleSubmit = async (createUserForm: CreateUserForm) => {
    const formValues: CreateUserForm = {
      username: createUserForm.username,
      name: createUserForm.name,
      email: createUserForm.email,
      password: createUserForm.password,
      role: Number(createUserForm.role),
    };
    await mutateAsync(formValues);
    close();
    toast.success("Usuário criado com sucesso!");
  };
  const form = useForm<CreateUserForm>({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      role: 0,
    },
    validate: zodResolver(createUserSchema),
  });
  const handleClose = () => {
    form.reset();
    close();
  };

  console.log(form.errors?.role);

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um curso">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((createUserForm) =>
              handleSubmit(createUserForm)
            )}
          >
            <Stack spacing="xs">
              <Input
                type="text"
                placeholder="Username"
                {...form.getInputProps("username")}
              />
              <Input
                type="text"
                placeholder="Nome"
                {...form.getInputProps("name")}
              />
              <Input
                type="text"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <NumberInput
                label="Função"
                min={0}
                max={3}
                type="number"
                placeholder="Role"
                {...form.getInputProps("role")}
              />
              <Button color="blue" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green" style={{ left: "60vh" }}>
          Criar um usuário
        </Button>
      </Group>
    </>
  );
}

export default CreateUser;
