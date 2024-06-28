import Footer from "../components/Footer";
import Header from "../components/Header";
import List from "../components/Liste";
import MarquesBanner from "../components/sponsors/MarquesBanner";

export default function MarketPlacePage() {
  type ListItem = {
    id: number;
    brandName: string;
    sport: string;
    athleteCount: number;
  };
  
  const firstListTitle = 'Liste des marques';
  const secondListTitle = 'Liste des marques';

  const items: ListItem[] = [
    { id: 1, brandName: 'Nike', sport: 'Running', athleteCount: 120 },
    { id: 2, brandName: 'Adidas', sport: 'Football', athleteCount: 200 },
    { id: 3, brandName: 'Puma', sport: 'Basketball', athleteCount: 150 },
  ];
  const columnTitles = {
    brandName: 'Nom de la marque',
    sport: 'Sport',
    athleteCount: 'Nombre d\'athlètes'
  };
  
  return (
    <>
      <Header/>
      <MarquesBanner/>
      <List title={firstListTitle} items={items} columnTitles={columnTitles}/>
      <List title={secondListTitle} items={items} columnTitles={columnTitles}/>
      <Footer/>
    </>
  );
};
