// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto p-5 m-5 text-center">
        <h1>404</h1>
        <h2 className="font-bold mb-2">Сторінку не знайдено</h2>
        <p className="text-muted-foreground mb-6">
            Можливо дана сторінка знаходить у стадії розробки
        </p>
        <Link href="/" className="inline-block underline">
            На головну
        </Link>
    </main>
  );
}
