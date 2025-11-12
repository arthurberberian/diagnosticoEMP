import { Question } from "@/data/questions";
import { Textarea } from "@/components/ui/textarea";

interface TextQuestionProps {
  question: Question;
  value?: string;
  onChange: (value: string) => void;
}

export function TextQuestion({ question, value, onChange }: TextQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        {question.id}. {question.question}
      </h3>
      
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua resposta aqui..."
        className="min-h-[120px] resize-none"
      />
      
      <p className="text-sm text-muted-foreground">
        Esta resposta é opcional e será usada para personalizar suas recomendações.
      </p>
    </div>
  );
}

