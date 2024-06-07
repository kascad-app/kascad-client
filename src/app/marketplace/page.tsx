import MarketStyles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { Michroma } from "next/font/google";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
});

export default function MarketPlacePage() {
  return (
    <Layout>
      <div className={MarketStyles.marketContainer}>
        <div className={MarketStyles.welcomePanel}>
          <p>4 Juin 2024</p>
          <b>Bonjour Candide</b>
        </div>
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
              <div className={MarketStyles.carouselCardsWrapper}>
                {/* Card */}
                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Salomon-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                {/* Card  */}
                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Redbull-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                {/* Card  */}
                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Coqsportif-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                {/* Card  */}
                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Coqsportif-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Coqsportif-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Coqsportif-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Coqsportif-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>

                <div className={MarketStyles.card}>
                  <img
                    className={MarketStyles.cardBrandLogo}
                    src="Coqsportif-logo.svg"
                  />
                  <div className={MarketStyles.cardActionMenu}>
                    <img
                      className={MarketStyles.contactLogo}
                      src="contact.svg"
                    />
                    <img className={MarketStyles.saveLogo} src="save.svg" />
                  </div>
                </div>
                {/* End Card  */}
              </div>
            </div>
          </div>
        </div>
        <div className={MarketStyles.secondSection}>
          <div className={MarketStyles.universContainer}>
            <h3 className={MarketStyles.sectionCardTitle}>
              Dans leurs univers
            </h3>
            <div className={MarketStyles.categoryContainer}>
              <div
                className={`${MarketStyles.categoryCard} ${MarketStyles.bgBike}`}
              >
                <div className={MarketStyles.filterCategoryCard}>
                  <p className={MarketStyles.categoryTitle}>Aerien</p>
                </div>
              </div>
              <div
                className={`${MarketStyles.categoryCard} ${MarketStyles.bgSkate}`}
              >
                <div className={MarketStyles.filterCategoryCard}>
                  <p className={MarketStyles.categoryTitle}>Terrestre</p>
                </div>
              </div>
              <div
                className={`${MarketStyles.categoryCard} ${MarketStyles.bgSnow}`}
              >
                <div className={MarketStyles.filterCategoryCard}>
                  <p className={MarketStyles.categoryTitle}>Montagneux</p>
                </div>
              </div>
              <div
                className={`${MarketStyles.categoryCard} ${MarketStyles.bgKanoe}`}
              >
                <div className={MarketStyles.filterCategoryCard}>
                  <p className={MarketStyles.categoryTitle}>Aquatique</p>
                </div>
              </div>
            </div>
          </div>
          <div className={MarketStyles.favoriteContainer}>
            <h3 className={MarketStyles.sectionCardTitle}>
              Les plus appréciés
            </h3>
            {/* <div className={MarketStyles.newCardContainer}></div> */}
          </div>
        </div>
        <div className={MarketStyles.thirdSection}>
          <h2
            className={`${michroma.className} ${MarketStyles.thirdSectionTitle}`}
          >
            Nos sponsors
          </h2>
          <span className={MarketStyles.separator}></span>
        </div>
      </div>
      {/* <p className={MarketStyles.main}>Hello Marketplace</p>

      <p>Good Hacking</p> */}
    </Layout>
  );
}
