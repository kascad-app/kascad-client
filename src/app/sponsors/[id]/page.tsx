'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SponsorStyles from './page.module.css';
import Footer from '@/app/components/Footer';
import Layout from '@/app/components/Layout';

gsap.registerPlugin(ScrollTrigger);

type ListItem = {
  id: number;
  brandName: string;
  sport: string;
  athleteCount: number;
};

const Detail: React.FC = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [item, setItem] = useState<ListItem | null>(null);
  const OpacityAnimRef = useRef<HTMLDivElement[]>([]);
  const StickyAnimRef = useRef<HTMLDivElement[]>([]);
  const StickyOpacityAnimRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (id) {
      const items: ListItem[] = [
        { id: 1, brandName: 'Red Bull', sport: 'Running', athleteCount: 120 },
        { id: 2, brandName: 'Adidas', sport: 'Football', athleteCount: 200 },
        { id: 3, brandName: 'Puma', sport: 'Basketball', athleteCount: 150 },
      ];
      const currentItem = items.find((item) => item.id === Number(id));
      if (currentItem) {
        setItem(currentItem);
      }
    }
  }, [id]);

  useEffect(() => {
    StickyOpacityAnimRef.current.forEach((el) => {
      if (el) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top+=650 70%',
            end: 'bottom+=100 center-=200',
            toggleActions: 'play none reverse none',
            scrub: 1,
            pin: true
          },
        });
        tl.to(el, { opacity: 0 });
      }
    });
  }, [item]);

  if (!item) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="w-full md:w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative">
          <img
            src={`https://www.zukunftsinstitut.de/hubfs/Imported_Blog_Media/04_Redbullisierung_Flickr_Jim_Bauer_CC-BY-ND_thu.jpg`}
            alt={item.brandName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/100 to-transparent pointer-events-none"></div>
          <h1 className="text-2xl font-semibold mb-4 absolute top-32 left-32">{item.brandName}</h1>
        </div>
        <div className="w-full mt-8 md:w-full md:flex md:justify-between md:ps-24 md:pe-24">
          <p className="text-lg mb-2">
            <strong>Sport:</strong> {item.sport}
          </p>
          <p className="text-lg">
            <strong>Nombre de sportifs adhérents:</strong> {item.athleteCount}
          </p>
        </div>
        <p className={SponsorStyles.sponsor_desc}>
          Depuis sa création en 1987, Red Bull est devenu bien plus qu'une simple marque de boisson énergétique. Avec une
          présence mondiale et une passion inébranlable pour le sport, Red Bull est synonyme d'innovation, d'aventure et de
          dépassement de soi. Que vous soyez un athlète professionnel ou un amateur ambitieux, Red Bull est là pour vous
          propulser vers de nouveaux sommets.
        </p>
        <div className={SponsorStyles.sponsor_infos}>
          <div className={SponsorStyles.sponsor_info}
              ref={(el) => el && StickyOpacityAnimRef.current.push(el)}>
            <div className={SponsorStyles.sponsor_info_title}>Avantages du Sponsoring Red Bull</div>
            <div className={SponsorStyles.sponsor_info_content}>
              Soutien Financier : Un financement solide pour vous aider à vous concentrer sur votre performance sans vous
              soucier des contraintes financières. Visibilité Mondiale : Profitez de la notoriété internationale de Red Bull
              pour gagner en visibilité auprès des fans et des médias. Accès aux Événements : Participez à des compétitions
              et à des événements exclusifs organisés par Red Bull à travers le monde. Coaching et Mentorat : Bénéficiez des
              conseils et de l'accompagnement de champions sponsorisés par Red Bull. Équipement de Pointe : Recevez du
              matériel et des équipements de haute qualité pour optimiser vos performances.
            </div>
          </div>

          <div className={SponsorStyles.sponsor_info}
              ref={(el) => el && StickyOpacityAnimRef.current.push(el)}>
            <div className={SponsorStyles.sponsor_info_title}>Sportifs Déjà Sponsorisés</div>
            <div className={SponsorStyles.sponsor_info_content}>
              <p> Verstappen (Formule 1) </p>
              <p> Travis Pastrana (Sports extrêmes) </p>
              <p> Lindsey Vonn (Ski alpin) </p>
              <p> Shaun White (Snowboard) </p>
              <p> Marc Márquez (MotoGP) </p>
            </div>
          </div>

          <div className={SponsorStyles.sponsor_info}
              ref={(el) => el && StickyOpacityAnimRef.current.push(el)}>
            <div className={SponsorStyles.sponsor_info_title}>Processus de Sélection</div>
            <div className={SponsorStyles.sponsor_info_content}>
              Pour postuler, les athlètes doivent soumettre un dossier comprenant leur parcours, leurs performances et un
              projet détaillant leurs objectifs sportifs. Red Bull évalue chaque candidature selon des critères de
              performance, d'originalité et de potentiel de partenariat. Témoignages "Grâce à Red Bull, j'ai pu participer à
              des compétitions que je n'aurais jamais pu imaginer. Leur soutien m'a permis de me concentrer pleinement sur
              ma passion et d'atteindre des sommets inédits." - Lindsey Vonn Événements et Compétitions Red Bull est
              l'organisateur de nombreux événements sportifs emblématiques tels que : Red Bull Rampage (VTT) Red Bull Air
              Race (Course aérienne) Red Bull Crashed Ice (Ice cross downhill) Mentions Médias "Red Bull ne cesse de
              repousser les limites du possible dans le sport." - ESPN "Les athlètes sponsorisés par Red Bull dominent leur
              discipline avec une énergie et une passion incomparables." - Sports Illustrated Équipe de Gestion des Sponsors
              John Doe - Directeur du Sponsoring Sportif Jane Smith - Responsable des Relations avec les Athlètes Richard
              Roe - Coordinateur des Événements Sportifs
            </div>
          </div>
        </div>
      </div>
      <Layout/>
      <Footer/>
    </>
  );
};

export default Detail;
