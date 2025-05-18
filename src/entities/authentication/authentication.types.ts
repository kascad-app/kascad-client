import { KeyedMutator } from "swr";

import { Rider } from "@kascad-app/shared-types";
export type Session = {
  mutate: KeyedMutator<Rider>;
} & (SignedOutSession | SignedInSession);

export type SignedInSession = {
  loggedIn: true;
  user: Rider;
  loading: boolean;
  validating: boolean;
};

export type SignedOutSession = {
  loggedIn: false;
  user: undefined;
  loading: boolean;
};
