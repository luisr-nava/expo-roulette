"use client";
import dynamic from "next/dynamic";

export const RouletteComponent = dynamic(() => import("./RouletteComponent"), {
  ssr: false,
});

