import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRow } from "../../services/apiTableData";
import toast from "react-hot-toast";

export function useCreateRow() {
  const queryClient = useQueryClient();

  const { mutate: addRow, isPending } = useMutation({
    mutationFn: (newRow) => createRow(newRow),
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      toast.success("Запись успешно добавлена!");
    },
    onError: (error) => {
      toast.error(`Ошибка при добавлении записи: ${error.message}`);
    },
  });

  return { addRow, isPending };
}
