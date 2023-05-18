import {
  Button,
  Center,
  Image,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import coruja from "../assets/coruja.png";
import { useLogin } from "../hooks/useLogin";

//Primero declarar como sera o Schema do form, ou seja, necessita
//ter todos os campos e suas validações
const loginScheme = z.object({
  username: z.string().nonempty({ message: "Username não pode estar vazio" }),
  password: z.string().nonempty({ message: "Senha não pode estar vazia" }),
});
//Usei o infer para pegar o tipo do schema possibilitando usar ele com TypeScript
type LoginForm = z.infer<typeof loginScheme>;

function LoginScreen() {
  const { mutateAsync, isLoading } = useLogin();
  const handleSubmit = async (loginForm: LoginForm) => {
    await mutateAsync(loginForm);
  };
  //Agora passando o tipo gerado pelo zodResolver para o useForm, ele começa a obedecer
  //as regras do schema. Também age como useState e da mais poderes ao dev.
  const form = useForm<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },
    //é importante lembrar de passar o zodResolver com o schema correto, pois sem isso
    //ele não fará a validação
    validate: zodResolver(loginScheme),
  });

  return (
    <Center h={"100vh"}>
      <form
        className="form-login"
        //Importante usar o onSubmit do form, para evitar atualizar a pagina
        //e só dar submit se estiver válido
        onSubmit={form.onSubmit((loginForm) => handleSubmit(loginForm))}
      >
        <Stack>
          <h1 className="login-header">Course Planner</h1>
        </Stack>
        <Image
          src={coruja}
          alt="Coruja"
          width={150}
          height={150}
          style={{ marginLeft: "4vh" }}
        />
        <Stack>
          <TextInput
            label="Username"
            type="text"
            placeholder="Username"
            //Aqui é onde o form.getInputProps faz a mágica, ele pega o nome do campo e
            //binda com o input, fazendo que atualize o estado dele e valide o campo,
            //por de baixo dos panos tem um value e onChange aqui.
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export default LoginScreen;
