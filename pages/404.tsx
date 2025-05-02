import Link from "next/link";

const Custom404 = () => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">404 - Article non trouvé</h1>
      <p className="text-lg mb-4">Désolé, l&apos;article que vous cherchez n&apos;existe pas.</p>
      <Link href="/">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
};

export default Custom404;
