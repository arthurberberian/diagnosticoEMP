import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Target, TrendingUp, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark */}
      <section className="section-dark py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-20 right-20 circle-gold w-64 h-64 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 circle-gold w-48 h-48 opacity-10 blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.70_0.12_50)] text-[oklch(0.15_0.01_270)] text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              Baseado em pesquisa internacional sobre private practice
            </div>

            {/* Headline */}
            <h1 className="title-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Descubra em qual estágio da{" "}
              <span className="text-[oklch(0.70_0.12_50)]">maestria clínica</span>{" "}
              você está
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Diagnóstico Master: Mapeie sua jornada do clínico ao empreendedor
            </p>

            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Para psicólogos que querem saber exatamente onde estão na jornada e quais são os próximos passos para alcançar a maestria profissional
            </p>

            {/* CTA */}
            <Link href="/diagnostico">
              <Button size="lg" className="text-lg px-8 py-6 bg-[oklch(0.65_0.15_45)] hover:bg-[oklch(0.60_0.15_45)] text-white">
                Iniciar Meu Diagnóstico Master
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500 mt-4">
              ⏱️ 15-20 minutos • 📊 Relatório personalizado • 🎯 Plano de ação de 90 dias
            </p>
          </div>
        </div>
      </section>

      {/* Problema Section - Light */}
      <section className="section-light py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="title-serif text-3xl md:text-5xl font-bold mb-6 text-center">
              Por que a maioria dos psicólogos fica estagnada?
            </h2>
            <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              Tempo de carreira não significa desenvolvimento do negócio. Muitos profissionais com 10+ anos de formação ainda operam como iniciantes em termos de estruturação, marketing e gestão.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.65_0.15_45)] flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Sem Direção Clara</h3>
                <p className="text-gray-600">
                  Não sabem em qual estágio estão nem quais são os próximos passos estratégicos
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.12_50)] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Crescimento Desordenado</h3>
                <p className="text-gray-600">
                  Tentam fazer tudo ao mesmo tempo sem priorizar o que realmente importa
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.25_0.02_270)] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Isolamento Profissional</h3>
                <p className="text-gray-600">
                  Não têm referências claras de onde deveriam estar em cada fase da jornada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solução Section - Dark */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="title-serif text-3xl md:text-5xl font-bold mb-6 text-center text-white">
              O Diagnóstico Master avalia{" "}
              <span className="text-[oklch(0.70_0.12_50)]">5 dimensões</span>
            </h2>
            <p className="text-lg text-center text-gray-300 mb-12">
              Um mapeamento completo da sua prática privada
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Estrutura do Negócio",
                  description: "Formalização legal, infraestrutura, processos documentados e sistemas operacionais",
                  points: 40,
                },
                {
                  title: "Marketing e Captação",
                  description: "Presença digital, estratégias ativas, resultados mensuráveis e fluxo de novos clientes",
                  points: 40,
                },
                {
                  title: "Gestão e Operação",
                  description: "Eficiência operacional, delegação, precificação estratégica e lucratividade",
                  points: 24,
                },
                {
                  title: "Mindset e Desenvolvimento",
                  description: "Mentalidade empreendedora, formação contínua e conforto com negócios",
                  points: 25,
                },
                {
                  title: "Visão e Objetivos",
                  description: "Clareza de futuro, ambição estratégica e comprometimento com crescimento",
                  points: 29,
                },
              ].map((dimension, index) => (
                <div key={index} className="bg-[oklch(0.20_0.01_270)] p-6 rounded-lg border border-[oklch(0.30_0.02_270)]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-white mb-2">
                        {index + 1}. {dimension.title}
                      </h3>
                      <p className="text-gray-300">{dimension.description}</p>
                    </div>
                    <div className="ml-4 px-3 py-1 rounded-full bg-[oklch(0.70_0.12_50)] text-[oklch(0.15_0.01_270)] font-bold text-sm">
                      {dimension.points} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[oklch(0.70_0.12_50)] rounded-lg text-center">
              <p className="text-[oklch(0.15_0.01_270)] font-bold text-xl">
                Total: 158 pontos • 5 Estágios de Desenvolvimento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section - Light */}
      <section className="section-light py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="title-serif text-3xl md:text-5xl font-bold mb-6 text-center">
              Como funciona o diagnóstico
            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {[
                { step: "1", title: "53 Questões Estratégicas", description: "Responda perguntas sobre sua prática atual" },
                { step: "2", title: "Cálculo Automático", description: "Sistema analisa suas respostas em tempo real" },
                { step: "3", title: "Relatório Personalizado", description: "Receba seu estágio e análise detalhada" },
                { step: "4", title: "Plano de Ação", description: "Próximos passos específicos para 90 dias" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[oklch(0.65_0.15_45)] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/diagnostico">
                <Button size="lg" className="text-lg px-8 py-6 bg-[oklch(0.65_0.15_45)] hover:bg-[oklch(0.60_0.15_45)] text-white">
                  Começar Minha Avaliação Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Estágios Section - Dark */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="title-serif text-3xl md:text-5xl font-bold mb-6 text-center text-white">
              Os 5 Estágios da Jornada
            </h2>
            <p className="text-lg text-center text-gray-300 mb-12">
              Da prática inicial à maestria empreendedora
            </p>

            <div className="space-y-6">
              {[
                {
                  stage: "Estágio 1",
                  title: "O Início",
                  range: "0-40 pontos",
                  description: "Validação da ideia, primeiros clientes, estrutura básica",
                  color: "oklch(0.70_0.12_50)",
                },
                {
                  stage: "Estágio 2",
                  title: "A Estruturação",
                  range: "41-70 pontos",
                  description: "Sistemas, processos, agenda 60-80% ocupada",
                  color: "oklch(0.65_0.15_45)",
                },
                {
                  stage: "Estágio 3",
                  title: "O Crescimento",
                  range: "71-100 pontos",
                  description: "Agenda cheia, diversificação, preparação para equipe",
                  color: "oklch(0.55_0.10_45)",
                },
                {
                  stage: "Estágio 4",
                  title: "A Liderança",
                  range: "101-130 pontos",
                  description: "Equipe de 2-10 profissionais, gestão de pessoas",
                  color: "oklch(0.45_0.08_45)",
                },
                {
                  stage: "Estágio 5",
                  title: "A Prosperidade",
                  range: "131-158 pontos",
                  description: "Múltiplas unidades, produtos escaláveis, legado",
                  color: "oklch(0.35_0.06_45)",
                },
              ].map((stage, index) => (
                <div key={index} className="bg-[oklch(0.20_0.01_270)] p-6 rounded-lg border-l-4" style={{ borderLeftColor: stage.color }}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-gray-400">{stage.stage}</span>
                        <h3 className="font-bold text-2xl text-white">{stage.title}</h3>
                      </div>
                      <p className="text-gray-300">{stage.description}</p>
                    </div>
                    <div className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: stage.color, color: 'oklch(0.15 0.01 270)' }}>
                      {stage.range}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Escola Section - Light */}
      <section className="section-light py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <img src="/images/logo-circular-preto.png" alt="Escola do Psicólogo Master" className="w-32 h-32" />
            </div>
            
            <h2 className="title-serif text-3xl md:text-4xl font-bold mb-6 text-center">
              Sobre a Escola do Psicólogo Master
            </h2>
            
            <p className="text-lg text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              Na Escola do Psicólogo Master, transcendemos os métodos tradicionais de aprendizado em psicologia, oferecendo uma experiência única de mentoria que combina conhecimento acadêmico rigoroso, vasta experiência clínica e competências avançadas em gestão.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: CheckCircle2, title: "Experiência Clínica", description: "18+ anos de prática efetiva" },
                { icon: CheckCircle2, title: "Conhecimento Acadêmico", description: "Mestrado e Doutorado UNIFESP" },
                { icon: CheckCircle2, title: "Habilidades de Gestão", description: "Do clínico ao empreendedor" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="w-12 h-12 mx-auto mb-3 text-[oklch(0.65_0.15_45)]" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="https://escoladopsicologo.com.br" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-[oklch(0.65_0.15_45)] text-[oklch(0.65_0.15_45)] hover:bg-[oklch(0.65_0.15_45)] hover:text-white">
                  Conheça Nossas Mentorias
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section - Dark */}
      <section className="section-dark py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="title-serif text-3xl md:text-5xl font-bold mb-6 text-white">
              Pronto para descobrir seu estágio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Não perca tempo. Comece hoje mesmo e conquiste a maestria que você merece.
            </p>
            <Link href="/diagnostico">
              <Button size="lg" className="text-lg px-8 py-6 bg-[oklch(0.65_0.15_45)] hover:bg-[oklch(0.60_0.15_45)] text-white">
                Iniciar Diagnóstico Master Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.10_0.01_270)] text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/logo-horizontal.png" alt="Escola do Psicólogo Master" className="h-8" />
            </div>
            <div className="text-sm text-center md:text-left">
              © 2025 Escola do Psicólogo Master. Todos os direitos reservados.
            </div>
            <div className="flex gap-4">
              <a href="https://escoladopsicologo.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.65_0.15_45)] transition-colors">
                Site
              </a>
              <a href="https://instagram.com/escoladopsicologo" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.65_0.15_45)] transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

