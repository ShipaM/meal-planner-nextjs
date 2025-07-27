import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "./mutations";
import { SignInSchema } from "../types/signInSchema";

const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: SignInSchema) => {
      await signIn(data);
    },
  });
};

const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      router.push("/sign-in");
    },
  });
};

export { useSignIn, useSignOut };
