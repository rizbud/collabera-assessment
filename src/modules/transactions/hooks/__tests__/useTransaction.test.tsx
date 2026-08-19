import { act, renderHook } from "@testing-library/react-native";
import * as Share from "expo-sharing";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import { useTransactionsStore } from "@/store";
import { toast } from "@/utils";
import { useTransaction } from "../useTransaction";

jest.mock("@/utils/toast");

beforeEach(() => {
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
});

describe("useTransaction", () => {
  it("finds the transaction for the given refId", async () => {
    const { result } = await renderHook(() => useTransaction("123ABC"));

    expect(result.current.transaction).toMatchObject({
      refId: "123ABC",
      recipientName: "John Doe",
    });
  });

  it("returns nothing for an unknown or missing refId", async () => {
    const unknown = await renderHook(() => useTransaction("NOPE"));
    const missing = await renderHook(() => useTransaction());

    expect(unknown.result.current.transaction).toBeUndefined();
    expect(missing.result.current.transaction).toBeUndefined();
  });

  it("shares the captured image", async () => {
    const { result } = await renderHook(() => useTransaction("123ABC"));
    const capture = jest.fn(async () => "file:///shot.png");
    // @ts-expect-error only the capture method is needed here
    result.current.shotRef.current = { capture };

    await act(() => result.current.handleShotRef());

    expect(capture).toHaveBeenCalled();
    expect(Share.shareAsync).toHaveBeenCalledWith(
      "file:///shot.png",
      expect.objectContaining({ mimeType: "image/png" }),
    );
    expect(result.current.isCapturing).toBe(false);
  });

  it("reports a failed capture instead of sharing", async () => {
    const { result } = await renderHook(() => useTransaction("123ABC"));
    jest.spyOn(console, "error").mockImplementation();

    await act(() => result.current.handleShotRef());

    expect(Share.shareAsync).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith(
      "An error occurred while capturing the transaction details.",
    );
  });
});
