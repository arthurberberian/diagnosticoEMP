import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, TrendingUp, TrendingDown, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";

export default function Result() {
  const [, setLocation] = useLocation();
  const { calculateResult, getProgress } = useDiagnostic();
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null);

  useEffect(() => {
    const progress = getProgress();
    if (progress < 80) {
      // Redirect to diagnostic if not enough questions answered
      setLocation("/diagnostico");
      return;
    }
    setResult(calculateResult());
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando resultado...</p>
      </div>
    );
  }

  const radarData = [
    {
      dimension: "Estrutura",
      value: result.dimensionScores.estrutura,
      fullMark: 40,
    },
    {
      dimension: "Marketing",
      value: result.dimensionScores.marketing,
      fullMark: 40,
    },
    {
      dimension: "Gestão",
      value: result.dimensionScores.gestao,
      fullMark: 24,
    },
    {
      dimension: "Mindset",
      value: result.dimensionScores.mindset,
      fullMark: 25,
    },
    {
      dimension: "Visão",
      value: result.dimensionScores.visao,
      fullMark: 29,
    },
  ];

  const stageColors = {
    1: "oklch(0.70 0.12 50)",
    2: "oklch(0.65 0.15 45)",
    3: "oklch(0.55 0.10 45)",
    4: "oklch(0.45 0.08 45)",
    5: "oklch(0.35 0.06 45)",
  };

  const stageColor = stageColors[result.stage as keyof typeof stageColors];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img src="/images/logo-horizontal.png" alt="Escola do Psicólogo Master" className="h-8" />
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Download className="w-4 h-4 mr-2" />
                Salvar PDF
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Voltar ao início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Result */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Diagnóstico Concluído
          </div>
          
          <h1 className="title-serif text-4xl md:text-6xl font-bold mb-4">
            Seu Estágio: <span style={{ color: stageColor }}>{result.stageTitle}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {result.stageDescription}
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pontuação Total</p>
              <p className="text-4xl font-bold" style={{ color: stageColor }}>
                {result.totalScore}
              </p>
              <p className="text-sm text-muted-foreground">de 158 pontos</p>
            </div>
            
            <Separator orientation="vertical" className="h-16" />
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estágio</p>
              <p className="text-4xl font-bold" style={{ color: stageColor }}>
                {result.stage}
              </p>
              <p className="text-sm text-muted-foreground">de 5 estágios</p>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Análise das 5 Dimensões</CardTitle>
            <CardDescription>
              Visualização do seu desempenho em cada área da prática privada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="oklch(0.92 0.004 286.32)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: "oklch(0.552 0.016 285.938)" }} />
                <PolarRadiusAxis angle={90} domain={[0, 40]} tick={{ fill: "oklch(0.552 0.016 285.938)" }} />
                <Radar
                  name="Sua Pontuação"
                  dataKey="value"
                  stroke={stageColor}
                  fill={stageColor}
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dimension Scores */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pontuação por Dimensão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Estrutura do Negócio", score: result.dimensionScores.estrutura, max: 40 },
              { name: "Marketing e Captação", score: result.dimensionScores.marketing, max: 40 },
              { name: "Gestão e Operação", score: result.dimensionScores.gestao, max: 24 },
              { name: "Mindset e Desenvolvimento", score: result.dimensionScores.mindset, max: 25 },
              { name: "Visão e Objetivos", score: result.dimensionScores.visao, max: 29 },
            ].map((dim, index) => {
              const percentage = (dim.score / dim.max) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{dim.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {dim.score} / {dim.max} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Pontos Fortes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                Áreas de Melhoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recomendações para o Estágio {result.stage}</CardTitle>
            <CardDescription>
              Ações prioritárias para avançar na sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">
                    {index + 1}
                  </Badge>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Plano de Ação de 90 Dias</CardTitle>
            <CardDescription>
              Passos concretos para implementar nas próximas 12 semanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.actionPlan.map((action, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps - Escola */}
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Próximos Passos com a Escola do Psicólogo Master</CardTitle>
            <CardDescription>
              Acelere sua jornada com nossas mentorias especializadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Agora que você conhece seu estágio atual, é hora de dar os próximos passos estratégicos. 
              Na Escola do Psicólogo Master, oferecemos mentorias que combinam conhecimento acadêmico, 
              experiência clínica e competências em gestão para transformar sua prática.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://escoladopsicologo.com.br" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Conhecer Nossas Mentorias
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/logo-horizontal.png" alt="Escola do Psicólogo Master" className="h-8" />
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Escola do Psicólogo Master. Todos os direitos reservados.
            </div>
            <div className="flex gap-4">
              <a href="https://escoladopsicologo.com.br" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                Site
              </a>
              <a href="https://instagram.com/escoladopsicologo" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

