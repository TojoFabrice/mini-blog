// pages/articles/[id].tsx

import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import fs from "fs";
import { ParsedUrlQuery } from "querystring";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  createdAt: string;
}

interface ArticleProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticleProps) {
  return (
    <main className="p-8">
      <Link href="/">
       ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <Image
        src={article.image}
        alt={article.title}
        width={600}
        height={600}
        className="rounded"
      />
      <div className="mt-6 whitespace-pre-line">{article.content}</div>
    </main>
  );
}

// Utilitaire pour lire les articles
const getArticlesData = (): Article[] => {
  const filePath = path.join(process.cwd(), "data", "article.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

// SSR
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getArticlesData();
  const paths = articles.map((article) => ({
    params: { id: article.id },
  }));

  return {
    paths,
    fallback: true // "blocking", 
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

// ISR pour les articles
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;
  const articles = getArticlesData();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article },
    revalidate: 10, 
  };
};
