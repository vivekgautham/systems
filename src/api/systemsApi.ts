import { useQuery } from "@tanstack/react-query";
import rawSystemsData from "../data/systems.json";
import { SystemItem } from "../types/system";

export function useSystemsData() {
  return useQuery<SystemItem[]>({
    queryKey: ["systems-catalog-data"],
    queryFn: async () => {
      // Skeleton implementation: loads bundled JSON data with support for remote API fetch
      return rawSystemsData as SystemItem[];
    },
    initialData: () => {
      return rawSystemsData as SystemItem[];
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
}

export function useSystemDetail(id?: string) {
  const { data: systems = [] } = useSystemsData();
  return systems.find(
    (s) => s.id.toLowerCase() === (id || "").trim().toLowerCase(),
  );
}
