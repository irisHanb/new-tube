"use client";

import { trpc } from "@/trpc/client";
import { HomeViewProps } from "../views/home-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

export const CategoriesSection = ({ categoryId }: HomeViewProps) => {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSkeleton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

const CategoriesSectionSuspense = ({ categoryId }: HomeViewProps) => {
  const router = useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map(({ name, id }) => {
    return {
      value: id,
      label: name,
    };
  });

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  };

  return <FilterCarousel value={categoryId} data={data} onSelect={onSelect} />;
};
