import { useState, useEffect } from "react";
import { diagnosticQuestions, Question } from "@/data/questions";

export interface DiagnosticAnswers {
  [questionId: number]: string | number;
}

export interface DiagnosticResult {
  totalScore: number;
  dimensionScores: {
    estrutura: number;
    marketing: number;
    gestao: number;
    mindset: number;
    visao: number;
  };
  stage: number;
  stageTitle: string;
  stageDescription: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  actionPlan: string[];
}

const STORAGE_KEY = "diagnostico-master-answers";

export function useDiagnostic() {
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [currentSection, setCurrentSection] = useState(1);

  // Load answers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved answers", e);
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  const setAnswer = (questionId: number, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const getAnswer = (questionId: number): string | number | undefined => {
    return answers[questionId];
  };

  const clearAnswers = () => {
    setAnswers({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const calculateResult = (): DiagnosticResult => {
    const dimensionScores = {
      estrutura: 0,
      marketing: 0,
      gestao: 0,
      mindset: 0,
      visao: 0,
    };

    // Calculate scores for each dimension
    diagnosticQuestions.forEach((question) => {
      const answer = answers[question.id];
      if (answer === undefined || !question.dimension) return;

      let points = 0;

      if (question.type === "multipleChoice") {
        const option = question.options?.find((opt) => opt.value === answer);
        points = option?.points || 0;
      } else if (question.type === "scale") {
        const scaleValue = typeof answer === "number" ? answer : parseInt(answer as string);
        // For question 33 (sobrecarga), invert the score
        if (question.id === 33) {
          points = 10 - scaleValue;
        } else {
          points = scaleValue;
        }
      }

      dimensionScores[question.dimension] += points;
    });

    const totalScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0);

    // Determine stage based on total score
    let stage = 1;
    let stageTitle = "";
    let stageDescription = "";

    if (totalScore <= 40) {
      stage = 1;
      stageTitle = "O Início";
      stageDescription = "Validação da ideia, primeiros clientes, estrutura básica";
    } else if (totalScore <= 70) {
      stage = 2;
      stageTitle = "A Estruturação";
      stageDescription = "Sistemas, processos, agenda 60-80% ocupada";
    } else if (totalScore <= 100) {
      stage = 3;
      stageTitle = "O Crescimento";
      stageDescription = "Agenda cheia, diversificação, preparação para equipe";
    } else if (totalScore <= 130) {
      stage = 4;
      stageTitle = "A Liderança";
      stageDescription = "Equipe de 2-10 profissionais, gestão de pessoas";
    } else {
      stage = 5;
      stageTitle = "A Prosperidade";
      stageDescription = "Múltiplas unidades, produtos escaláveis, legado";
    }

    // Identify strengths and weaknesses
    const dimensionNames = {
      estrutura: "Estrutura do Negócio",
      marketing: "Marketing e Captação",
      gestao: "Gestão e Operação",
      mindset: "Mindset e Desenvolvimento",
      visao: "Visão e Objetivos",
    };

    const dimensionMaxScores = {
      estrutura: 40,
      marketing: 40,
      gestao: 24,
      mindset: 25,
      visao: 29,
    };

    const dimensionPercentages = Object.entries(dimensionScores).map(([dim, score]) => ({
      dimension: dim as keyof typeof dimensionScores,
      name: dimensionNames[dim as keyof typeof dimensionScores],
      score,
      maxScore: dimensionMaxScores[dim as keyof typeof dimensionScores],
      percentage: (score / dimensionMaxScores[dim as keyof typeof dimensionScores]) * 100,
    }));

    const sortedByPercentage = [...dimensionPercentages].sort((a, b) => b.percentage - a.percentage);

    const strengths = sortedByPercentage
      .slice(0, 2)
      .filter((d) => d.percentage >= 50)
      .map((d) => d.name);

    const weaknesses = sortedByPercentage
      .slice(-2)
      .filter((d) => d.percentage < 50)
      .map((d) => d.name);

    // Generate recommendations based on stage
    const recommendations = getRecommendations(stage, weaknesses);
    const actionPlan = getActionPlan(stage, weaknesses);

    return {
      totalScore,
      dimensionScores,
      stage,
      stageTitle,
      stageDescription,
      strengths: strengths.length > 0 ? strengths : ["Continue desenvolvendo todas as áreas"],
      weaknesses: weaknesses.length > 0 ? weaknesses : ["Mantenha o equilíbrio entre todas as dimensões"],
      recommendations,
      actionPlan,
    };
  };

  const getProgress = (): number => {
    const totalQuestions = diagnosticQuestions.length;
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getSectionProgress = (sectionNumber: number): number => {
    const sectionQuestions = diagnosticQuestions.filter((q) => q.sectionNumber === sectionNumber);
    const answeredInSection = sectionQuestions.filter((q) => answers[q.id] !== undefined).length;
    return (answeredInSection / sectionQuestions.length) * 100;
  };

  return {
    answers,
    setAnswer,
    getAnswer,
    clearAnswers,
    calculateResult,
    currentSection,
    setCurrentSection,
    getProgress,
    getSectionProgress,
  };
}

function getRecommendations(stage: number, weaknesses: string[]): string[] {
  const baseRecommendations: { [key: number]: string[] } = {
    1: [
      "Formalize sua prática com CNPJ e estrutura legal básica",
      "Defina seu nicho e público-alvo com clareza",
      "Crie presença digital básica (site ou página profissional)",
      "Estabeleça processos simples de agendamento e atendimento",
      "Invista em formação clínica e supervisão",
    ],
    2: [
      "Implemente sistemas de gestão (software de agendamento e prontuário)",
      "Documente seus processos operacionais",
      "Desenvolva estratégia de marketing consistente",
      "Separe completamente finanças pessoais e profissionais",
      "Construa rede de encaminhadores",
    ],
    3: [
      "Diversifique suas fontes de receita (grupos, supervisão, produtos digitais)",
      "Prepare-se para liderar uma equipe",
      "Otimize sua precificação e margem de lucro",
      "Invista em marketing avançado (tráfego pago, funil de vendas)",
      "Desenvolva mentalidade empreendedora",
    ],
    4: [
      "Recrute e treine profissionais para sua equipe",
      "Implemente cultura organizacional clara",
      "Delegue tarefas operacionais",
      "Foque em gestão estratégica e liderança",
      "Expanda presença de marca (autoridade, palestras, publicações)",
    ],
    5: [
      "Planeje expansão geográfica ou novas unidades",
      "Crie produtos escaláveis (cursos online, assinaturas)",
      "Desenvolva sucessão e autonomia da operação",
      "Invista em inovação e diferenciação",
      "Construa legado e impacto de longo prazo",
    ],
  };

  return baseRecommendations[stage] || [];
}

function getActionPlan(stage: number, weaknesses: string[]): string[] {
  const plans: { [key: number]: string[] } = {
    1: [
      "Semana 1-2: Abrir CNPJ e regularizar documentação",
      "Semana 3-4: Criar presença digital básica (perfil profissional ou site simples)",
      "Semana 5-6: Definir nicho e público-alvo específico",
      "Semana 7-8: Estabelecer processo de captação de primeiros clientes",
      "Semana 9-10: Implementar sistema básico de agendamento",
      "Semana 11-12: Buscar supervisão clínica e formação continuada",
    ],
    2: [
      "Semana 1-2: Implementar software de gestão (agendamento + prontuário)",
      "Semana 3-4: Documentar processos operacionais principais",
      "Semana 5-6: Criar calendário de conteúdo para redes sociais",
      "Semana 7-8: Separar finanças e criar controle de fluxo de caixa",
      "Semana 9-10: Mapear e ativar rede de encaminhadores",
      "Semana 11-12: Fazer curso de gestão de consultório",
    ],
    3: [
      "Semana 1-2: Analisar precificação e reajustar valores",
      "Semana 3-4: Criar primeiro produto/serviço adicional (grupo ou supervisão)",
      "Semana 5-6: Implementar funil de marketing digital",
      "Semana 7-8: Testar tráfego pago (Google Ads ou Instagram Ads)",
      "Semana 9-10: Fazer curso de liderança e gestão de pessoas",
      "Semana 11-12: Planejar contratação de primeiro profissional",
    ],
    4: [
      "Semana 1-2: Recrutar e contratar primeiro(s) profissional(is)",
      "Semana 3-4: Implementar processo de onboarding e treinamento",
      "Semana 5-6: Definir cultura organizacional e valores da clínica",
      "Semana 7-8: Delegar tarefas operacionais para equipe ou assistente",
      "Semana 9-10: Focar em estratégia de expansão de marca",
      "Semana 11-12: Planejar segunda unidade ou expansão de serviços",
    ],
    5: [
      "Semana 1-2: Mapear oportunidades de expansão geográfica",
      "Semana 3-4: Desenvolver primeiro produto digital escalável",
      "Semana 5-6: Implementar sistema de gestão de múltiplas unidades",
      "Semana 7-8: Criar plano de sucessão e autonomia operacional",
      "Semana 9-10: Investir em inovação (novas modalidades, tecnologias)",
      "Semana 11-12: Definir legado e impacto de longo prazo",
    ],
  };

  return plans[stage] || [];
}

