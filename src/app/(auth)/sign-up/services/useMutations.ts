import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignUpSchema } from "../types/signUpSchema";
import { signUp } from "./mutations";

const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpSchema) => {
      await signUp(data);
    },
    onSuccess: () => {
      toast.success("Signed up successfully.");
      router.replace("/sign-in");
    },
  });
};

export { useSignUp };
