import { APIResponse, UnknowProfile } from "@kascad-app/shared-types";
import { KeyedMutator } from "swr";

export type Session = {
  mutate: KeyedMutator<APIResponse<UnknowProfile>>;
} & (SignedOutSession | SignedInSession);

export type SignedInSession = {
  loggedIn: true;
  user: UnknowProfile;
  loading: boolean;
  validating: boolean;
  signOut: () => Promise<void>;
};

export type SignedOutSession = {
  loggedIn: false;
  user: undefined;
  loading: boolean;
};
