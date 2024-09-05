import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deteleRow } from "../../services/apiTableData";

export function useDeleteRow() {
  const queryClient = useQueryClient();

  const { mutate: deleteRow, isPending } = useMutation({
    mutationFn: (id) => deteleRow(id),
    onSuccess: () => queryClient.invalidateQueries(["table-data"]),
  });

  return { deleteRow, isPending };
}
