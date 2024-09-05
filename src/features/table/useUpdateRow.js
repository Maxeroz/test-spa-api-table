import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRow as updateRowApi } from "../../services/apiTableData";
import toast from "react-hot-toast";

export function useUpdateRow() {
  const queryClient = useQueryClient();

  const { mutate: updateRow, isPending } = useMutation({
    mutationFn: ({ id, updatedRow }) => updateRowApi(id, updatedRow),
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      toast.success("Запись успешно обновлена!");
    },
    onError: (error) => {
      toast.error(`Ошибка обновления записи: ${error.message}`);
    },
  });

  return { updateRow, isPending };
}
