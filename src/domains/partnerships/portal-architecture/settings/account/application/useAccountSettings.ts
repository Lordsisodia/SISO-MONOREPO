import { accountContactFields, twoFactorActions } from "../domain";

export function useAccountSettings() {
  return {
    contactFields: accountContactFields,
    twoFactorActions,
    hero: {
      username: "@SISOagency",
      accountId: "01JV0EY9FHYKJ08PNC5BMHTJBT",
    },
  };
}
