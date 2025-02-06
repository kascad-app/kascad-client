// Here all hooks and API call expected to Riders
import { Rider } from "@kascad-app/shared-types";
import { Requester } from "@/shared/lib/requester";

export const updateProfile = async (idRider: string, data: Rider) => {
  Requester.requester().put<Rider>(`/riders/${idRider}`, { data });
};
