import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PurchaseHistory from "./PurchaseHistory";
import * as purchaseService from "../services/purchaseService";

vi.mock("../services/purchaseService");

describe("PurchaseHistory", () => {
  it("renders loading state initially", () => {
    vi.mocked(purchaseService.getPurchases).mockReturnValue(new Promise(() => {}));
    render(<PurchaseHistory />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    vi.mocked(purchaseService.getPurchases).mockRejectedValue(new Error("fail"));
    render(<PurchaseHistory />);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Failed to load purchase history.")).toBeInTheDocument();
    });
  });

  it("renders empty state when no purchases", async () => {
    vi.mocked(purchaseService.getPurchases).mockResolvedValue({ success: true, purchases: [] });
    render(<PurchaseHistory />);
    await waitFor(() => {
      expect(screen.getByText("No purchases found.")).toBeInTheDocument();
    });
  });

  it("renders a list of purchases", async () => {
    vi.mocked(purchaseService.getPurchases).mockResolvedValue({
      success: true,
      purchases: [
        {
          _id: "1",
          user: { _id: "u1", name: "Alice", email: "alice@example.com" },
          vehicle: { make: "Honda", model: "Civic", category: "Sedan", price: 2000000 },
          quantity: 2,
          totalPrice: 4000000,
          createdAt: "2026-07-30T10:00:00Z",
        },
      ],
    });

    render(<PurchaseHistory />);
    
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      expect(screen.getByText("Honda Civic")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText(/40,00,000/)).toBeInTheDocument();
    });
  });
});
