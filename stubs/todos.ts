import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interface
import Todo from "../interfaces/Todo.ts";

let todos: Todo[] = [
  {
    _id: v4.generate(),
    todo: "walk dog",
    isCompleted: true,
  },
  {
    _id: v4.generate(),
    todo: "eat food",
    isCompleted: false,
  },
];

export default todos;
