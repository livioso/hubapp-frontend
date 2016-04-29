// These annotations are copy/pasted from the built-in Flow definitions for
// Native Promises with some non-standard APIs added in
declare class Promise<+R> {
  constructor(callback: (
    resolve: (result?: Promise<R> | R) => void,
    reject: (error?: any) => void
  ) => mixed): void;

  then<U>(
    onFulfill?: ?(value: R) => Promise<U> | ?U,
    onReject?: ?(error: any) => Promise<U> | ?U
  ): Promise<U>;

  catch<U>(
    onReject?: (error: any) => ?Promise<U> | U
  ): Promise<U>;

  static resolve<T>(object?: Promise<T> | T): Promise<T>;
  static reject<T>(error?: any): Promise<T>;

  static all: Promise$All;
  static race<T>(promises: Array<Promise<T>>): Promise<T>;

  // Non-standard APIs
  done<U>(
    onFulfill?: ?(value: R) => mixed,
    onReject?: ?(error: any) => mixed
  ): void;

  static cast<T>(object?: T): Promise<T>;
}
