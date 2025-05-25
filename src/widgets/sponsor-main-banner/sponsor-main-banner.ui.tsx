import { SponsorBannerTypes } from "@/entities/sponsor-banner";

export const MainBanner = ({
  banner,
}: {
  banner: SponsorBannerTypes.Banner;
}) => {
  return (
    <div
      className="rounded-lg relative h-64 bg-cover bg-center flex items-center p-4"
      style={{ backgroundImage: `url(${banner.img})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-white to-transparent"></div>
      <img
        src={`/${banner.logo}`}
        alt={`${banner.name} logo`}
        className="absolute top-10 left-10 z-10 h-16"
      />
    </div>
  );
};
