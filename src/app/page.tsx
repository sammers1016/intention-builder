"use client";

import { useState } from "react";

const elements = {
  crystals: ["Rose Quartz", "Amethyst", "Citrine", "Black Tourmaline"],
  botanicals: ["Lavender", "Rose Petals", "Sage", "Chamomile"],
  scents: ["Vanilla", "Sandalwood", "Citrus", "Mint"],
  waxColors: ["White", "Pink", "Purple", "Black"]
};

export default function IntentionBuilder() {
  const [selection, setSelection] = useState({
    crystals: [],
    botanicals: [],
    scent: "",
    color: ""
  });
  const [output, setOutput] = useState(null);

  const handleChange = (type, value) => {
    if (type === "crystals" || type === "botanicals") {
      setSelection((prev) => {
        const updated = prev[type].includes(value)
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value].slice(0, 2);
        return { ...prev, [type]: updated };
      });
    } else {
      setSelection((prev) => ({ ...prev, [type]: value }));
    }
  };

  const generateOutput = () => {
    const title = `Candle of ${selection.crystals.join(" & ")}`;
    const meaning = `This candle channels the energies of ${selection.crystals.join(", ")}, combined with the soothing presence of ${selection.botanicals.join(", ")}, scented with ${selection.scent} and dressed in ${selection.color} wax.`;
    const ritual = `Use during meditation or intention-setting for balance and clarity
