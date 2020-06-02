import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("denoTodo");
const todo = db.collection("todo");

export default {
  getAllTodos: async ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: await todo.find(),
    };
  },
  createTodo: async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const newTodo = await todo.insertOne(request.body);
      response.status = 201;
      response.body = {
        success: true,
        data: newTodo,
      };
    } catch (error) {
      response.status = 401;
      response.body = {
        success: false,
        message: error.toString(),
      };
    }
  },
  getTodoById: async (
    { request, response, params }: {
      request: any;
      response: any;
      params: { id: string };
    },
  ) => {
    try {
      const singleTodo = await todo.findOne({ _id: params.id });
      response.status = 200;
      response.body = {
        success: true,
        data: singleTodo,
      };
    } catch (error) {
      response.status = 404;
      response.body = {
        success: false,
        message: error.toString(),
      };
    }
  },
  updateTodoById: async (
    { request, response, params }: {
      request: any;
      response: any;
      params: { id: string };
    },
  ) => {
    try {
      const newTodo = await todo.updateOne(
        { _id: params.id },
        { $set: request.body },
      );
      response.status = 200;
      response.body = {
        success: true,
        data: newTodo,
      };
    } catch (error) {
      response.status = 404;
      response.body = {
        success: true,
        message: error.toString(),
      };
    }
  },
  deleteTodoById: async (
    { request, response, params }: {
      request: any;
      response: any;
      params: { id: string };
    },
  ) => {
    const deletedTodo = await todo.deleteOne({ _id: params.id });
    response.status = 200;
    response.body = {
      success: true,
      data: deletedTodo,
    };
  },
};
