"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";

import List from "../components/liste";
import MarquesBanner from "../components/sponsors/MarquesBanner";

import API from "@/services/api";
import useSession from "@hooks/use-session";
import { ProfileType } from "@kascad-app/shared-types";

export default function MarketPlacePage() {
  const session = useSession();
  type ListItem = {
    id: number;
    date: string;
    event: string;
    categorie: string;
    top: string;
  };

  type Column<T> = {
    title: string;
    key: keyof T;
  };

  const items: ListItem[] = [
    { id: 1, date: "1", event: "Nike", categorie: "Running", top: "120" },
    { id: 2, date: "2", event: "Adidas", categorie: "Football", top: "200" },
    { id: 3, date: "3", event: "Puma", categorie: "Basketball", top: "150" },
  ];
  const columnTitles: Column<ListItem>[] = [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Evenements",
      key: "event",
    },
    {
      title: "Catégorie",
      key: "categorie",
    },
    {
      title: "Classement",
      key: "top",
    },
  ];

  const firstListTitle: string = "Derniers résultat";
  const secondListTitle: string = "Classement général";

  return (
    <>
      <Header identity={session.user?.identity} />
      <MarquesBanner />
      <List title={firstListTitle} items={items} columns={columnTitles} />
      <List title={secondListTitle} items={items} columns={columnTitles} />
      <Footer />
    </>
  );
}
