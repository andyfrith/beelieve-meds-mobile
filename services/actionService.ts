import { actions, type Action } from "@/data/actions";

export const actionService = {
  getAll: async (): Promise<Action[]> => {
    return Promise.resolve(actions);
  },
};
