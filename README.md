
# TypeScript utils

This packages contains some `type`s and function utilities for TypeScript.

1. types
    - [`CompErr<E>`](#comperr)
    - [`Brand<T, U>`](#brand)
    - [`Union<T, U>`](#union)
    - [`Intersection<T, U>`](#intersetion)
    - [`Head<T>`](#head)
    - [`Tail<T>`](#tail)
    - [`IfAny<T, Then, Else>`](#ifany)
    - [`IsAny<T>`](#isany)
    - [`XOR<T, U>`](#xor)
    - [`ToArray<T>`](#toarray)
    - [`ToUnion<T>`](#tounion)
    - [`RemovePropsOf<S, T>`](#removepropsof)
    - [`Overwrite<T, U>`](#overwrite)
    - [`Difference<T, U>`](#difference)
    - [`AwaitedReturnType<T>`](#awaitedreturntype)
    - [`Filter<T, U>`](#filter)
    - [`Flat<T>`](#flat)
    - [`DeepFlat<T>`](#deepflat)
    - [`Values<T>`](#values)
    - [`SimmetricDifference<T>`](#simmetricdifference)

2. functions
    - [`assertDefined`](#assertdefined)
    - [`assertNever`](#assertnever)
    - [`assert`](#assert)

# Types

## CompErr

```ts
import type { CompErr } from "@nullndr/tsutils";
```

## Brand

```ts
import type { Brand } from "@nullndr/tsutils";
```

TypeScript's type system is _structural_, meaning that any two types that are structurally equivalent are considered the same.

```ts
type Cat = { name: string };
type Dog = { name: string };

const petCat = (cat: Cat) => { console.log(cat.name); };
const pluto: Dog = { name: "Pluto" };
petCat(pluto); // works fine
```

In same case, you would like to simulate _nominal typing_ inside TypeScript.

```ts
type Cat = { name: string };
type Dog = { name: string };

const petCat = (cat: Brand<Cat, "cat">) => { console.log(cat.name); };
const fido: Dog = { name: "fido" };
petCat(fido); // does not work
```

## Union

```ts
import type { Union } from "@nullndr/tsutils";
```

This is just a wrapper for the union `|` operator:

```ts
let u: Union<string, number> = "Hello"; 
u = 1;
```

## Intersetion

```ts
import type { Intersection } from "@nullndr/tsutils";
```

For object this is just a wrapper for the intersection `&` operator:

```ts
type Bar = { bar: number };

type Foo = { foo: number };

let i: Intersection<Bar, Foo> = { bar: 1, foo: 1};
```

For unions the type wraps `Extract`:

```ts

let i: Intersection<1 | 2 | 3, 2 | 3 | 4> = 2; // ok
i = 1; // error
i = 3; // ok
i = 4; // error
```

## Head

```ts
import type { Head } from "@nullndr/tsutils";
```

This type extracts the head type of a list or tuple:

```ts
type Tuple = [string, boolean, number];

let h: Head<Tuple> = "Hello";
```

## Tail

```ts
import type { Tail } from "@nullndr/tsutils";
```

This type extracts the tail type of a tuple:

```ts
type Tuple = [string, boolean, number];

let t: Tail<Tuple> = [true, 0];
```

## IfAny

```ts
import type { IfAny } from "@nullndr/tsutils";
```

With `A`, `B` and `C` types, assign `B` is `A` is `any`, `C` otherwise.

```ts
let a: IfAny<any, number, string> = 1;
let b: IfAny<number, number, string> = "Hello";
```

## IsAny

```ts
import type { IsAny } from "@nullndr/tsutils";
```

Like [`IfAny`](#ifany) but returns `true` if the type is `any`, `false` otherwise, usefull inside other types.

## XOR

```ts
import type { XOR } from "@nullndr/tsutils";
```

TypeScript's type system is _structural_, meaning that any two types that are structurally equivalent are considered the same.

This can lead to some unpleasant cases:

```ts
type A = {
    a: 1;
};

type B = {
    b: 2;
};

type C = A | B;

let a: C = { a: 1, b: 2 }; // works fine
```

This because `{ a: 1, b: 2}` can be assigned both at `A` and `B`, in order to get really mutually exclusive use `XOR`:

```ts
type A = {
    a: 1;
};

type B = {
    b: 2;
};

let a: XOR<A, B> = { a: 1, b: 2 }; // error
a = { a: 1 }; // ok
a = { b: 2 }; // ok
```

## ToUnion

```ts
import type { ToUnion } from "@nullndr/tsutils";
```

With an array, this type extracts the array's type:

```ts
let s: ToUnion<string[]> = "Hello";
```

With a tuple, `ToUnion` creates an union with each element type inside the tuple:

```ts
let s: ToUnion<[string, number, boolean]> = "Hello"; // string | number | boolean
s = 1;
s = true;
```

## ToArray

```ts
import type { ToArray } from "@nullndr/tsutils";
```

This type creates an array type from a given type:

```ts
let a: ToArray<number> = [0, 1, 2, 3, 4];
```

Its behavior is the opposit of [`Flat<T>`](#flat).

## RemovePropsOf

```ts
import type { RemovePropsOf } from "@nullndr/tsutils";
```

This type removes from an object all properties that are of a specific type.

```ts
type Foo = {
    foo: number;
    foobar: number;
    bar: string;
}

let r: RemovePropsOf<Foo, number> = { bar: "Hello" };
```

## Overwrite

```ts
import type { Overwrite } from "@nullndr/tsutils";
```

This type overwrites all properties of an source object which exist in a target object with the properties in the target object.

```ts
type Foo = {
    foo: number;
    bar: string;
}

type Bar = {
    foo: string;
}

let o: Overwrite<Foo, Bar> = { foo: "Hello", bar: "World" };
```

## Difference

```ts
import type { Difference } from "@nullndr/tsutils";
```

## AwaitedReturnType

```ts
import type { AwaitedReturnType } from "@nullndr/tsutils";
```

This type unwraps the awaited type of the return type of a function type.

```ts
async function foo(): Promise<number>;

let a: AwaitedReturnType<typeof foo> = 2;
```

## Filter

```ts
import type { Filter } from "@nullndr/tsutils";
```

## Flat

```ts
import type { Flat } from "@nullndr/tsutils";
```

This type flats an array.

```ts
let f: Flat<string[]> = "Hello";
```

Its behavior is the opposit of [`ToArray<T>`](#toarray)

## DeepFlat

```ts
import type { DeepFlat } from "@nullndr/tsutils";
```

Like [`Flat<T>`](#flat) but recursively flats the result.


```ts
let f: DeepFlat<string[][][][]> = "Hello";
```

## Values

```ts
import type { Values } from "@nullndr/tsutils";
```

Retrives a union of all property values in an object.

```ts
type Foo = {
    a: string;
    b: 1;
    c: 2;
};

let v: Values<Foo> = "Hello"; // Ok
v = 1; // ok
v = 2; // ok
v = 3; // error
```


## SimmetricDifference

```ts
import type { SimmetricDifference } from "@nullndr/tsutils";
```

This type extracts the simmetric difference of two objects.

```ts
type Foo = {
    foo: number;
    foobar: string;
};

type Bar = {
    bar: number;
    foobar: string;
};

let s: SimmetricDifference<Foo, Bar> = { foo: 1, bar: 1};
```

To get the simmetric difference of two unions, you can use `Exclude<T, U>` united with `Exclude<U, T>`.

```ts
type Foo = 1 | 2 | 3 

type Bar = 2 | 4

type S = Exclude<Foo, Bar> | Exclude<Bar, Foo>

let a: S = 1; // ok
a = 2; // error
a = 3; // ok
a = 4; // ok
```

# Functions

## assertDefined

```ts
import { assertDefined } from "@nullndr/tsutils";
```

This function asserts that a given value is not `null` or `undefined`.

```ts
const user: User | null = await findUser(id);

assertDefined(user);

console.log(user.firstName);
```

The function throws an 'AssertFail` error if the value is `null` or `undefined`.

## assertNever

```ts
import { assertNever } from "@nullndr/tsutils";
```

## assert

```ts
import { assert } from "@nullndr/tsutils";
```