import { Question } from "@/data/questions";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ScaleQuestionProps {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}

export function ScaleQuestion({ question, value, onChange }: ScaleQuestionProps) {
  const [currentValue, setCurrentValue] = useState(value ?? 5);

  const handleChange = (values: number[]) => {
    const newValue = values[0];
    setCurrentValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        {question.id}. {question.question}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{question.scaleLabels?.min}</span>
          <span className="text-2xl font-bold text-primary">{currentValue}</span>
          <span>{question.scaleLabels?.max}</span>
        </div>
        
        <Slider
          min={question.scaleMin ?? 0}
          max={question.scaleMax ?? 10}
          step={1}
          value={[currentValue]}
          onValueChange={handleChange}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          {Array.from({ length: (question.scaleMax ?? 10) + 1 }, (_, i) => (
            <span key={i} className="w-4 text-center">
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

