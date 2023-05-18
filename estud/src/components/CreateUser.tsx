import { Button, Group, Input, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useCreateUser } from "../hooks/useCreateUser";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const createUserSchema = z.object({
  username: z.string().nonempty({ message: "Username não pode estar vazio" }),
  name: z.string().nonempty({ message: "Nome não pode estar vazio" }),
  email: z.string().nonempty({ message: "Email não pode estar vazio" }),
  password: z.string().nonempty({ message: "Senha não pode estar vazio" }),
  role: z.number().max(3, { message: "Função tem que estar entre 0 e 3" }),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

function CreateUser() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutateAsync, isLoading } = useCreateUser();
  const handleSubmit = async (createUserForm: CreateUserForm) => {
    await mutateAsync(createUserForm);
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
  return (
    <>
      <Modal opened={opened} onClose={close} title="Criar um curso">
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
              <Input
                type="password"
                placeholder="Senha"
                {...form.getInputProps("password")}
              />
              <Input
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
