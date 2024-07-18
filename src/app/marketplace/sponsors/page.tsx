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

  const listLastResultItems: ListItem[] = [
    {
      id: 1,
      date: "1",
      event: "Redbull",
      categorie: "Multi-sport",
      top: "120",
    },
    { id: 2, date: "2", event: "Adidas", categorie: "Football", top: "200" },
    { id: 3, date: "3", event: "Puma", categorie: "Basketball", top: "150" },
  ];

  const listAllResultItems: ListItem[] = [
    { id: 4, date: "4", event: "Reebok", categorie: "Fitness", top: "180" },
    {
      id: 5,
      date: "5",
      event: "Under Armour",
      categorie: "Training",
      top: "170",
    },
    { id: 6, date: "6", event: "Asics", categorie: "Running", top: "160" },
    {
      id: 7,
      date: "7",
      event: "New Balance",
      categorie: "Running",
      top: "150",
    },
    { id: 8, date: "8", event: "Columbia", categorie: "Outdoor", top: "140" },
    { id: 9, date: "9", event: "Saucony", categorie: "Running", top: "130" },
    { id: 10, date: "10", event: "Mizuno", categorie: "Running", top: "120" },
    { id: 11, date: "11", event: "Salomon", categorie: "Outdoor", top: "110" },
    { id: 12, date: "12", event: "Merrell", categorie: "Outdoor", top: "100" },
    { id: 13, date: "13", event: "Brooks", categorie: "Running", top: "90" },
    { id: 14, date: "14", event: "Skechers", categorie: "Casual", top: "80" },
    {
      id: 15,
      date: "15",
      event: "Hoka One One",
      categorie: "Running",
      top: "70",
    },
    { id: 16, date: "16", event: "Fila", categorie: "Tennis", top: "60" },
    { id: 17, date: "17", event: "Converse", categorie: "Casual", top: "50" },
    {
      id: 18,
      date: "18",
      event: "Vans",
      categorie: "Skateboarding",
      top: "40",
    },
    {
      id: 19,
      date: "19",
      event: "DC Shoes",
      categorie: "Skateboarding",
      top: "30",
    },
    {
      id: 20,
      date: "20",
      event: "Timberland",
      categorie: "Outdoor",
      top: "20",
    },
    {
      id: 21,
      date: "21",
      event: "North Face",
      categorie: "Outdoor",
      top: "10",
    },
    {
      id: 22,
      date: "22",
      event: "Patagonia",
      categorie: "Outdoor",
      top: "200",
    },
    { id: 23, date: "23", event: "Lululemon", categorie: "Yoga", top: "190" },
    {
      id: 24,
      date: "24",
      event: "Arc'teryx",
      categorie: "Outdoor",
      top: "180",
    },
    {
      id: 25,
      date: "25",
      event: "La Sportiva",
      categorie: "Climbing",
      top: "170",
    },
    {
      id: 26,
      date: "26",
      event: "Inov-8",
      categorie: "Trail Running",
      top: "160",
    },
    { id: 27, date: "27", event: "Keen", categorie: "Outdoor", top: "150" },
    { id: 28, date: "28", event: "Altra", categorie: "Running", top: "140" },
    {
      id: 29,
      date: "29",
      event: "On Running",
      categorie: "Running",
      top: "130",
    },
    {
      id: 30,
      date: "30",
      event: "Topo Athletic",
      categorie: "Running",
      top: "120",
    },
    { id: 31, date: "31", event: "Hoka", categorie: "Running", top: "110" },
    { id: 32, date: "32", event: "Karhu", categorie: "Running", top: "100" },
    { id: 33, date: "33", event: "Newton", categorie: "Running", top: "90" },
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
      <Layout />
      <MarquesBanner />
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
          threshold={3}
        />
      </div>
      <Footer />
    </>
  );
}
