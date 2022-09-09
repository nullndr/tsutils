import { Head } from "index";
import { expectAssignable, expectType } from "tsd-lite";

type Foo = [string, number, string];

type Bar = [1, number, boolean];

expectAssignable<Head<Foo>>("foo");

expectType<Head<Bar>>(1);
