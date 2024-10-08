import { useQueryClient } from "@tanstack/react-query";
import { logout as logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleAuthLogOut } = useAuthContext();

  const logout = () => {
    // Удаляем токен из localStorage
    logOutApi();

    // Удаляем кеш для запроса с ключом 'table-data'
    queryClient.removeQueries(["table-data"], { exact: true });

    toast.success("Выход успешно выполнен!");

    // Переходим на узел login
    navigate("/login");
    handleAuthLogOut();
  };

  return logout;
}
