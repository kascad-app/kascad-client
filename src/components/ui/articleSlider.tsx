// components/ArticleSlider.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article, getArticles } from '@/shared/model/articles';

export default function ArticleSlider() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        getArticles().then(setArticles).catch(console.error);
    }, []);

    return (
        <section className="py-12 px-6 bg-white">
            <h2 className="text-2xl font-bold mb-6">Derniers articles</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {articles.map((article) => (
                    <Link href={`/articles/${article.slug}`} key={article.id} className="min-w-[250px] bg-white rounded-xl border border-gray-100 hover:shadow-md transition">
                        <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}