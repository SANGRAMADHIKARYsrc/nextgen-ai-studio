"use client";

import CategoryPage from "@/components/CategoryPage";
import { getCategoryById } from "@/lib/tools-config";
import { notFound } from "next/navigation";

export default function WritingPage() {
  const category = getCategoryById("writing");
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
