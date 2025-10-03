// Interface simplificada para doenças com conteúdo educacional
export interface SimplifiedDisease {
  id: string;
  name: string;
  category: 'neurological' | 'cardiac' | 'respiratory' | 'metabolic' | 'genetic' | 'oncological';
  forChildren: string;
  forParents: string;
  scientific: string;
  symptoms: string[];
  treatments: string[];
  supportOrganizations: string[];
  faqs?: Array<{
    question: string;
    answer: string;
    audience: 'children' | 'parents' | 'both';
  }>;
  emoji?: string;
  color?: string;
}

export const cardiacDiseases: SimplifiedDisease[] = [
  {
    id: 'civ',
    name: 'Comunicação Interventricular (CIV)',
    category: 'cardiac',
    forChildren: `
      O coração tem paredes que separam suas partes, como se fossem paradas em uma casa. 🏠❤️
      
      Na CIV, existe um buraquinho em uma dessas paredes. É como se tivesse uma porta 
      entre dois cômodos que deveria estar fechada.
      
      O sangue passa por esse buraquinho e faz o coração trabalhar mais. Mas não se preocupe! 
      Muitos buraquinhos fecham sozinhos quando a criança cresce, e os que não fecham 
      podem ser consertados pelos médicos! 🩺
    `,
    forParents: `
      A Comunicação Interventricular (CIV) é a cardiopatia congênita mais comum (30-40% dos casos), 
      caracterizada por um defeito no septo ventricular que permite comunicação entre ventrículo 
      direito e esquerdo.
      
      **Classificação por localização:**
      1. **Perimembranosa (80%):** Próxima à valva aórtica
      2. **Muscular (20%):** No septo muscular
      3. **Subaórtica/Supracristal (rara):** Abaixo da válvula aórtica
      4. **Tipo canal AV:** Associada a outras malformações
      
      **Classificação por tamanho:**
      - **Pequena (<3mm):** Assintomática, pode fechar espontaneamente
      - **Moderada (3-6mm):** Sintomas variáveis, avaliação caso a caso
      - **Grande (>6mm):** Sintomática, geralmente requer cirurgia
      
      **Consequências hemodinâmicas:**
      - Shunt esquerda-direita (sangue volta para lado direito)
      - Sobrecarga de volume pulmonar
      - Insuficiência cardíaca congestiva (CIVs grandes)
      - Hipertensão pulmonar progressiva (se não tratada)
      
      **Prognóstico:**
      - CIVs pequenas: 50-75% fecham espontaneamente até 10 anos
      - CIVs grandes: Cirurgia recomendada antes de 1 ano (prevenir hipertensão pulmonar)
    `,
    scientific: `
      A CIV resulta de falha na fusão dos componentes do septo interventricular durante 
      embriogênese (3-8 semanas de gestação), criando shunt intracardíaco esquerda-direita 
      com magnitude dependente do tamanho do defeito e relação resistência vascular sistêmica/pulmonar.
      
      **Fisiopatologia:**
      - Shunt E→D proporcional ao gradiente pressórico e tamanho do defeito
      - Qp:Qs (fluxo pulmonar:sistêmico) determina gravidade
      - Sobrecarga volume átrio e ventrículo esquerdo
      - Hipertensão pulmonar secundária (Síndrome de Eisenmenger em casos não tratados)
      
      **Etiologia:**
      - Maioria esporádica
      - Associação: Síndrome de Down (40% tem cardiopatia, 25% CIV)
      - Exposição teratogênica: álcool, lítio, ácido retinóico
      
      **Diagnóstico:**
      - Ecocardiograma: Gold standard (dimensões, localização, Qp:Qs)
      - Sopro holossistólico grau III-IV/VI (borda esternal esquerda)
      - Cateterismo cardíaco: Se hipertensão pulmonar
      
      **Indicações cirúrgicas:**
      - CIV grande sintomática: <6 meses
      - Qp:Qs >2:1 com sintomas
      - Hipertensão pulmonar
      - Insuficiência aórtica progressiva
    `,
    symptoms: [
      'Sopro cardíaco detectado em exame',
      'Cansaço ao mamar ou se alimentar',
      'Respiração rápida (taquipneia)',
      'Sudorese excessiva durante alimentação',
      'Ganho de peso insuficiente',
      'Infecções respiratórias frequentes',
      'Palidez ou cianose (casos graves)',
      'Desenvolvimento motor lentificado'
    ],
    treatments: [
      'Observação clínica (CIVs pequenas)',
      'Medicações: diuréticos, IECA (insuficiência cardíaca)',
      'Cirurgia cardíaca aberta (correção com patch)',
      'Cateterismo intervencionista (CIVs musculares)',
      'Profilaxia de endocardite (quando indicado)',
      'Acompanhamento cardiológico regular',
      'Suporte nutricional adequado'
    ],
    supportOrganizations: [
      'Pequenos Corações',
      'Instituto do Coração (InCor)',
      'Associação de Cardiopatias Congênitas',
      'Rede de Cardiologia Pediátrica'
    ]
  },
  {
    id: 'tetralogia-fallot',
    name: 'Tetralogia de Fallot',
    category: 'cardiac',
    forChildren: `
      Imagine que o coração é como uma máquina com quatro problemas diferentes acontecendo ao mesmo tempo. 💙
      
      Na Tetralogia de Fallot, o coração tem:
      1. Um buraquinho na parede (CIV)
      2. Uma saída para o pulmão muito apertada
      3. A parede do lado direito muito grossa
      4. Uma artéria grande que fica em lugar errado
      
      Por isso, o sangue não recebe oxigênio suficiente e a pele pode ficar azulada (roxa). 
      Mas os médicos podem fazer uma cirurgia para consertar tudo! 🩺✨
    `,
    forParents: `
      A Tetralogia de Fallot (TOF) é a cardiopatia congênita cianótica mais comum após o primeiro ano de vida.
      
      **As quatro anomalias:**
      1. **CIV (Comunicação Interventricular):** Grande defeito septal
      2. **Estenose pulmonar:** Obstrução do trato de saída do VD
      3. **Cavalgamento da aorta:** Aorta sobreposta ao septo
      4. **Hipertrofia do ventrículo direito:** Secundária à obstrução
      
      **Apresentação clínica:**
      
      **Cianose:**
      - Presente ao nascimento ou desenvolve nos primeiros meses
      - Intensidade varia com grau de estenose pulmonar
      - Baqueteamento digital (dedos em "baqueta de tambor")
      
      **Crises hipercianóticas ("Tet spells"):**
      - Episódios súbitos de cianose intensa
      - Choro inconsolável, dispneia
      - Podem levar à síncope, convulsão, morte
      - **Manejo:** Posição genupeitoral, oxigênio, morfina, betabloqueador
      
      **Tratamento cirúrgico:**
      
      **Opção 1 - Correção total (preferencial):**
      - Idade ideal: 3-6 meses
      - Fechamento da CIV + alívio da estenose pulmonar
      - Sobrevida >95% em centros especializados
      
      **Opção 2 - Paliativa (casos específicos):**
      - Shunt sistêmico-pulmonar (Blalock-Taussig)
      - Para prematuros ou anatomia complexa
      - Seguida de correção total posterior
    `,
    scientific: `
      A Tetralogia de Fallot representa uma conotruncal anomaly resultante de desvio anterocefálico 
      do septo infundibular durante septação conotruncal (4-7 semanas gestação), causando as 
      quatro características patognomônicas.
      
      **Fisiopatologia:**
      - Shunt direita-esquerda através da CIV (não restritiva)
      - Grau de cianose proporcional à estenose pulmonar
      - Policitemia compensatória (↑ hematócrito)
      - Hiperviscosidade sanguínea → risco trombótico
      
      **Genética:**
      - Associação: Deleção 22q11 (Síndrome DiGeorge) em 15%
      - Síndrome de Down em 5%
      - Herança multifatorial na maioria
      
      **Variantes anatômicas:**
      - TOF com atresia pulmonar (mais grave)
      - TOF com ausência de valva pulmonar (rara)
      - TOF com dupla via de saída do VD
      
      **Complicações pós-operatórias (longo prazo):**
      - Insuficiência pulmonar residual (comum)
      - Arritmias ventriculares (5-10%)
      - Morte súbita (risco <0.5%/ano)
      - Reoperações (troca valvar pulmonar 10-20 anos após)
      
      **Seguimento:**
      - RM cardíaca periódica (função VD, insuficiência pulmonar)
      - Holter (detecção arritmias)
      - Teste ergométrico (capacidade funcional)
    `,
    symptoms: [
      'Cianose (pele azulada) desde nascimento',
      'Baqueteamento digital (dedos em "palito de tambor")',
      'Cansaço fácil ao esforço',
      'Crises hipercianóticas (bebês)',
      'Posição de cócoras após esforço (crianças)',
      'Sopro cardíaco característico',
      'Atraso no crescimento',
      'Policitemia (sangue "grosso")'
    ],
    treatments: [
      'Cirurgia cardíaca corretiva (3-6 meses)',
      'Betabloqueadores (prevenir crises)',
      'Oxigênio suplementar quando necessário',
      'Prevenção de desidratação (evitar policitemia)',
      'Profilaxia de endocardite bacteriana',
      'Restrição de atividade física intensa (pré-cirurgia)',
      'Acompanhamento cardiológico vitalício',
      'Possível troca valvar na vida adulta'
    ],
    supportOrganizations: [
      'Pequenos Corações',
      'Instituto do Coração (InCor)',
      'Associação de Cardiopatias Congênitas',
      'Fundação do Coração'
    ]
  },
  {
    id: 'diabetes-tipo-1',
    name: 'Diabetes Mellitus Tipo 1',
    category: 'metabolic',
    forChildren: `
      Nosso corpo precisa de açúcar para ter energia, como se fosse gasolina para um carro. 🚗⛽
      
      No diabetes tipo 1, o pâncreas (um órgão dentro da barriga) para de fazer insulina. 
      A insulina é como uma chave que abre a porta para o açúcar entrar nas células.
      
      Sem insulina, o açúcar fica sobrando no sangue e não entra onde precisa. 
      Por isso, a criança precisa tomar insulina todos os dias e medir o açúcar no sangue. 
      
      Com cuidado e tratamento, dá para viver super bem! 🌟💪
    `,
    forParents: `
      O Diabetes Mellitus Tipo 1 (DM1) é uma doença autoimune caracterizada pela destruição das 
      células beta pancreáticas, resultando em deficiência absoluta de insulina.
      
      **Diferença DM1 vs DM2:**
      - **Tipo 1:** Autoimune, início súbito, requer insulina desde diagnóstico
      - **Tipo 2:** Resistência à insulina, gradual, adultos/obesidade (raro em crianças)
      
      **Apresentação inicial:**
      
      **Tríade clássica (4 Ps):**
      1. **Poliúria:** Urinar muito (até na cama após ter parado)
      2. **Polidipsia:** Sede excessiva
      3. **Polifagia:** Fome constante
      4. **Perda de peso:** Apesar de comer muito
      
      **Cetoacidose diabética (CAD):**
      - Emergência médica (30% apresentação inicial)
      - Sintomas: náuseas, vômitos, dor abdominal, respiração rápida, hálito cetônico
      - Requer internação em UTI
      
      **Tratamento diário:**
      
      **Insulina:**
      - **Basal:** Glargina ou detemir (longa ação, 1-2x/dia)
      - **Bolus:** Asparte ou lispro (rápida, antes das refeições)
      - **Bomba de insulina:** Alternativa (infusão contínua)
      
      **Monitoramento:**
      - Glicemia capilar: 4-8x/dia (antes refeições, antes dormir)
      - Hemoglobina glicada (HbA1c): Trimestral (meta <7.5% crianças, <7% adolescentes)
      - CGM (Continuous Glucose Monitor): Freestyle Libre, Dexcom
      
      **Contagem de carboidratos:**
      - Essencial para ajustar dose de insulina
      - 1 unidade insulina para cada 10-15g carboidrato (varia por pessoa)
    `,
    scientific: `
      O DM1 é uma doença autoimune órgão-específica mediada por células T resultando em destruição 
      progressiva das células beta pancreáticas, com perda >90% da massa celular ao diagnóstico.
      
      **Fisiopatologia:**
      - Infiltração linfocítica das ilhotas (insulite)
      - Autoanticorpos: anti-GAD, anti-IA2, anti-ZnT8, anti-insulina
      - Predisposição genética: HLA DR3/DR4-DQ2/DQ8 (95% caucasianos)
      - Fatores ambientais: infecções virais (enterovírus, Coxsackie), vitamina D
      
      **Metabolismo na ausência de insulina:**
      - Hiperglicemia (↓ captação periférica glicose + ↑ produção hepática)
      - Lipólise (↑ ácidos graxos livres)
      - Cetogênese hepática (acetoacetato, β-hidroxibutirato)
      - Cetoacidose metabólica (pH <7.3, bicarbonato <15)
      
      **Complicações crônicas (após anos):**
      
      **Microvasculares:**
      - Retinopatia diabética (principal causa cegueira 20-74 anos)
      - Nefropatia (25-40% desenvolvem)
      - Neuropatia periférica e autonômica
      
      **Macrovasculares:**
      - Doença arterial coronariana (risco 10x maior)
      - AVC
      - Doença arterial periférica
      
      **Prevenção de complicações:**
      - Controle glicêmico rigoroso (HbA1c <7%)
      - Screening anual: microalbuminúria (após 5 anos DM), retinopatia (após puberdade)
      - Controle pressórico e lipídico
    `,
    symptoms: [
      'Sede excessiva (polidipsia)',
      'Urinar muito, inclusive à noite',
      'Fome constante (polifagia)',
      'Perda de peso inexplicada',
      'Cansaço e fraqueza',
      'Visão turva',
      'Infecções frequentes (pele, urinária)',
      'Hálito cetônico (cheiro de maçã)',
      'Náuseas e vômitos (cetoacidose)'
    ],
    treatments: [
      'Insulinoterapia múltiplas doses (basal + bolus)',
      'Bomba de insulina (terapia intensiva)',
      'Monitor contínuo de glicose (CGM)',
      'Contagem de carboidratos',
      'Atividade física regular',
      'Acompanhamento endocrinológico trimestral',
      'Educação em diabetes (paciente e família)',
      'Suporte psicológico',
      'Rastreamento de complicações crônicas'
    ],
    supportOrganizations: [
      'SBD - Sociedade Brasileira de Diabetes',
      'ADJ - Associação de Diabetes Juvenil',
      'IDF - International Diabetes Federation',
      'Grupo de Apoio a Crianças com Diabetes'
    ]
  }
];
