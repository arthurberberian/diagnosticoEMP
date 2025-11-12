import { Question } from "@/data/questions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MultipleChoiceQuestionProps {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
}

export function MultipleChoiceQuestion({ question, value, onChange }: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        {question.id}. {question.question}
      </h3>
      
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {question.options?.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
            <Label
              htmlFor={`q${question.id}-${option.value}`}
              className="flex-1 cursor-pointer text-base"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

