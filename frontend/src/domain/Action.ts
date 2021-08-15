export interface Action<T> {
  type: T;
}

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}
