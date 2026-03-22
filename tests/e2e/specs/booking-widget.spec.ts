import { test, expect } from "@playwright/test";
import { loadSiteTypeConfig } from "../fixtures/site-type";

const config = loadSiteTypeConfig();

test.describe("Booking Widget", () => {
  test.skip(!config.hasBookingWidget, "Site type is not booking");

  test("home page has booking link or widget", async ({ page }) => {
    await page.goto("/");
    const bookingLink = page.locator('a[href*="calendly"], a[href*="booking"], a[href*="schedule"], [data-booking]');
    const bookingWidget = page.locator('iframe[src*="calendly"], iframe[src*="booking"], [class*="booking"]');
    const hasLink = await bookingLink.count() > 0;
    const hasWidget = await bookingWidget.count() > 0;
    expect(hasLink || hasWidget, "No booking link or widget found").toBe(true);
  });
});
