import { FrappeApp } from "frappe-js-sdk";

export const frappeClient = new FrappeApp(process.env.ERPNEXT_URL, {
  useToken: true,
  token: () => `${process.env.ERPNEXT_KEY}:${process.env.ERPNEXT_SECRET}`,
  type: "token",
});
export const frappeDB = frappeClient.db();
