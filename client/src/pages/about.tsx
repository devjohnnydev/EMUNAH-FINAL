import Layout from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4" data-testid="text-about-title">
            Emunah
          </h1>
          <p className="text-xl text-muted-foreground italic" data-testid="text-about-slogan">
            Vista-se com propósito.
          </p>
        </div>

        {/* Conceito Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6" data-testid="text-conceito-title">
            Conceito
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p data-testid="text-conceito-1">
              <strong className="text-foreground">Emunah</strong> nasce da palavra hebraica <em>emuná</em>, que significa <strong className="text-foreground">fé, confiança e firmeza</strong>. Mais do que uma marca de moda evangélica, Emunah é um convite para viver a fé de forma autêntica, expressando valores através da estética e da simplicidade.
            </p>
            <p data-testid="text-conceito-2">
              Seu propósito é inspirar pessoas a vestirem-se com intenção, unindo <strong className="text-foreground">elegância, modéstia e significado</strong> em cada detalhe. Cada peça carrega a essência da confiança em Deus.
            </p>
            <p data-testid="text-conceito-3">
              Traduzida em formas suaves, cores naturais e design atemporal. Os valores da marca refletem o equilíbrio entre beleza e propósito, fé e modernidade, identidade e essência. <strong className="text-foreground">Emunah acredita que se vestir também é um ato de fé.</strong>
            </p>
            <p data-testid="text-conceito-4">
              Uma forma de manifestar o interior no exterior, com graça, propósito e verdade.
            </p>
          </div>
        </section>

        {/* Símbolo Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6" data-testid="text-simbolo-title">
            Conceito do Símbolo
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg text-muted-foreground">
              <p data-testid="text-simbolo-desc">
                O símbolo em formato de folha abstrai a letra "E", sintetizando organicidade e identidade. Sua forma fluida representa equilíbrio, movimento e renovação, expressando de modo minimalista a essência visual da marca.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6 text-center">
                <Leaf className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-medium text-sm" data-testid="text-valor-crescimento">Crescimento</p>
              </Card>
              <Card className="p-6 text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-medium text-sm" data-testid="text-valor-equilibrio">Equilíbrio</p>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-medium text-sm" data-testid="text-valor-renovacao">Renovação</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Paleta de Cores */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6" data-testid="text-paleta-title">
            Paleta de Cores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="h-24" style={{ backgroundColor: '#E5D2C4' }} />
              <div className="p-4">
                <h3 className="font-bold mb-1" data-testid="text-cor-areia">Areia</h3>
                <p className="text-sm text-muted-foreground">#E5D2C4</p>
                <p className="text-xs text-muted-foreground mt-2">Secundária principal: fundos e áreas de respiro, transmite leveza.</p>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-24" style={{ backgroundColor: '#C5A995' }} />
              <div className="p-4">
                <h3 className="font-bold mb-1" data-testid="text-cor-creme">Creme Suave</h3>
                <p className="text-sm text-muted-foreground">#C5A995</p>
                <p className="text-xs text-muted-foreground mt-2">Secundária complementar: detalhes e tipografia, adiciona harmonia.</p>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-24" style={{ backgroundColor: '#520B1B' }} />
              <div className="p-4">
                <h3 className="font-bold mb-1" data-testid="text-cor-borgonha">Borgonha</h3>
                <p className="text-sm text-muted-foreground">#520B1B</p>
                <p className="text-xs text-muted-foreground mt-2">Primária: logotipo e destaques, transmite força e identidade.</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Tom de Voz */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6" data-testid="text-comunicacao-title">
            Tom de Voz / Comunicação
          </h2>
          <Card className="p-8">
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-comunicacao-desc">
              A marca se comunica de forma <strong className="text-foreground">autêntica, clara e criativa</strong>, mantendo um tom equilibrado entre profissionalismo e proximidade. Sua linguagem busca inspiração, confiança e originalidade, refletindo a essência e os valores que sustentam sua identidade visual.
            </p>
          </Card>
        </section>

        {/* Encerramento */}
        <section className="text-center max-w-2xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-encerramento">
              A <strong className="text-foreground">Emunah</strong> reflete fé, autenticidade e significado em cada detalhe. Seu nome carrega a essência de acreditar, enquanto o slogan <em>"Vista-se com propósito"</em> traduz o compromisso da marca em unir estilo e consciência, transformando a forma de expressar quem se é.
            </p>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
