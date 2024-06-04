import MarketStyles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

export default function MarketPlacePage() {
  return (
    <Layout>
      <div className={MarketStyles.marketContainer}>
        <div className={MarketStyles.newSponsorContainer}>
          <h3 className={MarketStyles.sectionCardTitle}>
            Ils nous ont récemment rejoint
          </h3>
          <div className={MarketStyles.newCardContainer}>
            <img
              className={MarketStyles.logoKascad}
              src="logo-kascad-big.svg"
            />
            <div className={MarketStyles.carouselCards}>
              {/* Card */}
              <div className={MarketStyles.card}>
                <div></div>
                <img
                  className={MarketStyles.cardBrandLogo}
                  src="Salomon-logo.svg"
                />
                <div className={MarketStyles.cardActionMenu}>
                  <img className={MarketStyles.contactLogo} src="contact.svg" />
                  <img className={MarketStyles.saveLogo} src="save.svg" />
                </div>
              </div>

              {/* Card  */}
              <div className={MarketStyles.card}>
                <div></div>
                <img
                  className={MarketStyles.cardBrandLogo}
                  src="Redbull-logo.svg"
                />
                <div className={MarketStyles.cardActionMenu}>
                  <img className={MarketStyles.contactLogo} src="contact.svg" />
                  <img className={MarketStyles.saveLogo} src="save.svg" />
                </div>
              </div>

              {/* Card  */}
              <div className={MarketStyles.card}>
                <div></div>
                <img
                  className={MarketStyles.cardBrandLogo}
                  src="Coqsportif-logo.svg"
                />
                <div className={MarketStyles.cardActionMenu}>
                  <img className={MarketStyles.contactLogo} src="contact.svg" />
                  <img className={MarketStyles.saveLogo} src="save.svg" />
                </div>
              </div>
              {/* End Card  */}
            </div>
          </div>
        </div>
      </div>
      {/* <p className={MarketStyles.main}>Hello Marketplace</p>

      <p>Good Hacking</p> */}
    </Layout>
  );
}
