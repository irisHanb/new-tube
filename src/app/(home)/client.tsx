"use client";

import { trpc } from "@/trpc/client";

export const ClientPage = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Hanb" });
  return <div>client page: {data.greeting}</div>;
};
