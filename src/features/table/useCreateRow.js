import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRow } from "../../services/apiTableData";

export function useCreateRow() {
  const queryClient = useQueryClient();

  const { mutate: addRow, isPending } = useMutation({
    mutationFn: (newRow) => createRow(newRow),
    onSuccess: () => queryClient.invalidateQueries(["table-data"]),
  });

  return { addRow, isPending };
}
