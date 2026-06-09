import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

// Campaign params worth carrying from a paid landing URL into the cal.com
// booking link, so a booked call can be attributed back to the ad that paid
// for it. cal.com stores unknown query params with the booking; the click ids
// (gclid/li_fat_id/msclkid) also let offline-conversion uploads close the loop.
const FORWARDED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "li_fat_id",
  "msclkid",
] as const;

/**
 * profile.calendarUrl with the current page's campaign params appended, plus a
 * stable `ref` naming the CTA placement. SSR/first paint renders the bare
 * calendar URL (matching the prerendered HTML); params attach after hydration.
 */
export function useCalendarUrlWithCampaignParams(refTag: string): string {
  const [url, setUrl] = useState(profile.calendarUrl);
  useEffect(() => {
    try {
      const pageParams = new URLSearchParams(window.location.search);
      const target = new URL(profile.calendarUrl);
      for (const key of FORWARDED_PARAMS) {
        const value = pageParams.get(key);
        if (value) target.searchParams.set(key, value);
      }
      target.searchParams.set("ref", refTag);
      setUrl(target.toString());
    } catch {
      // Malformed location/search — keep the bare calendar URL.
    }
  }, [refTag]);
  return url;
}
