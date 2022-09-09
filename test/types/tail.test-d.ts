import { Tail } from "index";
import { expectAssignable } from "tsd-lite";

type Foo = [boolean];

type FooTail = Tail<Foo>;

type Bar = [string, boolean];

type BarTail = Tail<Bar>;

type FooBar = [string, string, boolean];

const a = true;
const b: [string, boolean] = ["", false];

expectAssignable<FooTail>(a);

expectAssignable<BarTail>(a);

expectAssignable<Tail<FooBar>>(b);
