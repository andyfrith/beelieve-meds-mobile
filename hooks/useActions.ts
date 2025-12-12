import { actionService } from "@/services/actionService";
import { useQuery } from "@tanstack/react-query";

export const useActions = () => {
  return useQuery({
    queryKey: ["actions"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return actionService.getAll();
    },
  });
};
