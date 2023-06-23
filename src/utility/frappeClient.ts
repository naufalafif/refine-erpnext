import { FrappeApp } from "frappe-js-sdk";

/*
 * Frappe Server Client
 * no additional authentication process required
 */
export const frappeServerClient = new FrappeApp(
  process.env.NEXT_PUBLIC_ERPNEXT_URL,
  {
    useToken: true,
    token: () => `${process.env.ERPNEXT_KEY}:${process.env.ERPNEXT_SECRET}`,
    type: "token",
  }
);
export const frappeServerDB = frappeServerClient.db();

/*
 * Frappe Client
 * require auth to be called using username & password with frappeClient.auth().loginWithUsernamePassword
 * authentication process done on refine-auth-provider at authProvider.ts
 */
export const frappeClient = new FrappeApp(process.env.NEXT_PUBLIC_ERPNEXT_URL);
export const frappeDB = frappeClient.db();
