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
      const body = await request.body();
      console.log(body.value);
      const newTodo = await todo.insertOne(body.value);
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
    { response, params }: {
      response: any;
      params: { id: string };
    },
  ) => {
    try {
      const singleTodo = await todo.findOne({ _id: { "$oid": params.id } });
      if (!singleTodo) {
        response.status = 404;
        response.body = {
          success: false,
          message: `Id: ${params.id} not found`,
        };
        return;
      }
      response.status = 200;
      response.body = {
        success: true,
        data: singleTodo,
      };
    } catch (error) {
      response.status = 401;
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
      const body = await request.body();
      console.log(body);
      const updateResult = await todo.updateOne(
        { _id: { "$oid": params.id } },
        { $set: body.value },
      );
      if (updateResult.matchedCount == 0) {
        response.status = 404;
        response.body = {
          success: false,
          message: `Id: ${params.id} not found`,
        };
        return;
      }
      response.status = 200;
      response.body = {
        success: true,
        data: updateResult,
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
    { response, params }: {
      response: any;
      params: { id: string };
    },
  ) => {
    const deletedTodo = await todo.deleteOne({ _id: { "$oid": params.id } });
    if (!deletedTodo) {
      response.status = 404;
      response.body = {
        success: false,
        message: `Id: ${params.id} not found`,
      };
      return;
    }
    response.status = 200;
    response.body = {
      success: true,
      deleted: deletedTodo,
    };
  },
};
