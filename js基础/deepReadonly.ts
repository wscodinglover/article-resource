type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// test
interface Immutable {
  a: number;
  b: string;
  c: {
    d: boolean;
  };
}

const im: Readonly<Immutable> = {
  a: 1,
  b: "2",
  c: {
    d: true,
  },
};

im.c.d = true;

const idm: DeepReadonly<Immutable> = {
  a: 1,
  b: "2",
  c: {
    d: true,
  },
};

idm.c.d; // 不可以赋值
