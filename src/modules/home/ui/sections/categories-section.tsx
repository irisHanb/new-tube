"use client";

import { trpc } from "@/trpc/client";
import { HomeViewProps } from "../views/home-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CategoriesSectionSuspense = ({ categoryId }: HomeViewProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  return <div>{JSON.stringify(categories)}</div>;
};

export const CategoriesSection = ({ categoryId }: HomeViewProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};
