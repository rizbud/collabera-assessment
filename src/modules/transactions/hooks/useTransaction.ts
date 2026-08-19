import * as Share from "expo-sharing";
import { useCallback, useRef, useState } from "react";
import { ViewShotRef } from "react-native-view-shot";

import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import { toast } from "@/utils";

export const useTransaction = (refId?: string) => {
  const transaction = useTransactionsStore((s) =>
    s.transactions.find((t) => t.refId === refId),
  );
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
        dialogTitle: i18n.t("detail.shareDialogTitle"),
        mimeType: "image/png",
      });
    } catch (error) {
      console.error("Error capturing transaction details:", error);
      toast(i18n.t("detail.shareError"));
    }
  }, []);

  return {
    transaction,
    shotRef,
    isCapturing,
    handleShotRef,
  };
}
