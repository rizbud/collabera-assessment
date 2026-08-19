import { Alert, Platform, ToastAndroid } from "react-native";

import { toast } from "../toast";

describe("toast", () => {
  it("uses the native toast on Android", () => {
    jest.replaceProperty(Platform, "OS", "android");

    toast("Saved");

    expect(ToastAndroid.show).toHaveBeenCalledWith("Saved", ToastAndroid.SHORT);
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it("falls back to an alert elsewhere", () => {
    jest.replaceProperty(Platform, "OS", "ios");

    toast("Saved");

    expect(Alert.alert).toHaveBeenCalledWith("Saved");
    expect(ToastAndroid.show).not.toHaveBeenCalled();
  });
});
