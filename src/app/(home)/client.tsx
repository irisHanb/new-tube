"use client";

import { trpc } from "@/trpc/client";

export const ClientPage = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "hanb" });
  return <div>client page: {data.greeting}</div>;
};
