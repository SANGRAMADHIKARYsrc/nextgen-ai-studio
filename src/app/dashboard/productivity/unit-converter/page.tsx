"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import { ToolPageLayout, ToolSelect } from "@/components/ui/ToolComponents";

const categories: Record<string, Record<string, number>> = {
  length: {
    Meter: 1, Kilometer: 0.001, Centimeter: 100, Millimeter: 1000,
    Inch: 39.3701, Foot: 3.28084, Yard: 1.09361, Mile: 0.000621371,
  },
  weight: {
    Kilogram: 1, Gram: 1000, Milligram: 1000000, Pound: 2.20462,
    Ounce: 35.274, Ton: 0.001,
  },
  temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
  area: {
    "Square Meter": 1, "Square Kilometer": 0.000001, Hectare: 0.0001,
    Acre: 0.000247105, "Square Foot": 10.7639, "Square Inch": 1550,
  },
  volume: {
    Liter: 1, Milliliter: 1000, "Cubic Meter": 0.001, Gallon: 0.264172,
    Quart: 1.05669, Pint: 2.11338, Cup: 4.22675,
  },
  speed: {
    "m/s": 1, "km/h": 3.6, "mph": 2.23694, Knot: 1.94384,
  },
  data: {
    Byte: 1, Kilobyte: 0.001, Megabyte: 0.000001, Gigabyte: 1e-9,
    Terabyte: 1e-12, Bit: 8,
  },
};

function convertTemperature(value: number, from: string, to: string): number {
  let celsius = value;
  if (from === "Fahrenheit") celsius = (value - 32) * (5 / 9);
  else if (from === "Kelvin") celsius = value - 273.15;

  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}

export default function UnitConverterPage() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Kilometer");
  const [inputValue, setInputValue] = useState("1");

  const units = Object.keys(categories[category]);

  const convert = (): string => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return "0";

    if (category === "temperature") {
      return convertTemperature(val, fromUnit, toUnit).toFixed(4);
    }

    const baseValue = val / categories[category][fromUnit];
    return (baseValue * categories[category][toUnit]).toFixed(6);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const u = Object.keys(categories[cat]);
    setFromUnit(u[0]);
    setToUnit(u[1] || u[0]);
  };

  return (
    <ToolPageLayout title="Unit Converter" description="Convert between different measurement units" icon={Ruler} color="#fbbf24" backHref="/dashboard/productivity">
      <div className="max-w-2xl mx-auto glass rounded-2xl p-6 space-y-6">
        <ToolSelect
          value={category}
          onChange={handleCategoryChange}
          label="Category"
          options={Object.keys(categories).map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <ToolSelect value={fromUnit} onChange={setFromUnit} label="From" options={units.map((u) => ({ value: u, label: u }))} />
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full mt-2 glass-card rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-[var(--color-primary)] transition-all"
            />
          </div>
          <div>
            <ToolSelect value={toUnit} onChange={setToUnit} label="To" options={units.map((u) => ({ value: u, label: u }))} />
            <div className="mt-2 glass-card rounded-xl px-4 py-3 text-lg font-mono text-[var(--color-primary)]">
              {convert()}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--color-muted-foreground)]">
          {inputValue} {fromUnit} = <span className="font-semibold text-[var(--color-foreground)]">{convert()} {toUnit}</span>
        </p>
      </div>
    </ToolPageLayout>
  );
}
