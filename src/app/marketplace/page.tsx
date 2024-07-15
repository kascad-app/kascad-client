import Footer from "../components/Footer";
import Header from "../components/Header";

import List from "../components/liste";
import MarquesBanner from "../components/sponsors/MarquesBanner";

export default function MarketPlacePage() {
  type ListItem = {
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
    { date: "1", event: "Nike", categorie: "Running", top: "120" },
    { date: "2", event: "Adidas", categorie: "Football", top: "200" },
    { date: "3", event: "Puma", categorie: "Basketball", top: "150" },
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

  return (
    <>
      <Header />
      <MarquesBanner />
      <List title={firstListTitle} items={items} columnTitles={columnTitles} />
      <List title={secondListTitle} items={items} columnTitles={columnTitles} />
      <Footer />
    </>
  );
}
