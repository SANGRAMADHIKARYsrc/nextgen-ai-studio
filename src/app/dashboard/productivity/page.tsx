"use client";

import CategoryPage from "@/components/CategoryPage";
import { getCategoryById } from "@/lib/tools-config";
import { notFound } from "next/navigation";

export default function ProductivityPage() {
  const category = getCategoryById("productivity");
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
