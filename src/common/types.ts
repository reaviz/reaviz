/**
 * branch between showing something and providing a spec,
 * or not showing it
 */
export type Visible<T> = { show: true } & T;
export type Invisible<T> = { show: false } & Partial<T>;
export type Shown<T> = Visible<T> | Invisible<T>;
