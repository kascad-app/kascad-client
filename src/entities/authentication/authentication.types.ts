import { KeyedMutator } from "swr";

import { RiderMe } from "@kascad-app/shared-types";
export type Session = {
  mutate: KeyedMutator<RiderMe>;
} & (SignedOutSession | SignedInSession);

export type SignedInSession = {
  loggedIn: true;
  user: RiderMe;
  loading: boolean;
  validating: boolean;
};

export type SignedOutSession = {
  loggedIn: false;
  user: undefined;
  loading: boolean;
};
