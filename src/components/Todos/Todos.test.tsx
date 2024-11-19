import { act, render, screen } from "@testing-library/react";
import axios from "axios";
import Todos from "./Todos";
import userEvent from "@testing-library/user-event";
import { Todo } from "../../types";
import { todosMock } from "../../mocks";

jest.mock("axios");

describe("Todos", () => {
  const renderComponent = async (todos: Todo[]) => {
    const user = userEvent.setup();

    jest.spyOn(axios, "get").mockResolvedValue({
      data: todos,
    });

    await act(async () => {
      render(<Todos />);
    });

    const todoTitleInput = screen.getByRole("textbox", {
      name: /todo title/i,
    });
    const todoDescriptionInput = screen.getByRole("textbox", {
      name: /todo description/i,
    });

    return {
      user,
      todoTitleInput,
      todoDescriptionInput,
    };
  };

  it("should render list of todos", async () => {
    await renderComponent(todosMock);

    todosMock.forEach((todo) => {
      expect(screen.getByText(todo.body)).toBeInTheDocument();
    });
  });

  it("should correclty delete todo", async () => {
    const { user } = await renderComponent([todosMock[0]]);

    const todo = screen.getByText("Title 1");
    expect(todo).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /remove/i,
    });

    await user.click(button);

    expect(todo).not.toBeInTheDocument();
  });

  it("should correctly complete todo", async () => {
    const { user } = await renderComponent([todosMock[0]]);

    const doneBtn = screen.getByText("Done");
    expect(doneBtn).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /done/i,
    });

    await user.click(button);

    expect(screen.getByText("Not Done")).toBeInTheDocument();
  });

  it("should correctly add new todo to list", async () => {
    const { user, todoTitleInput, todoDescriptionInput } =
      await renderComponent([]);

    const newTodo = {
      title: "Lorem ipsum title",
      description: "Lorem ipsum description",
    };

    const submitButton = screen.getByRole("button");

    await screen.findByRole("form");
    await user.type(todoTitleInput, newTodo.title);
    await user.type(todoDescriptionInput, newTodo.description);

    expect(todoTitleInput).toHaveValue(newTodo.title);
    expect(todoDescriptionInput).toHaveValue(newTodo.description);

    await user.click(submitButton);

    expect(screen.getByText(newTodo.title)).toBeInTheDocument();
    expect(screen.getByText(newTodo.description)).toBeInTheDocument();
  });

  it("should show loading when data is fetching and hide when it's done", async () => {
    const { rerender } = render(<Todos />);

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();

    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: [],
    });

    await act(async () => {
      rerender(<Todos />);
    });

    expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument();
  });

  it("should show error message when error occur", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network error"));
    const { rerender } = render(<Todos />);

    await act(async () => {
      rerender(<Todos />);
    });

    expect(
      screen.getByText(/smotehing went wrong: network error/i)
    ).toBeInTheDocument();
  });
});
