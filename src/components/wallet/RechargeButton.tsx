"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function RechargeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRecharge = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // In production, this would integrate with a payment gateway
    alert("Payment gateway integration will be implemented here");
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleRecharge}
      className="w-full bg-white/10 hover:bg-white/20"
      isLoading={isLoading}
    >
      Recharge Wallet
    </Button>
  );
}