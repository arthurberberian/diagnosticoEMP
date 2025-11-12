import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { diagnosticQuestions, getSectionQuestions, getTotalSections } from "@/data/questions";
import { MultipleChoiceQuestion } from "@/components/diagnostic/MultipleChoiceQuestion";
import { ScaleQuestion } from "@/components/diagnostic/ScaleQuestion";
import { TextQuestion } from "@/components/diagnostic/TextQuestion";
import { DiagnosticProgress } from "@/components/diagnostic/DiagnosticProgress";

export default function Diagnostic() {
  const [, setLocation] = useLocation();
  const {
    answers,
    setAnswer,
    getAnswer,
    currentSection,
    setCurrentSection,
    getProgress,
    getSectionProgress,
  } = useDiagnostic();

  const totalSections = getTotalSections();
  const sectionQuestions = getSectionQuestions(currentSection);
  const sectionProgress = getSectionProgress(currentSection);
  const overallProgress = getProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = sectionQuestions[currentQuestionIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestionIndex, currentSection]);

  const handleAnswer = (value: string | number) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (!canGoNext()) {
      toast.error("Por favor, responda a questão antes de continuar");
      return;
    }
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestionIndex(0);
    } else {
      // All questions answered, go to results
      setLocation("/resultado");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      const prevSectionQuestions = getSectionQuestions(currentSection - 1);
      setCurrentQuestionIndex(prevSectionQuestions.length - 1);
    }
  };

  const canGoNext = () => {
    if (!currentQuestion) return false;
    const answer = getAnswer(currentQuestion.id);
    // Text questions are optional
    if (currentQuestion.type === "text") return true;
    return answer !== undefined;
  };

  const isLastQuestion = currentSection === totalSections && currentQuestionIndex === sectionQuestions.length - 1;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img src="/images/logo-horizontal.png" alt="Escola do Psicólogo Master" className="h-8" />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <DiagnosticProgress
            currentSection={currentSection}
            totalSections={totalSections}
            overallProgress={overallProgress}
          />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardDescription className="text-primary font-semibold">
              {currentQuestion.section}
            </CardDescription>
            <CardTitle className="text-sm text-muted-foreground">
              Questão {currentQuestionIndex + 1} de {sectionQuestions.length} nesta seção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion.type === "multipleChoice" && (
              <MultipleChoiceQuestion
                question={currentQuestion}
                value={getAnswer(currentQuestion.id) as string}
                onChange={handleAnswer}
              />
            )}
            {currentQuestion.type === "scale" && (
              <ScaleQuestion
                question={currentQuestion}
                value={getAnswer(currentQuestion.id) as number}
                onChange={handleAnswer}
              />
            )}
            {currentQuestion.type === "text" && (
              <TextQuestion
                question={currentQuestion}
                value={getAnswer(currentQuestion.id) as string}
                onChange={handleAnswer}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 1 && currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {sectionQuestions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="bg-primary hover:bg-primary/90"
          >
            {isLastQuestion ? (
              <>
                Ver Resultado
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Próxima
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Section Progress Indicator */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso da seção atual:</span>
            <span className="font-semibold">{Math.round(sectionProgress)}%</span>
          </div>
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${sectionProgress}%` }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Escola do Psicólogo Master. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

