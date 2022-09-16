
# TypeScript utils

This packages contains some `type`s and function utilities for TypeScript.

1. types
    - [`CompErr<E>`](#comperr)
    - [`Brand<T, U>`]()
    - [`Union<T, U>`]()
    - [`Intersection<T, U>`]()
    - [`Head<T>`]()
    - [`Tail<T>`]()
    - [`ToArray<T>`]()
    - [`ToUnion<T>`]()
    - [`RemovePropsOf< S, T>`]()
    - [`Overwrite<T, U>`]()
    - [`Difference<T, U>`]()
    - [`Filter<T, U>`]()
    - [`Flat<T>`]()
    - [`Entries<T>`]()
    - [`EntriesType<T>`]()
    - [`EntriesWithType<T>`]()
    - [`SimmetricDifference<T>`]()

2. functions
    - [`assertDefined`]()
    - [`assertNever`]()
    - [`assert`]()

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
const fido: Dog = { name: "fido" };
petCat(fido); // works fine
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
let s: ToUnion<[string, number, boolean]> = "Hello";
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

## RemovePropsOf

```ts
import type { RemovePropsOf } from "@nullndr/tsutils";
```

## Overwrite

```ts
import type { Overwrite } from "@nullndr/tsutils";
```

## Difference

```ts
import type { Difference } from "@nullndr/tsutils";
```

## Filter

```ts
import type { Filter } from "@nullndr/tsutils";
```

## Flat

```ts
import type { Flat } from "@nullndr/tsutils";
```

## Entries

```ts
import type { Entries } from "@nullndr/tsutils";
```

## EntriesType

```ts
import type { EntriesType } from "@nullndr/tsutils";
```

## EntriesWithType

```ts
import type { EntriesWithType } from "@nullndr/tsutils";
```

## SimmetricDifference

```ts
import type { SimmetricDifference } from "@nullndr/tsutils";
```

# Functions

## assertDefined

```ts
import { assertDefined } from "@nullndr/tsutils";
```

## assertNever

```ts
import { assertNever } from "@nullndr/tsutils";
```

## assert

```ts
import { assert } from "@nullndr/tsutils";
```