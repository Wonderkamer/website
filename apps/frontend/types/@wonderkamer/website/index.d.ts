import type Ember from 'ember';

declare global {
  // Augments the global Array with Ember's array prototype extensions. This must
  // stay an interface (a type alias can't merge into the global Array), so the
  // empty-object-type lint doesn't apply here.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

export {};
