import { CATEGORY_RULES } from "./category.rules.js";

const findCategory = (transaction) => {
  const note = (transaction.note || "").toLowerCase();

  const merchant = (transaction.merchant || "").toLowerCase();

  const description = (transaction.originalDescription || "").toLowerCase();

  // -----------------------------
  // 1. Check Note (Highest Priority)
  // -----------------------------
  for (const category in CATEGORY_RULES) {
    const keywords = CATEGORY_RULES[category];

    for (const keyword of keywords) {
      if (!keyword) continue;

      if (note.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // -----------------------------
  // 2. Check Merchant
  // -----------------------------
  for (const category in CATEGORY_RULES) {
    const keywords = CATEGORY_RULES[category];

    for (const keyword of keywords) {
      if (!keyword) continue;

      if (note.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // -----------------------------
  // 3. Check Original Description
  // -----------------------------
  for (const category in CATEGORY_RULES) {
    const keywords = CATEGORY_RULES[category];

    for (const keyword of keywords) {
      if (!keyword) continue;

      if (note.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // -----------------------------
  // 4. Check if Merchant is a Person
  // -----------------------------
  if (isPersonName(transaction.merchant)) {
    return "People";
  }

  // -----------------------------
  // 5. Default Category
  // -----------------------------
  return "Others";
};

const isPersonName = (merchant = "") => {
  const value = merchant.trim();

  if (!value) {
    return false;
  }

  // Ignore businesses
  const businessWords = [
    "pharmacy",
    "medical",
    "mart",
    "store",
    "stationers",
    "restaurant",
    "hotel",
    "petrol",
    "fuel",
    "agency",
    "services",
    "electronics",
    "enterprise",
    "enterprises",
    "supermarket",
    "clinic",
    "hospital",
    "cafe",
    "bakery",
    "bank",
    "finance",
    "mall",
  ];

  const lower = value.toLowerCase();

  for (const word of businessWords) {
    if (lower.includes(word)) {
      return false;
    }
  }

  // Looks like a person's name
  return /^[A-Za-z ]+$/.test(value);
};

export const categorizeTransactions = (transactions) => {
  return transactions.map((transaction) => {
    const category = findCategory(transaction);

    return {
      ...transaction,
      category,
      isCategorized: category !== "Others",
    };
  });
};
