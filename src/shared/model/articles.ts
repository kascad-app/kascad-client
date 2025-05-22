export interface Article {
    id: string;
    title: string;
    image: string;
    excerpt: string;
    content: string;
    description: string;
    date: string;
    slug: string;
    relatedArticles?: string[]; // ← ajoute cette ligne
}


export async function getArticles(): Promise<Article[]> {
    const res = await fetch('http://localhost:3000/datas/articles.json', {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des articles');
    return res.json();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const res = await fetch('/datas/articles.json');
    if (!res.ok) throw new Error('Erreur lors du chargement des articles');
    const articles: Article[] = await res.json();
    return articles.find(article => article.slug === slug) || null;
}