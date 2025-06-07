import { HydrateClient, trpc } from "@/trpc/server";
import { ClientPage } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  void trpc.hello.prefetch({ text: "hanb" });
  return (
    <HydrateClient>
      <Suspense fallback={<p>loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <h1>Home</h1>
          <ClientPage />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
