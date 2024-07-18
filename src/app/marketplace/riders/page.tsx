"use client";

import { useEffect, useState } from 'react';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Layout from "@/app/components/Layout";
import List from "@/app/components/Liste";
import MarquesBanner from "@/app/components/sponsors/MarquesBanner";

export default function MarketPlacePage() {
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

  const [listLastResultItems, setListLastResultItems] = useState<ListItem[]>([]);
  const [listAllResultItems, setListAllResultItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const response = await fetch('/datas/riders.json');
      const data = await response.json();
      const riders = data.riders.map((rider: any) => ({
        profilePhoto: rider.profilePhoto,
        id: rider.id,
        firstName: rider.firstName,
        lastName: rider.lastName,
        nationality: rider.nationality,
        discipline: rider.disciplines.join(', '),
        age: rider.age,
      }));
      setListLastResultItems(riders.slice(0, 3));  // Display only the last 3 results
      setListAllResultItems(riders);  // Display all results
    };

    fetchRiders();
  }, []);

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
      <Header />
      <Layout />
      <div className="px-24 py-7">
        <List title={firstListTitle} items={listLastResultItems} columns={columnTitles} />
        <List title={secondListTitle} items={listAllResultItems} columns={columnTitles} growing={true}/>
      </div>
      <Footer />
    </>
  );
}
