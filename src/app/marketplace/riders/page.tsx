"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Layout from "@/app/components/Layout";
import List from "@/app/components/liste";
import MarquesBanner from "@/app/components/sponsors/MarquesBanner";
import API from "@/services/api";
import { Session } from "@/types/auth";
import useSession from "@hooks/use-session";
import { ProfileType } from "@kascad-app/shared-types";

export default function MarketPlacePage() {
  const session: Session = useSession();
  type ListItem = {
    profilePhoto: string;
    id: number;
    firstName: string;
    lastName: string;
    nationality: string;
    discipline: string;
    age: number;
  };

  type Column<T> = {
    title: string;
    key: keyof T;
  };

  const listLastResultItems: ListItem[] = [
    {
      id: 1,
      firstName: "Jamie",
      lastName: "Anderson",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmTn8cxPVb0I_-ksC9a45H6G5XQs49rVZ-A&s",
      age: 29,
    },
    {
      id: 2,
      firstName: "Ayumu",
      lastName: "Hirano",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Ayumu_Hirano.jpg",
      age: 25,
    },
    {
      id: 3,
      firstName: "Red",
      lastName: "Gerard",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://usskiandsnowboard.org/sites/default/files/styles/athlete_headshot_node/public/images/athletes/head-shots/2024-02/Red%20Gerard_Quicksilver%20%281%29.jpg?itok=q8P5fAbOg",
      age: 24,
    },
  ];

  const listAllResultItems: ListItem[] = [
    {
      id: 1,
      firstName: "Jamie",
      lastName: "Anderson",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmTn8cxPVb0I_-ksC9a45H6G5XQs49rVZ-A&s",
      age: 29,
    },
    {
      id: 2,
      firstName: "Ayumu",
      lastName: "Hirano",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Ayumu_Hirano.jpg",
      age: 25,
    },
    {
      id: 3,
      firstName: "Red",
      lastName: "Gerard",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://usskiandsnowboard.org/sites/default/files/styles/athlete_headshot_node/public/images/athletes/head-shots/2024-02/Red%20Gerard_Quicksilver%20%281%29.jpg?itok=q8P5fAbOg",
      age: 24,
    },
    {
      id: 4,
      firstName: "Chloe",
      lastName: "Kim",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkoMcYNJabqRtdZMdzObUuweyrWx-mJXuOw&s",
      age: 23,
    },
    {
      id: 5,
      firstName: "Marcus",
      lastName: "Kleveland",
      nationality: "Norwegian",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Marcus_Kleveland_2017.jpg",
      age: 24,
    },
    {
      id: 6,
      firstName: "Anna",
      lastName: "Gasser",
      nationality: "Austrian",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Anna_Gasser_FIS_World_Cup_Cardrona_2013.jpg",
      age: 30,
    },
    {
      id: 7,
      firstName: "Henrik",
      lastName: "Harlaut",
      nationality: "Swedish",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Henrik_Harlaut_-_Team_Sweden_2012.jpg",
      age: 32,
    },
    {
      id: 8,
      firstName: "Kelly",
      lastName: "Sildaru",
      nationality: "Estonian",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Kelly_Sildaru_March_2020.jpg",
      age: 21,
    },
    {
      id: 9,
      firstName: "Eileen",
      lastName: "Gu",
      nationality: "Chinese",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Eileen_Gu_2020.jpg",
      age: 20,
    },
    {
      id: 10,
      firstName: "David",
      lastName: "Wise",
      nationality: "American",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/5/50/David_Wise_-_Team_USA_2014.jpg",
      age: 33,
    },
    {
      id: 11,
      firstName: "Sage",
      lastName: "Kotsenburg",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/f/f9/Sage_Kotsenburg_Sochi_2014.jpg",
      age: 30,
    },
    {
      id: 12,
      firstName: "Nick",
      lastName: "Goepper",
      nationality: "American",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Nick_Goepper_Sochi_2014.jpg",
      age: 29,
    },
    {
      id: 13,
      firstName: "Tess",
      lastName: "Ledeux",
      nationality: "French",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Tess_Ledeux_-_FIS_Freestyle_skiing_World_Cup_%C3%89trembi%C3%A8res_2019.jpg",
      age: 22,
    },
    {
      id: 14,
      firstName: "Fabian",
      lastName: "Bösch",
      nationality: "Swiss",
      discipline: "Freestyle Skiing",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Fabian_Bosch_SUI_Men%27s_Big_Air_at_the_2018_Winter_Olympics.jpg",
      age: 27,
    },
    {
      id: 15,
      firstName: "Zoi",
      lastName: "Sadowski-Synnott",
      nationality: "New Zealander",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/f/fc/Zoi_Sadowski-Synnott.jpg",
      age: 23,
    },
    {
      id: 16,
      firstName: "Max",
      lastName: "Parrot",
      nationality: "Canadian",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Max_Parrot_2018.jpg",
      age: 30,
    },
    {
      id: 17,
      firstName: "Scotty",
      lastName: "James",
      nationality: "Australian",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/Scotty_James_in_January_2019.jpg",
      age: 29,
    },
    {
      id: 18,
      firstName: "Yuto",
      lastName: "Totsuka",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Yuto_Totsuka_in_2019.jpg",
      age: 23,
    },
    {
      id: 19,
      firstName: "Ruka",
      lastName: "Hirano",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/9/90/Ruka_Hirano_2020.jpg",
      age: 22,
    },
    {
      id: 20,
      firstName: "Hailey",
      lastName: "Langland",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hailey_Langland.jpg",
      age: 23,
    },
    {
      id: 21,
      firstName: "Julia",
      lastName: "Marino",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Julia_Marino.jpg",
      age: 25,
    },
    {
      id: 22,
      firstName: "Dusty",
      lastName: "Henricksen",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Dusty_Henricksen.jpg",
      age: 20,
    },
    {
      id: 23,
      firstName: "Lindsey",
      lastName: "Jacobellis",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/8/87/Lindsey_Jacobellis_2019.jpg",
      age: 38,
    },
    {
      id: 24,
      firstName: "Maddie",
      lastName: "Mastro",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/d/d8/Maddie_Mastro.jpg",
      age: 23,
    },
    {
      id: 25,
      firstName: "Takeru",
      lastName: "Otsuka",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Takeru_Otsuka.jpg",
      age: 22,
    },
    {
      id: 26,
      firstName: "Hiroaki",
      lastName: "Kunitake",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Hiroaki_Kunitake.jpg",
      age: 22,
    },
    {
      id: 27,
      firstName: "Senna",
      lastName: "Leith",
      nationality: "American",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Senna_Leith.jpg",
      age: 25,
    },
    {
      id: 28,
      firstName: "Sena",
      lastName: "Tomita",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Sena_Tomita.jpg",
      age: 23,
    },
    {
      id: 29,
      firstName: "Reira",
      lastName: "Iwabuchi",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/3/31/Reira_Iwabuchi.jpg",
      age: 22,
    },
    {
      id: 30,
      firstName: "Miyabi",
      lastName: "Onitsuka",
      nationality: "Japanese",
      discipline: "Snowboarding",
      profilePhoto:
        "https://upload.wikimedia.org/wikipedia/commons/8/81/Miyabi_Onitsuka.jpg",
      age: 25,
    },
  ];

  const columnTitles: Column<ListItem>[] = [
    {
      title: "Photo de Profil",
      key: "profilePhoto",
    },
    {
      title: "Nom",
      key: "lastName",
    },
    {
      title: "Prénom",
      key: "firstName",
    },
    {
      title: "Nationalité",
      key: "nationality",
    },
    {
      title: "Discipline",
      key: "discipline",
    },

    {
      title: "Âge",
      key: "age",
    },
  ];

  const firstListTitle: string = "Derniers résultats des sportifs";
  const secondListTitle: string = "Classement général des sportifs";

  return (
    <>
      <Header identity={session.user?.identity} />
      <Layout />
      <div className="px-24 py-7">
        <List
          title={firstListTitle}
          items={listLastResultItems}
          columns={columnTitles}
        />
        <List
          title={secondListTitle}
          items={listAllResultItems}
          columns={columnTitles}
          growing={true}
        />
      </div>
      <Footer />
    </>
  );
}
