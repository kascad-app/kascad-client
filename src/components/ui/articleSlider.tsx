// components/ArticleSlider.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, getArticles } from "@/shared/model/articles";

export default function ArticleSlider() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles().then(setArticles).catch(console.error);
  }, []);

  if (articles.length === 0) {
    return (
      <section className="py-12 px-6 bg-white flex flex-col items-center justify-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
        >
          <rect
            x="8"
            y="16"
            width="48"
            height="32"
            rx="6"
            fill="#F4F3EF"
            stroke="#B1BD93"
            strokeWidth="2"
          />
          <path
            d="M16 32h32"
            stroke="#B1BD93"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 40h20"
            stroke="#B1BD93"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="24" r="3" fill="#B1BD93" />
        </svg>
        <h3 className="text-lg font-semibold mb-2 text-[#101B08] text-center">
          Aucun article disponible
        </h3>
        <p className="text-gray-500 text-center max-w-xs">
          Il n'y a pas encore d'articles publiés. Revenez bientôt pour découvrir
          nos contenus !
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Derniers articles</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {articles.map((article) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.id}
            className="min-w-[250px] bg-white rounded-xl border border-gray-100 hover:shadow-md shadow-primary-green transition"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
