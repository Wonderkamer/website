import fs from 'fs';

import State from './state';

describe('State', () => {
  it('should create a state', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.state<MyTestState, MyTestError>(MyTestState.test);

    expect(state.state).toEqual(MyTestState.test);
    expect(state.error).toBeUndefined();
    expect(state.detail).toBeUndefined();
  });

  it('should create a erroneus state', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.error<MyTestState, MyTestError>(MyTestError.error1);

    expect(state.state).toEqual('erroneous');
    expect(state.error).toEqual('error1');
    expect(state.detail).toBeUndefined();
  });

  it('an erroneus state can carry detail', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.error<MyTestState, MyTestError>(MyTestError.error1, 'detail');

    expect(state.state).toEqual('erroneous');
    expect(state.error).toEqual('error1');
    expect(state.detail).toBe('detail');
  });

  it('should be able to convert to string', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.error<MyTestState, MyTestError>(MyTestError.error1, 'detail');

    expect(state.toString()).toEqual('erroneous: error1 (detail)');
  });

  it('should be able to convert to string without detail', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.error<MyTestState, MyTestError>(MyTestError.error1);

    expect(state.toString()).toEqual('erroneous: error1');
  });

  it('should be able to convert to string without error', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.state<MyTestState, MyTestError>(MyTestState.test);

    expect(state.toString()).toEqual('testing');
  });

  it('should be able to convert to json', () => {
    enum MyTestState {
      test = 'testing',
    }
    enum MyTestError {
      error1 = 'error1',
    }

    const state = State.error<MyTestState, MyTestError>(MyTestError.error1, 'detail');

    expect(state.toJSON()).toEqual({
      state: 'erroneous',
      error: 'error1',
      detail: 'detail',
    });
  });
});
