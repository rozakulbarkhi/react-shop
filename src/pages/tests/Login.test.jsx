import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import Login from "../Login";
import Cookies from "js-cookie";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("Login Page", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the login page", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should cannot be directed to the products page if user is not logged in", () => {
    expect(window.location.pathname).toBe("/");
  });

  it("should update the input values", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    expect(usernameInput.value).toBe("test");
    expect(passwordInput.value).toBe("test");
  });

  it("should disabled button if input was empty", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    expect(button).toBeDisabled();
  });

  it("should cannot be login if credentials was wrong", async () => {
    server.use(
      rest.post("https://fakestoreapi.com/auth/login", (req, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test1" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should can be submit form if data was correct", async () => {
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/products");
    });

    expect(Cookies.get("token")).toBe("test");
  });
});
