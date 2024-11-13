"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { YEAR_OPTIONS } from "../constants/yearOptions";

const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const param = useSearchParams();
  const [disabled, setDisabled] = useState(param.get("year") === null);
  const handleMonthChange = (month: string) => {
    setDisabled(false);
    const yearParam = param.get("year");
    if (yearParam) {
      push(`/?month=${month}&year=${yearParam}`);
    } else {
      push(`/?month=${month}`);
    }
  };
  const handleYearChange = (year: string) => {
    const monthParam = param.get("month");
    if (monthParam) {
      push(`/?month=${monthParam}&year=${year}`);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => handleMonthChange(value)}
        defaultValue={param.get("month") || undefined}
      >
        <SelectTrigger className="min-w-[160px]">
          <SelectValue placeholder="Escolha um mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((x) => (
            <SelectItem key={x.value} value={x.value}>
              {x.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        disabled={disabled}
        onValueChange={(value) => handleYearChange(value)}
        defaultValue={param.get("year") || undefined}
      >
        <SelectTrigger className="min-w-[160px]">
          <SelectValue placeholder="Escolha um ano" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS().map((x) => (
            <SelectItem key={x.value} value={x.value}>
              {x.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
