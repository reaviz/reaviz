// boolean version
function isNonNull<T>(x: T): boolean {
  return x !== null && x !== undefined;
}

declare const maybe: string | null;

if (isNonNull(maybe)) {
  maybe.toUpperCase();
  //    ^? 🚫 Error with boolean version:
  //       'maybe' is still string | null (no narrowing across a boolean-returning function)
}

// type-guard version
function isNonNullTG<T>(x: T): x is NonNullable<T> {
  return x !== null && x !== undefined;
}

if (isNonNullTG(maybe)) {
  maybe.toUpperCase();
  //                 ✅ 'maybe' is string here
}
