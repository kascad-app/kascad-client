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
          <h3>Ils nous ont récemment rejoint</h3>
          <div className={MarketStyles.newCardContainer}>
            <img
              className={MarketStyles.logoKascad}
              src="logo-kascad-big.svg"
            />
          </div>
        </div>
      </div>
      {/* <p className={MarketStyles.main}>Hello Marketplace</p>

      <p>Good Hacking</p> */}
    </Layout>
  );
}
