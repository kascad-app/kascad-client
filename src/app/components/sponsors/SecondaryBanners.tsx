import { Banner } from "./type";

const SecondaryBanners = ({ banners }: { banners: Banner[] }) => {
    return (
      <div className="relative h-64">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-x-0 transition-transform duration-1000 ${index === 0 ? 'top-20' : 'top-40'}`}
            style={{ zIndex: 2 + index }}
          >
            <div className="rounded-lg relative h-36 bg-cover bg-center flex items-center p-4" style={{ backgroundImage: `url(${banner.img})` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SecondaryBanners;
  