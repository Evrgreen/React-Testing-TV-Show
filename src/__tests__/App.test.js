import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("App should mount", () => {
  const { getByText } = render(<App />);
});