"use client";

import CategoryPage from "@/components/CategoryPage";
import { getCategoryById } from "@/lib/tools-config";
import { notFound } from "next/navigation";

export default function DetectionPage() {
  const category = getCategoryById("detection");
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
