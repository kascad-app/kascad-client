import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import List from "../components/Liste";
import MarquesBanner from "../components/sponsors/MarquesBanner";

export default function MarketPlacePage() {

  const items = [
    { id: 1, brandName: 'Salomon', sport: 'Football', athleteCount: 20 },
    { id: 2, brandName: 'Red Bull', sport: 'Basketball', athleteCount: 15 },
    { id: 3, brandName: 'Billabong', sport: 'Surfing', athleteCount: 10 },
  ];
  
  const columns = [
    { title: 'Brand Name', key: 'brandName' as keyof typeof items[0] },
    { title: 'Sport', key: 'sport' as keyof typeof items[0] },
    { title: 'Athlete Count', key: 'athleteCount' as keyof typeof items[0] },
  ];

  const firstListTitle = 'Liste des marques';
  const secondListTitle = 'Liste des marques';
  
  return (
    <>
      <Header/>
      <Layout/>
      <MarquesBanner/>
      <div className="px-24 py-12"> 
        <List title={firstListTitle} items={items} columns={columns}/>
        <List title={secondListTitle} items={items} columns={columns}/>
      </div>
      <Footer/>
    </>
  );
};
