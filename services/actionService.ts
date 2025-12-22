import { actions, type Action } from "@/data/actions";

export const actionService = {
  getAll: async (module?: string): Promise<Action[]> => {
    if (module) {
      return Promise.resolve(
        actions.filter((action) => action.route.includes(module)),
      );
    }
    return Promise.resolve(actions);
  },
};
