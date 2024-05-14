import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginComponent from "../Layouts/Login/LoginComponent";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("LoginComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders email and password input fields", () => {
    render(
      <Router>
        <LoginComponent />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", async () => {
    const handleSubmit = jest.fn();
    render(
      <Router>
        <LoginComponent onSubmit={handleSubmit} />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test("displays error message on failed login", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });
    render(
      <Router>
        <LoginComponent />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Invalid credentials");
    expect(errorMessage).toBeInTheDocument();
  });
});
/Layouts/Login/LoginComponent