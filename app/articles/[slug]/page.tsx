import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticles } from "@/shared/model/articles";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/ROUTES";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = articles.filter((a) =>
    article.relatedArticles?.includes(a.slug),
  );

  return (
    <main className="px-6 py-12 max-w-3xl mx-auto">
      {/* Header retour */}
      <div className="mb-6">
        <Link
          href={ROUTES.HOMEPAGE}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Retour
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(article.date).toLocaleDateString()}
      </p>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <article className="prose max-w-none">
        {article.description.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">À lire aussi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                href={`/articles/${rel.slug}`}
                key={rel.id}
                className="block border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{rel.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {rel.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
