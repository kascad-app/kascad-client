"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from "recharts";

interface RiderKPISectionProps {
    stats: {
        eventName?: string;
        ranking?: number;
        startDate?: string | Date;
        sport?: { name?: string; };
        score?: number;
    }[];
}

export default function RiderKPISection({ stats }: RiderKPISectionProps) {
    const progression = stats
        .filter((s) => s.startDate && s.ranking !== undefined)
        .sort(
            (a, b) =>
                new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime()
        )
        .map((s) => ({
            date: new Date(s.startDate!).getFullYear().toString(),
            ranking: s.ranking,
        }));

    const podiumsBySport: Record<string, number> = {};
    stats.forEach((s) => {
        const name = s.sport?.name ?? "Inconnu";
        if (s.ranking && s.ranking <= 3) {
            podiumsBySport[name] = (podiumsBySport[name] ?? 0) + 1;
        }
    });
    const podiumsData = Object.entries(podiumsBySport).map(([sport, count]) => ({
        sport,
        podiums: count,
    }));

    const scoresData = stats
        .filter((s) => s.eventName)
        .map((s) => ({
            event: s.eventName,
            score: s.score ?? Math.floor(70 + Math.random() * 30),
        }));

    if (!progression.length && !podiumsData.length && !scoresData.length) return null;

    return (
        <div className="mt-20 pb-20 max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {progression.length > 0 && (
                    <Card className="bg-[#F4F3EF] border-[#D2FA52]">
                        <CardHeader>
                            <CardTitle>Progression du classement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={progression}>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="date" />
                                    <YAxis reversed />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="ranking"
                                        stroke="#101B08"
                                        strokeWidth={3}
                                        dot={{ r: 5, fill: "#D2FA52" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}

                {podiumsData.length > 0 && (
                    <Card className="bg-[#F4F3EF] border-[#D2FA52]">
                        <CardHeader>
                            <CardTitle>Podiums par sport</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={podiumsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="sport" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="podiums" fill="#D2FA52" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}

                {/* {scoresData.length > 0 && (
                    <Card className="bg-[#F4F3EF] border-[#B1BD93] md:col-span-2">
                        <CardHeader>
                            <CardTitle>Scores en compétition</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart layout="vertical" data={scoresData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="event" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="score" fill="#B1BD93" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )} */}
            </div>
            {/* <div className="h-[50dvh]"></div> */}
        </div>
    );
}      