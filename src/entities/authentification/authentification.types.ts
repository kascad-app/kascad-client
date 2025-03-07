import { APIResponse, Rider } from "@kascad-app/shared-types";
import { KeyedMutator } from "swr";
import { APIAuthentication, apiAuthentication } from "./authentification.api";

export type Session = {
  mutate: KeyedMutator<APIResponse<Rider>>;
} & (SignedOutSession | SignedInSession);

export type SignedInSession = {
  loggedIn: true;
  user: Rider;
  loading: boolean;
  validating: boolean;
  signOut: () => Promise<void>;
};

export type SignedOutSession = {
  loggedIn: false;
  user: undefined;
  loading: boolean;
};

type APIType = {
  auth: APIAuthentication;
};

export const API: APIType = {
  auth: apiAuthentication,
};
