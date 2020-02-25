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
test("Changes seasons from one to another", async () => {
  mockFetchShow.mockResolvedValueOnce(showData);
  const {
    queryAllByText,
    getAllByText,
    queryByText,
    getByText,
    queryAllByTestId
  } = render(<App />);
  await wait(() => {});
  expect(queryAllByTestId("episode")).toHaveLength(0);
  userEvent.click(queryByText(/select a season/i));
  const season1 = getByText(/season 1/i);
  userEvent.click(season1);
  expect(queryAllByTestId("episode")).toHaveLength(8);
  expect(getAllByText(/\b1\b.*\bepisode\b/i)).toHaveLength(8);
  userEvent.click(queryByText(/^season 1$/i));
  const season2 = getByText(/season 2/i);
  userEvent.click(season2);
  expect(queryAllByText(/\b1\b.*\bepisode\b/i)).toHaveLength(0);
  expect(getAllByText(/\b2\b.*\bepisode\b/i)).toHaveLength(9);
});
