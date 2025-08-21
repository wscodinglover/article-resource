const fn = (v: boolean) => {
  if (v) {
    return 1;
  } else {
    return 2;
  }
};

type a = ReturnType<typeof fn>; // should be 1 | 2

// 实现 ReturnType<T>

type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : never;

type b = MyReturnType<typeof fn>; // should be 1 | 2
