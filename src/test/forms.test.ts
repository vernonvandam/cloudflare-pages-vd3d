import { describe, expect, it } from "vitest";

import { looksLikeBot } from "@/lib/http";
import { MAX_TOTAL_BYTES, validateQuote, type QuoteFields } from "@/lib/quote";
import { buildConfirmationEmail, safeFirstName } from "@/lib/quote-confirmation";

const valid: QuoteFields = {
  name: "Sarah O'Neil",
  email: "sarah@example.com",
  phone: "",
  business: "",
  service: "Laser engraving",
  quantity: "20",
  deadline: "",
  details: "Logo engraved on 20 bamboo coasters.",
};

const form = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
};

describe("quote validation", () => {
  it("accepts a complete request", () => {
    expect(validateQuote(valid, [{ name: "part.stl", size: 1000 }])).toEqual({});
  });

  it("rejects unknown services, bad quantities and short descriptions", () => {
    const errors = validateQuote({ ...valid, service: "Hack", quantity: "0", details: "hi" }, []);
    expect(Object.keys(errors).sort()).toEqual(["details", "quantity", "service"]);
  });

  it("rejects disallowed file types and oversized uploads", () => {
    expect(validateQuote(valid, [{ name: "virus.exe", size: 10 }]).files).toBeDefined();
    expect(
      validateQuote(valid, [{ name: "big.stl", size: MAX_TOTAL_BYTES + 1 }]).files,
    ).toBeDefined();
  });
});

describe("spam traps", () => {
  it("flags a filled honeypot or an instant submission", () => {
    expect(looksLikeBot(form({ company_website: "x", fill_ms: "9000" }), 3000)).toBe(true);
    expect(looksLikeBot(form({ fill_ms: "200" }), 3000)).toBe(true);
    expect(looksLikeBot(form({}), 3000)).toBe(true);
  });

  it("lets a normal submission through", () => {
    expect(looksLikeBot(form({ fill_ms: "45000" }), 3000)).toBe(false);
  });
});

describe("confirmation email", () => {
  it("greets real names and refuses spam in the name field", () => {
    expect(safeFirstName("Sarah O'Neil")).toBe("Sarah");
    expect(safeFirstName("Buy pills at http://spam.ru")).toBeNull();
  });

  it("never echoes the customer's free text", () => {
    const email = buildConfirmationEmail({ ...valid, details: "VISIT http://spam.ru NOW" }, 1);
    expect(email.html + email.text).not.toContain("spam.ru");
  });
});
