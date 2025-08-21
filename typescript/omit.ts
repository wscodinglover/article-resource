interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description" | "title">;

type TodoPreview1 = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

// 实现
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
