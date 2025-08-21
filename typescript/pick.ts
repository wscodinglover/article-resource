interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreviewPick = MyPick<Todo, "title" | "completed">;

const todoPick: TodoPreviewPick = {
  title: "Clean room",
  completed: false,
};

// 实现
type MyPick<T, K> = {
  [P in keyof T as P extends K ? P : never]: T[P];
};
