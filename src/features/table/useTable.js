import { useQuery } from "@tanstack/react-query";
import { getTableData } from "../../services/apiTableData";

export function useTable() {
  const { data: tableData, isLoading } = useQuery({
    queryKey: ["table-data"],
    queryFn: getTableData,
  });

  return { tableData, isLoading };
}
