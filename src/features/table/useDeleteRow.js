import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deteleRow } from "../../services/apiTableData";
import toast from "react-hot-toast";

export function useDeleteRow() {
  const queryClient = useQueryClient();

  const { mutate: deleteRow, isPending } = useMutation({
    mutationFn: (id) => deteleRow(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      toast.success("Запись успешно удалена!");
    },
    onError: (error) => {
      toast.error(`Ошибка при удалении записи:${error.message}`);
    },
  });

  return { deleteRow, isPending };
}
