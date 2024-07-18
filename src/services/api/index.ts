import apiAuthentication, { APIAuthentication } from "./auth";

type APIType = {
  auth: APIAuthentication;
};

const API: APIType = {
  auth: apiAuthentication,
};

export default API;
