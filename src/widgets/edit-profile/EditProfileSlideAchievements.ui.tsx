import { ProfileState } from "@/shared/types/profileSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Trophy } from "lucide-react";
import { useState } from "react";
import {
  Performance,
  SportName,
  WeatherCondition,
} from "@kascad-app/shared-types";
import {
  getWeatherIcon,
  getWeatherLabel,
} from "@/shared/utils/weather/weather.utils";

export default function EditProfileSlideAchievements({
  profile,
  setProfile,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState | null>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Performance>({
    startDate: new Date(),
    endDate: new Date(),
    eventName: "",
    category: "",
    sport: {
      name: SportName.BMX,
      description: "",
    },
    ranking: undefined,
    location: {
      country: "",
      city: "",
    },
    weather: undefined,
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      startDate: new Date(),
      endDate: new Date(),
      eventName: "",
      category: "",
      sport: {
        name: SportName.BMX,
        description: "",
      },
      ranking: undefined,
      location: {
        country: "",
        city: "",
      },
      weather: undefined,
      notes: "",
    });
    setEditingIndex(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    const performance = profile.performanceSummary.performances[index];
    setFormData({
      ...performance,
      startDate:
        typeof performance.startDate === "string"
          ? new Date(performance.startDate)
          : performance.startDate,
      endDate:
        typeof performance.endDate === "string"
          ? new Date(performance.endDate)
          : performance.endDate,
    });
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const updatedPerformances = prev.performanceSummary.performances.filter(
        (_, i) => i !== index,
      );
      return {
        ...prev,
        performanceSummary: {
          ...prev.performanceSummary,
          performances: updatedPerformances,
          totalPodiums: updatedPerformances.filter(
            (p) => p.ranking && p.ranking <= 3,
          ).length,
        },
      };
    });
  };

  const formatDateForInput = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  };

  const handleSave = () => {
    if (
      !formData.eventName ||
      !formData.category ||
      !formData.location.country ||
      !formData.location.city
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Convertir les dates en objets Date pour s'assurer qu'elles sont du bon type
    const performanceData = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    };

    setProfile((prev) => {
      if (!prev) return prev;

      let updatedPerformances;
      if (editingIndex !== null) {
        // Modification
        updatedPerformances = prev.performanceSummary.performances.map(
          (perf, index) => (index === editingIndex ? performanceData : perf),
        );
      } else {
        // Ajout
        updatedPerformances = [
          ...prev.performanceSummary.performances,
          performanceData,
        ];
      }

      return {
        ...prev,
        performanceSummary: {
          ...prev.performanceSummary,
          performances: updatedPerformances,
          totalPodiums: updatedPerformances.filter(
            (p) => p.ranking && p.ranking <= 3,
          ).length,
        },
      };
    });

    setIsDialogOpen(false);
    resetForm();
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("fr-FR");
  };

  const getRankingBadge = (ranking?: number) => {
    if (!ranking) return null;

    if (ranking === 1) return <Badge className="bg-yellow-500">🥇 1er</Badge>;
    if (ranking === 2) return <Badge className="bg-gray-400">🥈 2ème</Badge>;
    if (ranking === 3) return <Badge className="bg-orange-500">🥉 3ème</Badge>;
    return <Badge variant="outline">{ranking}ème</Badge>;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mes Performances</h2>
          <p className="text-gray-600">
            Total podiums : {profile.performanceSummary.totalPodiums}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une performance
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null
                  ? "Modifier la performance"
                  : "Ajouter une performance"}
              </DialogTitle>
              <DialogDescription>
                Renseignez les détails de votre performance sportive
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventName">Nom de l'événement *</Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    onChange={(e) =>
                      setFormData({ ...formData, eventName: e.target.value })
                    }
                    placeholder="ex: Championnat de France"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="ex: Senior, Junior, Pro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Date de début *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formatDateForInput(formData.startDate)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Date de fin *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formatDateForInput(formData.endDate)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sport">Sport *</Label>
                  <Select
                    value={formData.sport.name}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        sport: { ...formData.sport, name: value as SportName },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(SportName).map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ranking">Classement</Label>
                  <Input
                    id="ranking"
                    type="number"
                    min="1"
                    value={formData.ranking || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ranking: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="ex: 1, 2, 3..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Pays *</Label>
                  <Input
                    id="country"
                    value={formData.location.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          country: e.target.value,
                        },
                      })
                    }
                    placeholder="ex: France"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          city: e.target.value,
                        },
                      })
                    }
                    placeholder="ex: Paris"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="weather">Conditions météo</Label>
                <Select
                  value={formData.weather || ""}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      weather:
                        value === "none"
                          ? undefined
                          : (value as WeatherCondition),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir les conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucune</SelectItem>
                    {Object.values(WeatherCondition).map((weather) => (
                      <SelectItem key={weather} value={weather}>
                        {getWeatherLabel(weather)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Commentaires, observations..."
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave}>
                {editingIndex !== null ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des performances */}
      <div className="grid gap-4">
        {profile.performanceSummary.performances.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucune performance enregistrée</p>
              <p className="text-sm text-gray-500">
                Ajoutez vos premières performances pour mettre en valeur vos
                résultats
              </p>
            </CardContent>
          </Card>
        ) : (
          profile.performanceSummary.performances.map((performance, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {performance.eventName}
                      {getRankingBadge(performance.ranking)}
                    </CardTitle>
                    <CardDescription>
                      {performance.category} • {performance.sport.name}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-gray-600">
                      {formatDate(performance.startDate)} -{" "}
                      {formatDate(performance.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Lieu</p>
                    <p className="text-gray-600">
                      {performance.location.city},{" "}
                      {performance.location.country}
                    </p>
                  </div>
                  {performance.weather && (
                    <div>
                      <p className="font-medium">Météo</p>
                      <p className="text-gray-600">
                        {getWeatherIcon(performance.weather)}{" "}
                        {getWeatherLabel(performance.weather)}
                      </p>
                    </div>
                  )}
                </div>
                {performance.notes && (
                  <div className="mt-4">
                    <p className="font-medium text-sm">Notes</p>
                    <p className="text-gray-600 text-sm">{performance.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
