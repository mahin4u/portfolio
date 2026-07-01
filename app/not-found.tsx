import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-7xl font-bold text-electric">404</p>
      <h1 className="mt-4 text-2xl font-bold">This route drifted off the map.</h1>
      <p className="mt-2 max-w-md text-midnight/60">
        The page you&apos;re looking for doesn&apos;t exist — but the journey
        continues elsewhere.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
