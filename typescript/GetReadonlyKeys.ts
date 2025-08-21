interface TodoReadonly {
  readonly title: string;
  readonly description: string;
  completed: boolean;
}

type Keys = GetReadonlyKeys<TodoReadonly>; // expected to be "title" | "description"

// 方法1
type GetReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { -readonly [P in K]: T[K] }
    ? 1
    : 2) extends <U>() => U extends { [P in K]: T[K] } ? 1 : 2
    ? never
    : K;
}[keyof T];

// 方法2
type IsEqual<First, Second> = (<Inference>() => Inference extends First
  ? true
  : false) extends <Inference>() => Inference extends Second ? true : false
  ? true
  : false;

type PickReadonlyKeys<Type> = {
  [Key in keyof Type as IsEqual<
    { [AssertionKey in Key]: Type[AssertionKey] },
    { readonly [AssertionKey in Key]: Type[AssertionKey] }
  > extends true
    ? Key
    : never]: Type[Key];
};

type GetReadonlyKeys1<Type> = keyof PickReadonlyKeys<Type>;
