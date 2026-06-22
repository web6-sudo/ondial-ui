"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  buildCountryPricingView,
  DEFAULT_PRICING_COUNTRY_ID,
  detectDefaultPricingCountryId,
  isPricingCountryId,
  type CountryPricingView,
  type PricingCountryId,
} from "@/data/pricing-by-country";

const STORAGE_KEY = "ondial-pricing-country";

type PricingCountryContextValue = CountryPricingView & {
  countryId: PricingCountryId;
  setCountryId: (countryId: PricingCountryId) => void;
};

const PricingCountryContext = createContext<PricingCountryContextValue | null>(null);

export function PricingCountryProvider({ children }: { children: ReactNode }) {
  const [countryId, setCountryIdState] = useState<PricingCountryId>(DEFAULT_PRICING_COUNTRY_ID);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored && isPricingCountryId(stored)) {
      setCountryIdState(stored);
      return;
    }

    setCountryIdState(detectDefaultPricingCountryId());
  }, []);

  const setCountryId = useCallback((nextCountryId: PricingCountryId) => {
    setCountryIdState(nextCountryId);
    window.localStorage.setItem(STORAGE_KEY, nextCountryId);
  }, []);

  const pricingView = useMemo(() => buildCountryPricingView(countryId), [countryId]);

  const value = useMemo(
    () => ({
      countryId,
      ...pricingView,
      setCountryId,
    }),
    [countryId, pricingView, setCountryId],
  );

  return (
    <PricingCountryContext.Provider value={value}>{children}</PricingCountryContext.Provider>
  );
}

export function usePricingCountry() {
  const context = useContext(PricingCountryContext);

  if (!context) {
    throw new Error("usePricingCountry must be used within PricingCountryProvider");
  }

  return context;
}
