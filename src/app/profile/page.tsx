"use client";

import ProfileStyles from "./page.module.css";
import Layout from "../components/Layout";

export default function ProfilePage() {
  return (
    <Layout>

      <div className={ProfileStyles.profile}>
        <div className={ProfileStyles.profile_card}>
          <div className={ProfileStyles.profile_image}></div>
          <div className={ProfileStyles.profile_infos}>
            <div className={ProfileStyles.profile_infos_name}>Fabio Courquin</div>
            <div className={ProfileStyles.profile_infos_age}>22 ans</div>
            <div className={ProfileStyles.profile_infos_location}>
              <p>Colmar, fr</p>
            </div>
            <div className={ProfileStyles.profile_desc}>Au fil des années, j'ai participé à de nombreux événements locaux et régionaux, me hissant régulièrement sur le podium grâce à ma détermination et à mon travail acharné.</div>
          </div>
          <div className={ProfileStyles.profile_contact}>
            <div className={ProfileStyles.profile_contact_title}>Contact</div>
            <div className={ProfileStyles.profile_contact_email}>
              <p>arthurleperriel@gmail.com</p>
            </div>
            <div className={ProfileStyles.profile_contact_rs}>@alulu</div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
