import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { handleAuth } = useAuthContext();

  // Используем useMutation для авторизации
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (credentials) =>
      loginApi(credentials.username, credentials.password),
    onSuccess: (token) => {
      handleAuth(token);
      navigate("/");
      toast.success("Вход успешно выполнен!");
      console.log("Authenticated successfully, token:", token);
    },
    onError: (error) => {
      toast.error("Ошибка входа!");

      console.error("Authorization failed:", error.message);
    },
  });

  return { login, isPending, error };
}
