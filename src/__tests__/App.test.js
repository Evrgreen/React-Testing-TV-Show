import React from "react";
import { render, wait, getByText, fireEvent } from "@testing-library/react";
import App from "../App";
import { fetchShow as mockFetchShow } from "../api/fetchShow";
import { showData } from "../showData";
import userEvent from "@testing-library/user-event";

jest.mock("../api/fetchShow");
// test("App should mount", () => {
//   mockFetchShow.mockResolvedValueOnce(showData);
//   const { getByText } = render(<App />);
//   getByText(/Fetching Data/i);
// });

test("fetches and displays data", async () => {
  mockFetchShow.mockResolvedValueOnce(showData);
  const { getAllByText, queryAllByTestId, getByTestId } = render(<App />);
  await wait(() => {
    return getAllByText(/Stranger/i);
  });
  const title = getByTestId("title");
  getByTestId("episodeList");
  expect(queryAllByTestId("episode")).toHaveLength(0);
});
test("Clicks on Dropdown menu and loads episodes ", async () => {
  mockFetchShow.mockResolvedValueOnce(showData);
  const { queryByText, getByText, queryAllByTestId, debug } = render(<App />);
  await wait(() => {});
  expect(queryAllByTestId("episode")).toHaveLength(0);
  userEvent.click(queryByText(/select a season/i));
  const season = getByText(/season 1/i);
  userEvent.click(season);
  expect(queryAllByTestId("episode")).toHaveLength(8);
});
