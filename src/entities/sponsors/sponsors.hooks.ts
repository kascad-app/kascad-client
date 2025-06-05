
import { Rider, Sponsor } from "@kascad-app/shared-types";
import useSWR from "swr";
import { requester } from "@/lib/requester/requester";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";

export function useGetSponsors() {
    return useSWR<Sponsor[]>(SWR_KEY.SPONSORS, () =>
        requester().get<Sponsor[]>(SWR_KEY.SPONSORS.SPONSORS)
    );
}

export function useGetSponsor(companyName: string) {
    return useSWR<Sponsor>(SWR_KEY.SPONSORS.SPONSOR(companyName), () =>
        requester().get<Sponsor>(SWR_KEY.SPONSORS.SPONSOR(companyName)),
    );
}
