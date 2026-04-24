"use client";

import CategoryPage from "@/components/CategoryPage";
import { getCategoryById } from "@/lib/tools-config";
import { notFound } from "next/navigation";

export default function DeveloperPage() {
  const category = getCategoryById("developer");
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
