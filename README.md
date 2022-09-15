
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
    - [`RemovePropsOf`S, T>`]()
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

## Union

```ts
import type { Union } from "@nullndr/tsutils";
```

## Intersetion

```ts
import type { Intersection } from "@nullndr/tsutils";
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