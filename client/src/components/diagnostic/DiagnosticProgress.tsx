import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface DiagnosticProgressProps {
  currentSection: number;
  totalSections: number;
  overallProgress: number;
}

export function DiagnosticProgress({
  currentSection,
  totalSections,
  overallProgress,
}: DiagnosticProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            Seção {currentSection} de {totalSections}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {Math.round(overallProgress)}% concluído
        </span>
      </div>
      
      <Progress value={overallProgress} className="h-2" />
      
      <div className="flex gap-1">
        {Array.from({ length: totalSections }, (_, i) => {
          const sectionNum = i + 1;
          const isCompleted = sectionNum < currentSection;
          const isCurrent = sectionNum === currentSection;
          
          return (
            <div
              key={sectionNum}
              className={`flex-1 h-1 rounded-full transition-colors ${
                isCompleted
                  ? "bg-primary"
                  : isCurrent
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

