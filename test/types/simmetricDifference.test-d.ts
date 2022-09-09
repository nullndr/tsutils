import { expectAssignable, expectNotAssignable } from "tsd-lite";
import { SimmetricDifference } from "../../src";

type Foo = {
  foo: string;
};

type Bar = {
  foo: 1;
  bar: string;
};

expectAssignable<SimmetricDifference<Foo, Bar>>({ bar: "" });

expectNotAssignable<SimmetricDifference<Foo, Bar>>({ foo: "" });
