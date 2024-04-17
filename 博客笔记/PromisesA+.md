[](https://promisesaplus.com/#point-1)**An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.**

[](https://promisesaplus.com/#point-2)A _promise_ represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

[](https://promisesaplus.com/#point-3)This specification details the behavior of the `then` method, providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide. As such, the specification should be considered very stable. Although the Promises/A+ organization may occasionally revise this specification with minor backward-compatible changes to address newly-discovered corner cases, we will integrate large or backward-incompatible changes only after careful consideration, discussion, and testing.

[](https://promisesaplus.com/#point-4)Historically, Promises/A+ clarifies the behavioral clauses of the earlier [Promises/A proposal](http://wiki.commonjs.org/wiki/Promises/A), extending it to cover _de facto_ behaviors and omitting parts that are underspecified or problematic.

[](https://promisesaplus.com/#point-5)Finally, the core Promises/A+ specification does not deal with how to create, fulfill, or reject promises, choosing instead to focus on providing an interoperable `then` method. Future work in companion specifications may touch on these subjects.

## [](https://promisesaplus.com/#terminology)Terminology

1.  [](https://promisesaplus.com/#point-6)“promise” is an object or function with a `then` method whose behavior conforms to this specification.
2.  [](https://promisesaplus.com/#point-7)“thenable” is an object or function that defines a `then` method.
3.  [](https://promisesaplus.com/#point-8)“value” is any legal JavaScript value (including `undefined`, a thenable, or a promise).
4.  [](https://promisesaplus.com/#point-9)“exception” is a value that is thrown using the `throw` statement.
5.  [](https://promisesaplus.com/#point-10)“reason” is a value that indicates why a promise was rejected.

## [](https://promisesaplus.com/#requirements)Requirements

### [](https://promisesaplus.com/#promise-states)Promise States

[](https://promisesaplus.com/#point-11)A promise must be in one of three states: pending, fulfilled, or rejected.

1.  [](https://promisesaplus.com/#point-12)When pending, a promise:
    1.  [](https://promisesaplus.com/#point-13)may transition to either the fulfilled or rejected state.
2.  [](https://promisesaplus.com/#point-14)When fulfilled, a promise:
    1.  [](https://promisesaplus.com/#point-15)must not transition to any other state.
    2.  [](https://promisesaplus.com/#point-16)must have a value, which must not change.
3.  [](https://promisesaplus.com/#point-17)When rejected, a promise:
    1.  [](https://promisesaplus.com/#point-18)must not transition to any other state.
    2.  [](https://promisesaplus.com/#point-19)must have a reason, which must not change.

[](https://promisesaplus.com/#point-20)Here, “must not change” means immutable identity (i.e. `===`), but does not imply deep immutability.

### [](https://promisesaplus.com/#the-then-method)The `then` Method

[](https://promisesaplus.com/#point-21)A promise must provide a `then` method to access its current or eventual value or reason.

[](https://promisesaplus.com/#point-22)A promise’s `then` method accepts two arguments:

```
promise.then(onFulfilled, onRejected)
```

1.  [](https://promisesaplus.com/#point-23)Both `onFulfilled` and `onRejected` are optional arguments:
    1.  [](https://promisesaplus.com/#point-24)If `onFulfilled` is not a function, it must be ignored.
    2.  [](https://promisesaplus.com/#point-25)If `onRejected` is not a function, it must be ignored.
2.  [](https://promisesaplus.com/#point-26)If `onFulfilled` is a function:
    1.  [](https://promisesaplus.com/#point-27)it must be called after `promise` is fulfilled, with `promise`’s value as its first argument.
    2.  [](https://promisesaplus.com/#point-28)it must not be called before `promise` is fulfilled.
    3.  [](https://promisesaplus.com/#point-29)it must not be called more than once.
3.  [](https://promisesaplus.com/#point-30)If `onRejected` is a function,
    1.  [](https://promisesaplus.com/#point-31)it must be called after `promise` is rejected, with `promise`’s reason as its first argument.
    2.  [](https://promisesaplus.com/#point-32)it must not be called before `promise` is rejected.
    3.  [](https://promisesaplus.com/#point-33)it must not be called more than once.
4.  [](https://promisesaplus.com/#point-34)`onFulfilled` or `onRejected` must not be called until the [execution context](https://es5.github.io/#x10.3) stack contains only platform code. \[[3.1](https://promisesaplus.com/#notes)\].
5.  [](https://promisesaplus.com/#point-35)`onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). \[[3.2](https://promisesaplus.com/#notes)\]
6.  [](https://promisesaplus.com/#point-36)`then` may be called multiple times on the same promise.
    1.  [](https://promisesaplus.com/#point-37)If/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the order of their originating calls to `then`.
    2.  [](https://promisesaplus.com/#point-38)If/when `promise` is rejected, all respective `onRejected` callbacks must execute in the order of their originating calls to `then`.
7.  [](https://promisesaplus.com/#point-39)
    
    [](https://promisesaplus.com/#point-40)`then` must return a promise \[[3.3](https://promisesaplus.com/#notes)\].
    
    ```
     promise2 = promise1.then(onFulfilled, onRejected);
    ```
    
    1.  [](https://promisesaplus.com/#point-41)If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`.
    2.  [](https://promisesaplus.com/#point-42)If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected with `e` as the reason.
    3.  [](https://promisesaplus.com/#point-43)If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value as `promise1`.
    4.  [](https://promisesaplus.com/#point-44)If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason as `promise1`.

### [](https://promisesaplus.com/#the-promise-resolution-procedure)The Promise Resolution Procedure

[](https://promisesaplus.com/#point-45)The **promise resolution procedure** is an abstract operation taking as input a promise and a value, which we denote as `[[Resolve]](promise, x)`. If `x` is a thenable, it attempts to make `promise` adopt the state of `x`, under the assumption that `x` behaves at least somewhat like a promise. Otherwise, it fulfills `promise` with the value `x`.

[](https://promisesaplus.com/#point-46)This treatment of thenables allows promise implementations to interoperate, as long as they expose a Promises/A+-compliant `then` method. It also allows Promises/A+ implementations to “assimilate” nonconformant implementations with reasonable `then` methods.

[](https://promisesaplus.com/#point-47)To run `[[Resolve]](promise, x)`, perform the following steps:

1.  [](https://promisesaplus.com/#point-48)If `promise` and `x` refer to the same object, reject `promise` with a `TypeError` as the reason.
2.  [](https://promisesaplus.com/#point-49)If `x` is a promise, adopt its state \[[3.4](https://promisesaplus.com/#notes)\]:
    1.  [](https://promisesaplus.com/#point-50)If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.
    2.  [](https://promisesaplus.com/#point-51)If/when `x` is fulfilled, fulfill `promise` with the same value.
    3.  [](https://promisesaplus.com/#point-52)If/when `x` is rejected, reject `promise` with the same reason.
3.  [](https://promisesaplus.com/#point-53)Otherwise, if `x` is an object or function,
    1.  [](https://promisesaplus.com/#point-54)Let `then` be `x.then`. \[[3.5](https://promisesaplus.com/#notes)\]
    2.  [](https://promisesaplus.com/#point-55)If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with `e` as the reason.
    3.  [](https://promisesaplus.com/#point-56)If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise`, where:
        1.  [](https://promisesaplus.com/#point-57)If/when `resolvePromise` is called with a value `y`, run `[[Resolve]](promise, y)`.
        2.  [](https://promisesaplus.com/#point-58)If/when `rejectPromise` is called with a reason `r`, reject `promise` with `r`.
        3.  [](https://promisesaplus.com/#point-59)If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
        4.  [](https://promisesaplus.com/#point-60)If calling `then` throws an exception `e`,
            1.  [](https://promisesaplus.com/#point-61)If `resolvePromise` or `rejectPromise` have been called, ignore it.
            2.  [](https://promisesaplus.com/#point-62)Otherwise, reject `promise` with `e` as the reason.
    4.  [](https://promisesaplus.com/#point-63)If `then` is not a function, fulfill `promise` with `x`.
4.  [](https://promisesaplus.com/#point-64)If `x` is not an object or function, fulfill `promise` with `x`.

[](https://promisesaplus.com/#point-65)If a promise is resolved with a thenable that participates in a circular thenable chain, such that the recursive nature of `[[Resolve]](promise, thenable)` eventually causes `[[Resolve]](promise, thenable)` to be called again, following the above algorithm will lead to infinite recursion. Implementations are encouraged, but not required, to detect such recursion and reject `promise` with an informative `TypeError` as the reason. \[[3.6](https://promisesaplus.com/#notes)\]

## [](https://promisesaplus.com/#notes)Notes

1.  [](https://promisesaplus.com/#point-66)
    
    [](https://promisesaplus.com/#point-67)Here “platform code” means engine, environment, and promise implementation code. In practice, this requirement ensures that `onFulfilled` and `onRejected` execute asynchronously, after the event loop turn in which `then` is called, and with a fresh stack. This can be implemented with either a “macro-task” mechanism such as [`setTimeout`](https://html.spec.whatwg.org/multipage/webappapis.html#timers) or [`setImmediate`](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html#processingmodel), or with a “micro-task” mechanism such as [`MutationObserver`](https://dom.spec.whatwg.org/#interface-mutationobserver) or [`process.nextTick`](http://nodejs.org/api/process.html#process_process_nexttick_callback). Since the promise implementation is considered platform code, it may itself contain a task-scheduling queue or “trampoline” in which the handlers are called.
    
2.  [](https://promisesaplus.com/#point-68)
    
    [](https://promisesaplus.com/#point-69)That is, in strict mode `this` will be `undefined` inside of them; in sloppy mode, it will be the global object.
    
3.  [](https://promisesaplus.com/#point-70)
    
    [](https://promisesaplus.com/#point-71)Implementations may allow `promise2 === promise1`, provided the implementation meets all requirements. Each implementation should document whether it can produce `promise2 === promise1` and under what conditions.
    
4.  [](https://promisesaplus.com/#point-72)
    
    [](https://promisesaplus.com/#point-73)Generally, it will only be known that `x` is a true promise if it comes from the current implementation. This clause allows the use of implementation-specific means to adopt the state of known-conformant promises.
    
5.  [](https://promisesaplus.com/#point-74)
    
    [](https://promisesaplus.com/#point-75)This procedure of first storing a reference to `x.then`, then testing that reference, and then calling that reference, avoids multiple accesses to the `x.then` property. Such precautions are important for ensuring consistency in the face of an accessor property, whose value could change between retrievals.
    
6.  [](https://promisesaplus.com/#point-76)
    
    [](https://promisesaplus.com/#point-77)Implementations should _not_ set arbitrary limits on the depth of thenable chains, and assume that beyond that arbitrary limit the recursion will be infinite. Only true cycles should lead to a `TypeError`; if an infinite chain of distinct thenables is encountered, recursing forever is the correct behavior.
    

___

[](https://promisesaplus.com/#point-78)[![CC0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)  
To the extent possible under law, [the Promises/A+ organization](https://github.com/promises-aplus) has waived all copyright and related or neighboring rights to Promises/A+ Promise Specification. This work is published from: United States.