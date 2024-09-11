import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import { describe, test, expect, vi } from "vitest";

const mockCallBack = vi.fn();

describe("Button", () => {
  test("renders Button component", () => {
    render(
      <Button primary onClick={mockCallBack}>
        Bottone
      </Button>
    );
    expect(screen.getByText("Bottone")).toBeInTheDocument();
  });
  test("execute callback on click", () => {
    render(
      <Button primary onClick={mockCallBack}>
        Bottone
      </Button>
    );
    fireEvent.click(screen.getByText("Bottone"));
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
  test("don't execute callback on click when loading", () => {
    render(
      <Button primary loading={true} onClick={mockCallBack}>
        Bottone
      </Button>
    );
    fireEvent.click(screen.getByTestId("button"));
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
