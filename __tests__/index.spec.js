import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import useInputDebounce from "./../src";
import { debug } from "util";

const effect = jest.fn();

const DebouncedComponent = ({ delay, minLength, initial }) => {
  const attributes = useInputDebounce(effect, { initial, delay, minLength });
  return <input data-testid="my-test-input" {...attributes} />;
};

describe("useInputDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    effect.mockReset();
  });

  it("should call effect once for value change", () => {
    const { getByTestId } = render(
      <DebouncedComponent delay={1000} minLength={1} />
    );
    const dInput = getByTestId("my-test-input");
    fireEvent.change(dInput, { target: { value: "a" } });
    jest.runAllTimers();
    expect(effect).toHaveBeenCalledTimes(1);
  });
  it("shouldn't call effect until minLength has been reached", () => {
    const { getByTestId } = render(
      <DebouncedComponent delay={1000} minLength={2} />
    );
    const dInput = getByTestId("my-test-input");
    fireEvent.change(dInput, { target: { value: "a" } });
    jest.runAllTimers();
    expect(effect).not.toHaveBeenCalled();
    fireEvent.change(dInput, { target: { value: "ab" } });
    jest.runAllTimers();
    expect(effect).toBeCalledTimes(1);
  });
  it("called with no delay or minLength", () => {
    const { getByTestId } = render(<DebouncedComponent />);
    const dInput = getByTestId("my-test-input");
    fireEvent.change(dInput, { target: { value: "ab" } });
    jest.runAllTimers();
    expect(effect).toBeCalledTimes(1);
  });
  it("called with inital value of 'a'", () => {
    const { getByTestId } = render(
      <DebouncedComponent delay={1000} minLength={1} initial="a" />
    );
    const dInput = getByTestId("my-test-input");
    jest.runAllTimers();
    expect(effect).toBeCalledTimes(1);
  });
  it("setTimeout", () => {
    const { getByTestId, debug } = render(
      <DebouncedComponent delay={1000} minLength={1} />
    );
    const dInput = getByTestId("my-test-input");
    fireEvent.change(dInput, { target: { value: "a" } });
    jest.advanceTimersByTime(1500);
    expect(effect).toBeCalledTimes(1);
  });
});
