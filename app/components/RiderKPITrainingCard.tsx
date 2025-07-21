"use client";

import { Timer, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiderTrainingKPIProps {
    sessionsPerWeek: number;
    hoursPerSession: number;
}

export default function RiderTrainingKPI({
    sessionsPerWeek,
    hoursPerSession,
}: RiderTrainingKPIProps) {
    const totalHours = sessionsPerWeek * hoursPerSession;

    return (
        <div className="mt-20 max-w-6xl mx-auto px-4 space-y-20">
            <Card className="bg-[#101B08] text-white rounded-xl shadow-lg border border-[#D2FA52] hover:shadow-xl transition-all">
                <CardHeader className="flex flex-col gap-1 items-start">
                    <CardTitle className="text-[#D2FA52] text-lg font-michroma flex items-center gap-2">
                        <Dumbbell className="w-5 h-5" />
                        Fréquence d'entraînement
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                    <div className="flex justify-between text-sm text-[#B1BD93] mb-2">
                        <span>Sessions / semaine</span>
                        <span>{sessionsPerWeek}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#B1BD93] mb-2">
                        <span>Durée moyenne</span>
                        <span>{hoursPerSession} h</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white mt-4 border-t border-[#D2FA52] pt-2">
                        <span>Total / semaine</span>
                        <span>{totalHours.toFixed(1)} h</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
