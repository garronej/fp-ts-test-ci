import * as _ from '../../src/ReaderEither'
import * as R from '../../src/Reader'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType Reader<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.getOrElseW(() => R.of<{ b: number }, null>(null))
)

//
// orElse
//

// $ExpectType ReaderEither<{ a: string; }, number, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orElse((a) => _.left(a.length))
)

//
// orElseW
//

// $ExpectType ReaderEither<{ b: number; } & { a: string; }, never, string | number>
pipe(
  _.left<{ a: string }, string, string>('a'),
  _.orElseW((a) => _.right<{ b: number }, never, string | number>(a.length))
)

//
// orElseFirst
//

// $ExpectType ReaderEither<{ a: string; }, string, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orElseFirst((a) => _.right(a.length))
)

//
// orElseFirstW
//

// $ExpectType ReaderEither<{ a: string; }, string | number, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orElseFirstW((a) => _.left(a.length))
)

//
// orLeft
//

// $ExpectType ReaderEither<{ a: string; }, number, never>
pipe(
  _.left<{ a: string }, string, never>('a'),
  _.orLeft((a) => R.of(a.length))
)

//
// chainW
//

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.chainW(() => _.right<{ b: number }, number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType ReaderEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// do notation
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<{ readonly a: number }, string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<{ readonly b: string }, number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<{ readonly a: number }, string, number>(1),
  _.bindTo('a'),
  _.apS('b', _.right('b')),
  _.apSW('c', _.right<{ readonly b: string }, number, boolean>(true))
)

//
// Do
//

// $ExpectType ReaderEither<unknown, string, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<unknown, string, number>(1)),
  _.bind('b', () => _.of<unknown, string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType ReaderEither<{ c: boolean; }, "a" | "b", number>
pipe(
  _.left<{ c: boolean }, 'a', number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)
