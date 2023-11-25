"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "@/components/homePage/HomePage";

const queryClient = new QueryClient();

export default function Home() {
  return <HomePage />;
}
