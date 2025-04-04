"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/shared/api/use-session";

export default function Page() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.loggedIn) {
      if (session.user.type == "rider") {
        router.push("/marketplace/riders");
      } else {
        router.push("/marketplace/sponsors");
      }
    } else {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <svg
        width="100"
        height="100"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-draw"
      >
        <rect
          x="3"
          y="3"
          width="494"
          height="494"
          rx="29"
          fill="transparent"
          stroke="black"
          strokeWidth="6"
        />
        <path
          d="M280.214 226.634L322.136 179.668C322.515 179.243 323.058 179 323.628 179H335.583C337.326 179 338.235 181.075 337.053 182.356L296.14 226.694C294.07 228.937 293.457 232.162 294.559 235.008L325.249 314.278C325.757 315.589 324.789 317 323.384 317H284.937C284.065 317 283.293 316.434 283.03 315.602L269.912 274.053C267.435 266.211 256.159 266.76 254.456 274.805L245.86 315.414C245.664 316.339 244.848 317 243.903 317H205.176C203.904 317 202.955 315.828 203.22 314.584L231.689 180.81C231.885 179.887 232.701 179.226 233.645 179.226H272.596C273.869 179.226 274.818 180.4 274.552 181.645L266.423 219.632C264.706 227.66 274.748 232.758 280.214 226.634Z"
          stroke="black"
          strokeWidth="6"
          fill="#F3F4F6"
        />
        <path
          d="M147.839 276.5L153.839 251C151.039 271.4 161.006 289.833 166.339 296.5L171.839 270.5C170.639 286.1 179.672 303.333 184.339 310L211.339 183C196.139 191 187.006 206.667 184.339 213.5L189.839 186C171.839 194.4 162.006 214.5 159.339 223.5L164.839 199C159.172 199.667 146.139 207.2 139.339 232C132.539 256.8 142.172 272 147.839 276.5Z"
          stroke="black"
          strokeWidth="6"
          fill="#F3F4F6"
        />
      </svg>
    </div>
  );
}
