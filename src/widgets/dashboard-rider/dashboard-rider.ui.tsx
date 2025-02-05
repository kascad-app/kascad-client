"use client";

import React, { useEffect } from "react";
import useSession from "@/shared/api/use-session";
import { Bell, HelpCircle, MapPin, Trophy } from "lucide-react";
import { Button } from "@/shared/ui/button/Button.ui";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs/Tabs.ui";
import { CardCompetition } from "../card-competition";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

// Simple LineChart component (you may want to replace this with a proper chart library)
const LineChart: React.FC<{ data: number[]; className?: string }> = ({
  data,
  className,
}) => (
  <div className={className}>
    {/* Placeholder for chart */}
    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
      Chart Placeholder
    </div>
  </div>
);

// const chart = new Chart(ctx, {
//   type: "line",
//   data: data,
//   options: {
//     onClick: (e) => {
//       const canvasPosition = getRelativePosition(e, chart);

//       // Substitute the appropriate scale IDs
//       const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
//       const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
//     },
//   },
// });

// Simple CompetitionCard component
// const CompetitionCard: React.FC<{
//   title: string;
//   date: string;
//   image: string;
//   link: string;
//   localisation: string;
// }> = ({ title, date, image, link, localisation }) => (
//   <CardCompetition className="p-4">
//     <img
//       src={image}
//       alt={title}
//       className="w-full h-40 object-cover mb-4 rounded"
//     />
//     <h3 className="font-semibold text-lg mb-2">{title}</h3>
//     <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//       <Trophy className="w-4 h-4" />
//       <span>{date}</span>
//     </div>
//     <div className="flex items-center gap-2 text-sm text-gray-600">
//       <MapPin className="w-4 h-4" />
//       <span>{localisation}</span>
//     </div>
//     <button className="mt-4 w-full">
//       <a href={link}>View Details</a>
//     </button>
//   </CardCompetition>
// );

export const DashboardRidersWidget: React.FC = () => {
  const session = useSession();

  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    let chartInstance: Chart | null = null;

    if (ctx) {
      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const competitions = [
    {
      title: "Redbull fest",
      date: "03/02/2024",
      image: "/placeholder.svg?height=200&width=300",
      link: "/competition/1",
      localisation: "Montbéliard",
    },
    {
      title: "Redbull fest",
      date: "03/02/2024",
      image: "/placeholder.svg?height=200&width=300",
      link: "/competition/2",
      localisation: "Montbéliard",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">
          Bonjour{" "}
          {session.user?.identity && "fullName" in session.user.identity
            ? session.user.identity.fullName
            : "Ryoma"}
          !
        </h1>
        <div className="flex gap-4">
          <button>
            <Bell className="h-5 w-5" />
          </button>
          <button>
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left Column - Competitions */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Compétitions à venir</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitions.map((competition, index) => (
                <CardCompetition key={index} cardProps={competition} />
              ))}
            </div>
          </div>

          {/* Profile Incomplete Card */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Votre profil manque d'informations !
                </h3>
                <Button variant="default" className="bg-blue-600 text-white">
                  Accéder à mon profil
                </Button>
              </div>
              <img
                src="/assets/img/snow.png"
                alt="Snowboarder"
                className="h-32 w-32 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Statistics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Vos statistiques</h2>
          <Tabs defaultValue="vues">
            <TabsList className="mb-4">
              <TabsTrigger value="vues">Vues</TabsTrigger>
              <TabsTrigger value="riders">Riders selon pays</TabsTrigger>
              <TabsTrigger value="abonnes">Abonnés</TabsTrigger>
            </TabsList>
            <div className="h-[300px]">
              <canvas id="myChart"></canvas>
              {/* <LineChart
                data={[10, 40, 20, 50, 30, 45, 60]}
                className="w-full h-full"
              /> */}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Profile Card */}

      {/* Bottom Navigation */}
      {/* <div className="mt-8 flex justify-center">
        <Card className="px-6 py-3 flex gap-4">
          <Button variant="ghost">Mon profil</Button>
          <Button variant="ghost">Paramètres</Button>
        </Card>
      </div> */}
    </div>
  );
};
