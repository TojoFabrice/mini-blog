// pages/index.tsx

import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import fs from "fs";
import '../styles/globals.css'
import { useRouter } from "next/router";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  createdAt: string;
}

interface ArticlesPageProps {
  articles: Article[];
}

const getArticlesData = (): Article[] => {
  const filePath = path.join(process.cwd(), "data", "article.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

export default function Home({ articles }: ArticlesPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mini Blog</h1>
      <div className="flex gap-8 justify-around">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
          
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={300}
                className="rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.description}</p>
            
          </Link>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = getArticlesData();
  return {
    props: { articles },
    revalidate: 10,
  };
};
