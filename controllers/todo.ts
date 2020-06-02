// stubs
import todos from "../stubs/todos.ts";

export default {
  getAllTodos: ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: async () => {},
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
