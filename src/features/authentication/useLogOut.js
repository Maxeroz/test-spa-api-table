import { useQueryClient } from "@tanstack/react-query";
import { logout as logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleAuthLogOut } = useAuthContext();

  const logout = () => {
    // Удаляем токен из localStorage
    logOutApi();

    // Инвалидируем кеш для запроса с ключом 'table-data'
    queryClient.invalidateQueries(["table-data"]);
    navigate("/login");
    handleAuthLogOut();
  };

  return logout;
}
