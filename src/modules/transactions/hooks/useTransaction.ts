import * as Share from "expo-sharing";
import { useCallback, useRef, useState } from "react";
import { ViewShotRef } from "react-native-view-shot";

import { toast } from "@/utils";

export const useTransaction = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const shotRef = useRef<ViewShotRef>(null);

  const handleShotRef = useCallback(async () => {
    try {
      setIsCapturing(true);
      const imageUri = await shotRef.current?.capture?.();
      setIsCapturing(false);

      if (!imageUri) {
        throw new Error("Failed to capture transaction details.");
      }

      await Share.shareAsync(imageUri, {
        dialogTitle: "Share Transaction Details",
        mimeType: "image/png",
      });
    } catch (error) {
      console.error("Error capturing transaction details:", error);
      toast("An error occurred while capturing the transaction details.");
    }
  }, []);

  return {
    shotRef,
    isCapturing,
    handleShotRef,
  };
}
