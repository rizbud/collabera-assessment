import { render, screen, userEvent } from "@testing-library/react-native";

import i18n from "@/i18n";
import { FilterTransactions } from "../filter-transactions";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("FilterTransactions", () => {
  it("renders every filter, defaulting to all", async () => {
    await render(<FilterTransactions />);

    expect(screen.getByText("All")).toBeOnTheScreen();
    expect(screen.getByText("Incoming")).toBeOnTheScreen();
    expect(screen.getByText("Outgoing")).toBeOnTheScreen();
    expect(screen.getByLabelText("Filter transactions by All")).toBeSelected();
  });

  it("marks the active filter", async () => {
    await render(<FilterTransactions activeFilter="out" />);

    expect(
      screen.getByLabelText("Filter transactions by Outgoing"),
    ).toBeSelected();
    expect(
      screen.getByLabelText("Filter transactions by All"),
    ).not.toBeSelected();
  });

  it("reports the picked filter", async () => {
    const onFilterChange = jest.fn();
    await render(<FilterTransactions onFilterChange={onFilterChange} />);

    await userEvent.press(screen.getByText("Incoming"));

    expect(onFilterChange).toHaveBeenCalledWith("in");
  });

  it("translates the labels", async () => {
    await i18n.changeLanguage("ms");
    await render(<FilterTransactions />);

    expect(screen.getByText("Semua")).toBeOnTheScreen();
    expect(screen.getByText("Masuk")).toBeOnTheScreen();
    expect(screen.getByText("Keluar")).toBeOnTheScreen();
    expect(
      screen.getByLabelText("Tapis transaksi mengikut Semua"),
    ).toBeOnTheScreen();
  });
});
