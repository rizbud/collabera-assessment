import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useTransactionsStore } from "@/store";
import { calculateBalance, formatCurrency, toast } from "@/utils";

interface TransactionFormProps {
  // "in" adds money to the balance, "out" sends it away
  type: "in" | "out";
}

interface FieldProps {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  keyboardType?: "default" | "decimal-pad";
  onChangeText: (value: string) => void;
}

const Field = ({ label, error, ...inputProps }: FieldProps) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !!error && styles.inputError]}
      placeholderTextColor={Colors.gray}
      accessibilityLabel={label}
      {...inputProps}
    />
    {!!error && (
      <Text style={styles.errorText} accessibilityRole="alert">
        {error}
      </Text>
    )}
  </View>
);

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const transactions = useTransactionsStore((s) => s.transactions);
  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const balance = useMemo(() => calculateBalance(transactions), [transactions]);

  const [recipientName, setRecipientName] = useState("");
  const [transferName, setTransferName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const parsedAmount = Number(amount.replace(",", "."));
    const nextErrors: Record<string, string> = {};

    if (!recipientName.trim()) {
      nextErrors.recipientName =
        type === "in" ? "Sender name is required" : "Recipient name is required";
    }
    if (!transferName.trim()) {
      nextErrors.transferName = "Description is required";
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = "Enter an amount greater than 0";
    } else if (type === "out" && parsedAmount > balance) {
      nextErrors.amount = `Amount exceeds your balance of ${formatCurrency(balance)}`;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const created = addTransaction({
      recipientName: recipientName.trim(),
      transferName: transferName.trim(),
      amount: type === "in" ? parsedAmount : -parsedAmount,
    });
    toast(
      type === "in"
        ? `Added ${formatCurrency(parsedAmount)}`
        : `Sent ${formatCurrency(parsedAmount)} to ${recipientName.trim()}`,
    );
    router.replace(`/transactions/${created.refId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Available balance: {formatCurrency(balance)}
      </Text>
      <Field
        label={type === "in" ? "Sender Name" : "Recipient Name"}
        value={recipientName}
        placeholder={type === "in" ? "e.g. Acme Corp" : "e.g. John Doe"}
        error={errors.recipientName}
        onChangeText={setRecipientName}
      />
      <Field
        label="Description"
        value={transferName}
        placeholder={type === "in" ? "e.g. Salary Payment" : "e.g. Rent"}
        error={errors.transferName}
        onChangeText={setTransferName}
      />
      <Field
        label="Amount"
        value={amount}
        placeholder="0.00"
        keyboardType="decimal-pad"
        error={errors.amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.submitButton}
        accessibilityRole="button"
        accessibilityLabel={type === "in" ? "Add money" : "Send money"}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {type === "in" ? "Add" : "Send"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  balanceText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.gray,
  },
  field: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  input: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
  },
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.red,
  },
  submitButton: {
    alignItems: "center",
    paddingVertical: Spacing.two + Spacing.one,
    borderRadius: Spacing.two,
    backgroundColor: Colors.primary,
    marginTop: Spacing.two,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.background,
  },
});
