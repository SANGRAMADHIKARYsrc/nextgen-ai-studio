"use client";

import CategoryPage from "@/components/CategoryPage";
import { getCategoryById } from "@/lib/tools-config";
import { notFound } from "next/navigation";

export default function MediaPage() {
  const category = getCategoryById("media");
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
