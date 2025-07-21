import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

export type ViewEntry = {
  idUser: string;
  timestamp: Date;
};

const chartConfig = {
  vues: {
    label: "Vues",
    color: "var(--primary-green)",
  },
} satisfies ChartConfig;

type ViewDashboardProps = {
  views?: ViewEntry[];
};

export function ViewDashboard({ views }: ViewDashboardProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Compte les vues par jour à partir des timestamps
  const viewsByDay: Record<string, number> = {};
  if (views) {
    views.forEach((entry) => {
      const date = new Date(entry.timestamp);
      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        const key = date.toISOString().slice(0, 10); // YYYY-MM-DD
        viewsByDay[key] = (viewsByDay[key] || 0) + 1;
      }
    });
  }

  // Génère tous les jours du mois avec le nombre de vues (0 si aucune vue)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const chartData: { date: string; vues: number }[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(currentYear, currentMonth, day)
      .toISOString()
      .slice(0, 10);
    chartData.push({
      date: dateStr,
      vues: viewsByDay[dateStr] || 0,
    });
  }

  const monthLabel = `${now.toLocaleString("default", {
    month: "long",
  })} ${currentYear}`;

  const hasViews = chartData.some((d) => d.vues > 0);

  if (!hasViews) {
    return (
      <Card className="@container/card flex flex-col h-full items-center justify-center min-h-[250px] border-2 border-dashed border-primary-green">
        <CardHeader className="flex flex-col items-center justify-center w-full">
          <CardTitle className="text-2xl text-primary-green mb-2">
            Aucune vue ce mois-ci
          </CardTitle>
          <CardDescription className="text-gray-600 text-center">
            <span className="block mb-2">
              Votre profil n'a pas encore été visité ce mois-ci.
            </span>
            <span className="block text-sm">
              Partagez votre profil pour augmenter votre visibilité !
            </span>
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center justify-center py-6">
          <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="#d2fa52"
              strokeWidth="4"
              fill="#f7fafc"
            />
            <path
              d="M32 44c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-20a8 8 0 100 16 8 8 0 000-16z"
              fill="#3f4139"
            />
            <circle cx="32" cy="32" r="4" fill="#d2fa52" />
          </svg>
        </div>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Visite du Portfolio</CardTitle>
        <CardDescription>
          <span className="block">Vues du mois en cours ({monthLabel})</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="vues"
              type="monotone"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
