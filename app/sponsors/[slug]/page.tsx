import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Params } from "@/shared/types/Params";

export default async function SponsorPage(props: { params: Params }) {
  const params = await props.params;
  const filePath = path.join(process.cwd(), "public/datas/sponsors.json");
  const data = await fs.readFile(filePath, "utf-8");
  const sponsors = JSON.parse(data);

  const sponsor = sponsors.find((s: any) => s.slug === params.slug);

  if (!sponsor) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="relative space-y-10">
        <div className="flex items-center gap-6">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={80}
            height={80}
            className="object-contain"
          />
          <div>
            <h1 className="text-4xl font-bold text-black">{sponsor.name}</h1>
            <p className="text-gray-500 text-sm">{sponsor.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {sponsor.sports.map((sport: string) => (
            <span
              key={sport}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full border"
            >
              {sport}
            </span>
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed max-w-3xl">
          {sponsor.details}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-white border p-6 rounded-lg ">
          <div>
            <p className="text-xs text-gray-500 mb-1">Site Web</p>
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Voir le site →
            </a>
          </div>
          {sponsor.socials.instagram && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Instagram</p>
              <a
                href={sponsor.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {sponsor.socials.instagram}
              </a>
            </div>
          )}
          {sponsor.socials.facebook && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Facebook</p>
              <a
                href={sponsor.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {sponsor.socials.facebook}
              </a>
            </div>
          )}
          {sponsor.socials.twitter && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Twitter</p>
              <a
                href={sponsor.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {sponsor.socials.twitter}
              </a>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6 items-center">
          <Button variant="secondary">❤️ Ajouter à mes favoris</Button>
          <Button variant="outline">📩 Contacter</Button>
          {sponsor.isFollowed && (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
              Sponsor suivi
            </span>
          )}
          {sponsor.isLocal && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              Actif dans ma région
            </span>
          )}
          {sponsor.applicationsOpen ? (
            <span className="text-xs px-2 py-1 bg-lime-100 text-lime-700 rounded-full">
              Ouvert aux candidatures
            </span>
          ) : (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
              Fermé aux candidatures
            </span>
          )}
        </div>

        {sponsor.values && sponsor.values.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-10 mb-2">Nos valeurs</h2>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {sponsor.values.map((value: string, i: number) => (
                <li key={i}>{value}</li>
              ))}
            </ul>
          </div>
        )}

        {sponsor.athletes && sponsor.athletes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">Athlètes partenaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {sponsor.athletes.map((athlete: any, i: number) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden group"
                >
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-white via-white/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-900">
                    {athlete.name}
                    <p className="text-xs text-gray-500">{athlete.sport}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sponsor.products && sponsor.products.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-10 mb-4">
              Produits phares
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sponsor.products.map((product: any, i: number) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="object-contain w-full h-40"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Voir le produit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sponsor.news && sponsor.news.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">
              Actualités & événements
            </h2>
            <ul className="text-sm text-gray-700 space-y-2">
              {sponsor.news.map((item: any, i: number) => (
                <li key={i}>
                  <span className="font-medium">{item.title}</span> —{" "}
                  {item.date}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="absolute top-0 right-1/2 opacity-5 text-[16rem] text-nowrap translate-x-1/2 font-black tracking-tighter select-none pointer-events-none">
          {sponsor.name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
