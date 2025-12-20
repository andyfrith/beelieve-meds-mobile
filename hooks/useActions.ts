import { actionService } from "@/services/actionService";
import { useQuery } from "@tanstack/react-query";

export const useActions = (module?: string) => {
  return useQuery({
    queryKey: ["actions", module ? module : undefined],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return actionService.getAll(module);
    },
  });
};
