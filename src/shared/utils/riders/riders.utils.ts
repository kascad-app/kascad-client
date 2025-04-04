export const competitions = [
  {
    title: "Redbull contest festival",
    date: "27/02/2025",
    linkImage: "/assets/img/imgEventBMX.jpg",
    link: "/competition/1",
    localisation: "Paris",
  },
  {
    title: "Element festival",
    date: "03/08/2025",
    linkImage: "/assets/img/imgEventSkate.jpg",
    link: "/competition/2",
    localisation: "Tokyo",
  },
  {
    title: "Redbull world festival",
    date: "17/12/2025",
    linkImage: "/assets/img/imgEventRedbull.jpg",
    link: "/competition/2",
    localisation: "Las vegas",
  },
  {
    title: "Surf giant festival",
    date: "29/08/2025",
    linkImage: "/assets/img/imgEventSurf.jpg",
    link: "/competition/2",
    localisation: "Hawaii",
  },
];

export const chartDatasets = {
  vues: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Nombre de vues",
        data: [30, 45, 60, 40, 80, 90],
        borderWidth: 2,
        borderColor: "#1D4ED8",
        backgroundColor: "rgba(29, 78, 216, 0.2)",
      },
    ],
  },
  riders: {
    labels: ["France", "USA", "Canada", "Japon", "Brésil"],
    datasets: [
      {
        label: "Nombre de riders",
        data: [120, 90, 60, 50, 70],
        borderWidth: 2,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
      },
    ],
  },
  abonnes: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Nombre d'abonnés",
        data: [10, 20, 30, 50, 70, 100],
        borderWidth: 2,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
      },
    ],
  },
};
