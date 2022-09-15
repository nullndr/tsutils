import { Flat } from "index";
import { expectAssignable } from "tsd-lite";

type Foo = number[];

type Bar = string;

expectAssignable<Flat<Foo>>(1);

expectAssignable<Flat<Bar>>("bar");
