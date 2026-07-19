import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/15 border-t-accent" />
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
            <Leaf className="h-5 w-5" />
          </span>
        </div>
        <p className="animate-pulse text-sm font-medium text-ink/50">
          Loading…
        </p>
      </div>
    </div>
  );
}
