import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <span className="font-serif text-6xl italic text-accent">404</span>
      <h1 className="font-serif text-3xl italic text-on-light">Page Not Found</h1>
      <p className="max-w-md font-sans text-on-light/70">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button variant="primary" href="/">
        Back to Home
      </Button>
    </div>
  );
}
