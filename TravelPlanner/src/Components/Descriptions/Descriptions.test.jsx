import Descriptions from "./Descriptions";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

//demo to see that the tests work as they should
test("demo", () => {
  expect(true).toBe(true);
});

/*
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "65ca0f1c6f59668db73ae531" }),
}));

// Mocking the axios library
jest.mock("axios");

test("that description page renders correctly", async () => {
  // Mocking a successful API response
  axios.get.mockResolvedValueOnce(() =>
    Promise.resolve({ data: { description: "Test Description" } })
  );

  const { getByText } = render(
    <BrowserRouter>
      <Descriptions />
    </BrowserRouter>
  );

  // Wait for the component to finish rendering
  await waitFor(() => {
    expect(getByText("Description")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
  });
});*/

/*
test("that description page renders correctly", async () => {
  // Mocking a successful API response
  axios.get.mockResolvedValue({
    data: { description: "Test Description" },
  });

  const { getByText } = render(
    <BrowserRouter>
      <Descriptions />
    </BrowserRouter>
  );

  // Wait for the component to finish rendering
  await waitFor(() => {
    expect(getByText("Test Description")).toBeInTheDocument();
  });
});*/

test("test description", async () => {
  render(<Descriptions />);
  const description = await screen.findAllByText();
  expect(description).toEqual("Test description");
});
