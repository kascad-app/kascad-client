"use client";

import React, { useEffect } from "react";
import useSession from "@/shared/api/use-session";
import { Bell, HelpCircle } from "lucide-react";
import { Button } from "@/shared/ui/button/Button.ui";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs/Tabs.ui";
import { CardCompetition } from "../card-competition";
import Chart from "chart.js/auto";
import Link from "next/link";
import Image from "next/image";
import { competitions } from "@/shared/utils/riders/riders.utils";

export const DashboardRidersWidget: React.FC = () => {
  const session = useSession();

  /**
   * Use effect concernant le chart
   */
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

  return (
    <div className="p-6 max-w-7xl mx-auto w-full h-[calc(100vh-theme(spacing.24))]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">
          Bonjour{" "}
          {session.user?.identity && "fullName" in session.user.identity
            ? session.user.identity.fullName
            : ""}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100%-theme(spacing.20))]">
        {/* Left Column - Competitions */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Compétitions à venir</h2>
            <div className="flex items-center h-full justify-start gap-4 overflow-x-scroll">
              {competitions.map((competition, index) => (
                <CardCompetition key={index} cardProps={competition} />
              ))}
            </div>
          </div>

          {/* Profile Incomplete Card */}
          <div className="w-full max-w-3xl mx-auto h-48 overflow-hidden rounded-lg border-[2px] border-[#EDEDED]">
            <div className="relative h-full flex items-center justify-between p-6 bg-gradient-to-r from-white to-blue-50">
              <div className="z-10 flex flex-col justify-between space-y-4 w-2/3">
                <h2 className="text-xl text-gray-900">
                  Votre profil manque d&apos;informations !
                </h2>
                <Link href={"/profile"}>
                  <Button variant="default" className="bg-blue-600 text-white">
                    Accéder à mon profil
                  </Button>
                </Link>
              </div>
              <div className="absolute right-[-10px] top-0 h-full w-1/2">
                <Image
                  src="/assets/img/snow.png"
                  alt="Snowboarder"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Statistics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Vos statistiques</h2>
          <Tabs className="h-full" defaultValue="vues">
            <TabsList className="mb-4">
              <TabsTrigger value="vues">Vues</TabsTrigger>
              <TabsTrigger value="riders">Riders selon pays</TabsTrigger>
              <TabsTrigger value="abonnes">Abonnés</TabsTrigger>
            </TabsList>
            <div className="h-[calc(100%-theme(spacing.32))] w-full">
              <canvas
                style={{
                  height: "60% !important",
                  width: "100% !important",
                }}
                id="myChart"
              ></canvas>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
