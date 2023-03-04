/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import LoginComponent from "./LoginComponent";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

describe("LoginComponent test suite", () => {
  const loginServiceMock = {
    login: jest.fn(),
  };

  const setTokenMock = jest.fn();

  const setup = () => {
    render(
      <LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />
    );
  };
  beforeEach(() => {
    setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders LoginComponent with document query", () => {
    const element = screen.getByRole("main");
    expect(element).toBeInTheDocument();
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");
    expect(inputs[2].value).toBe("Login");
  });

  it("Renders LoginComponent with data-test query", () => {
    const inputs = screen.getAllByTestId("input");
    expect(inputs).toHaveLength(3);
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
    expect(inputs[2].getAttribute("value")).toBe("Login");
  });

  it("Initially no message is shown", () => {
    expect(screen.queryByTestId("resultLabel")).not.toBeInTheDocument();
  });

  it("passes credentials correctly", async () => {
    const inputs = screen.getAllByTestId("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    act(() => {
      fireEvent.change(userNameInput, { target: { value: "someUser" } });
      fireEvent.change(passwordInput, { target: { value: "somePassword" } });
      fireEvent.click(loginButton);
    });

    // prevents Warning: An update to LoginComponent inside a test was not wrapped in act(...).
    await waitFor(() => {      
      expect(loginServiceMock.login).toBeCalledWith("someUser", "somePassword");
    });
  });

  it("Handles login success", async () => {
    const someToken = "1234";
    loginServiceMock.login.mockResolvedValueOnce(someToken);
    const inputs = screen.getAllByTestId("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];
    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel).toBeInTheDocument();
    expect(resultLabel).toHaveTextContent("successful login");
  });

  it("Handles login failure", async () => {
    loginServiceMock.login.mockResolvedValueOnce(undefined);
    const inputs = screen.getAllByTestId("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel).toBeInTheDocument();
    expect(resultLabel).toHaveTextContent("invalid credentials");
  });
});
