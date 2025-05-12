import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

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
    const ritual = `Use during meditation or intention-setting for balance and clarity.`;
    const recommendations = `Consider adding Clear Quartz for amplification.`;
    setOutput({ title, meaning, ritual, recommendations });
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Build Your Intention Candle</h2>

      <Card>
        <CardContent className="space-y-2 p-4">
          <div>
            <label className="font-semibold">Crystals (1–2)</label>
            <div className="flex flex-wrap gap-2">
              {elements.crystals.map((c) => (
                <Button
                  key={c}
                  variant={selection.crystals.includes(c) ? "default" : "outline"}
                  onClick={() => handleChange("crystals", c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Botanicals (1–2)</label>
            <div className="flex flex-wrap gap-2">
              {elements.botanicals.map((b) => (
                <Button
                  key={b}
                  variant={selection.botanicals.includes(b) ? "default" : "outline"}
                  onClick={() => handleChange("botanicals", b)}
                >
                  {b}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Scent</label>
            <Select onValueChange={(v) => handleChange("scent", v)}>
              {elements.scents.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="font-semibold">Wax Color</label>
            <Select onValueChange={(v) => handleChange("color", v)}>
              {elements.waxColors.map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </Select>
          </div>

          <Button onClick={generateOutput} className="mt-2">Generate Candle</Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-xl font-bold">{output.title}</h3>
            <p><strong>Meaning:</strong> {output.meaning}</p>
            <p><strong>Suggested Ritual:</strong> {output.ritual}</p>
            <p><strong>Recommendations:</strong> {output.recommendations}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
