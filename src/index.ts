//
//
//  Type utilities
//
//

/**
 * Used for custom compilation error
 */
export type CompError<E extends string> = Readonly<{ [k in E]: void }>;

/**
 * Given a base type `T` and some unique and arbitrary branding type `U`,
 * `Band` produces a type based on but distinct from `T`.
 *
 * Take care that the branding type is unique.
 *
 * Two branded types that share the same base type and branding type are considered the same type!
 */
export type Brand<T, U> = T & { __brand: U };

/**
 * USed to create an union between two types
 */
export type Union<T, U> = T | U;

/**
 * Used to create an intersection between two types
 */
export type Intersection<T, U> = T extends object
  ? U extends object
    ? T & U
    : never
  : Extract<T, U>;

/**
 * Used to retrieve the type of the first element in an array or in a tuple
 *
 * ```ts
 * let s: Head<[string, number, boolean]>; // string
 *
 * let n: Head<number[]>; // number
 * ```
 */
export type Head<T> = T extends [infer E]
  ? E
  : T extends [infer H, ...unknown[]]
  ? H
  : T;

/**
 * Used to retrieve the tuple tail
 *
 * ```ts
 * let tail: Tail<[string, number, boolean]> = [1, true];
 * ```
 */
export type Tail<T> = T extends [infer E]
  ? E
  : T extends any[]
  ? ((..._: T) => void) extends (_: any, ...r: infer P) => void
    ? P extends [infer E]
      ? E
      : P
    : T
  : T;

/**
 * `any` is the only type that can let you equate `0` with `1`.
 *
 * See https://stackoverflow.com/a/49928360/1490091
 */
export type IfAny<T, Then, Else> = 0 extends 1 & T ? Then : Else;

/**
 * Check if the type is `any`, if true returns `true`, otherwise `false`
 */
export type IsAny<Data> = IfAny<Data, true, false>;

/**
 * Used to create an array from a `T` type
 */
export type ToArray<T> = T[];

/**
 * Used to create an union from a tuple
 *
 * ```ts
 * let u: ToUnion<[1, 2, 3]>; // 1 | 2 | 3
 * ```
 */
export type ToUnion<T> = T extends any[] ? T[number] : T;

/**
 * Remove from a source `S` all properties of `T` type
 */
export type RemovePropsOf<S extends object, T> = {
  [K in keyof S as S[K] extends T ? never : K]: S[K];
};

/**
 * Used to overwrite all `T` properties that exists in `U` with the properties in `U`
 */
export type Overwrite<T extends object, U extends object> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K];
};

/**
 * Used to retrieve the difference from two types or the different properties from two objects
 */
export type Difference<T, U> = T extends U
  ? never
  : T extends object
  ? U extends object
    ? {
        [K in keyof T as K extends keyof U ? never : K]: T[K];
      }
    : never
  : T;

/**
 * Unwraps the "awaited type" of the return type of a function type
 */
export type AwaitedRetunType<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

type _OneOf<T extends {}> = Values<{
  [K in keyof T]: T[K] & {
    [K in Values<{ [L in keyof Omit<T, K>]: keyof T[L] }>]?: undefined;
  };
}>;

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T | U extends object
  ?
      | ({ [P in Exclude<keyof T, keyof U>]?: never } & U)
      | ({ [P in Exclude<keyof U, keyof T>]?: never } & T)
  : T | U;

/**
 * Used to retrieve the same properties of two objects
 */
export type Filter<T extends object, U extends object> = {
  [K in keyof T as K extends keyof SimmetricDifference<T, U> ? never : K]: T[K];
};

/**
 * Used to flat the array type
 */
export type Flat<T> = T extends Array<infer E> ? E : T;

/**
 * Like `Flat` but recursively flat the result
 */
export type DeepFlat<T> = T extends Array<infer E> ? DeepFlat<E> : T;

/**
 * Returns an union of all the values in T
 */
export type Values<T extends object> = T[keyof T];

/**
 * Used to retrieve the simmetric difference of two objects
 */
export type SimmetricDifference<T extends object, U extends object> = {
  [K in keyof T as K extends keyof U ? never : K]: T[K];
} & { [K in keyof U as K extends keyof T ? never : K]: U[K] };

//
//
//  Function utilities
//
//

type MessageOption = {
  message: string;
};

type ErrorOption = {
  error: Error;
};

export type AssertOption = MessageOption | ErrorOption;

/**
 * Class that represents the default error if no option is provided
 * or if it is only provided the error message
 */
export class AssertFail extends Error {
  constructor(message?: string) {
    super(message);
  }
}

/**
 * assert that a value is not null or undefined
 *
 * ```typescript
 * const user: User | null = await fetchUser(endpoint)
 *
 * assertNotNull(user, { error: new UserNotFound(endpoint) })
 *
 * // now `user` is of type `User`
 * console.log(user)
 * ```
 *
 * @param value
 * @param option an optional message or an optional error
 * @return assert that value is T, throw if null
 */
export function assertDefined<T>(
  value: T | null | undefined,
  option?: AssertOption,
): asserts value is T {
  if (option == null) {
    if (value == null) {
      throw new AssertFail();
    }
    return;
  }

  if ("message" in option) {
    if (value == null) {
      throw new AssertFail(option.message);
    }
    return;
  }

  if (value == null) {
    throw option.error;
  }
}

/**
 * assert that all variants of an union have been exhausted
 *
 * @param value
 * @param option an optional message or an optional error
 * @return never return, just throw an error
 */
export function assertNever(value: never, option?: AssertOption): never {
  if (option == null) {
    throw new AssertFail(`Unexpected value: ${value}`);
  }

  if ("message" in option) {
    throw new AssertFail(option.message);
  }

  throw option.error;
}

/**
 * assert that a condition results true
 *
 * @param condition
 * @param option an optional message or an optional error
 * @return assert that condition is true, throw otherwise
 */
export function assert(
  condition: boolean,
  option?: AssertOption,
): asserts condition is true {
  if (!condition) {
    if (option == null) {
      throw new AssertFail();
    }

    throw "message" in option ? new AssertFail(option.message) : option.error;
  }
}
