import { render, screen } from "@testing-library/react";
import App from "./App";

describe("starter app", () => {
  it("loads the mocked hotel transactions", async () => {
    render(<App />);

    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();

    const merchantNames = await screen.findAllByText("The Ritz London", {}, {
      timeout: 2500,
    });

    expect(merchantNames.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /pre_auth/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Dispute form")).toBeInTheDocument();
  });
});

describe("candidate TDD prompts", () => {
  it.todo("shows hold banner for pre_auth transaction, not for payment");
  it.todo("shows expiry countdown for pre_auth hold");
  it.todo("shows estimated refund arrival for pending refund");
  it.todo("submits dispute and shows dispute reference on success");
});
