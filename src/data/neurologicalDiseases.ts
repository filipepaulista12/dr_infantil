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

export const neurologicalDiseases: SimplifiedDisease[] = [
  {
    id: 'autismo',
    name: 'Transtorno do Espectro Autista (TEA)',
    category: 'neurological',
    forChildren: `
      Algumas crianças pensam e se comportam de formas diferentes! 🌟
      
      O autismo significa que o cérebro funciona de um jeito especial. Crianças com autismo podem:
      - Ter jeitos únicos de brincar e se comunicar
      - Gostar muito de coisas específicas (como dinossauros ou números)
      - Não gostar de barulhos altos ou luzes muito fortes
      - Ter dificuldade para entender piadas ou sarcasmo
      
      É como se cada pessoa com autismo fosse um tipo especial de super-herói! 🦸‍♂️
    `,
    forParents: `
      O Transtorno do Espectro Autista (TEA) é um transtorno do neurodesenvolvimento caracterizado por 
      diferenças na comunicação social e comportamentos repetitivos ou restritos.
      
      **Características principais:**
      - Dificuldades na comunicação verbal e não-verbal
      - Desafios na interação social
      - Padrões restritos e repetitivos de comportamento
      - Sensibilidade sensorial (sons, luzes, texturas)
      - Interesses intensos e focados
      
      **Espectro significa que:**
      - Cada criança é única (não há dois casos iguais)
      - Níveis de suporte variam (de leve a severo)
      - Habilidades podem ser muito diferentes
      
      **Diagnóstico:**
      - Geralmente identificado entre 18 meses e 3 anos
      - Avaliação multidisciplinar (pediatra, psicólogo, fonoaudiólogo)
      - Escalas e testes específicos (M-CHAT, ADOS)
    `,
    scientific: `
      O TEA é uma perturbação neuropsiquiátrica do desenvolvimento com base neurobiológica, 
      caracterizada por déficits persistentes na comunicação social e interação social, 
      associados a padrões restritos e repetitivos de comportamento, interesses ou atividades.
      
      **Etiologia:**
      - Multifatorial: genética (80-90% herdabilidade) + fatores ambientais
      - Mais de 100 genes associados (SHANK3, CHD8, MECP2)
      - Alterações sinápticas e conectividade neural atípica
      
      **Neurobiologia:**
      - Crescimento cerebral acelerado precoce
      - Alterações no córtex pré-frontal e sistema límbico
      - Disfunção em redes de neurônios-espelho
      - Desbalanço excitação/inibição (E/I)
      
      **Prevalência:**
      - 1 em 36 crianças (CDC, 2023)
      - 4:1 meninos:meninas
      - Incidência global crescente (melhor diagnóstico + fatores desconhecidos)
    `,
    symptoms: [
      'Dificuldade em manter contato visual',
      'Atraso ou ausência de fala',
      'Comportamentos repetitivos (flapping, spinning)',
      'Resistência a mudanças na rotina',
      'Hipersensibilidade ou hiposensibilidade sensorial',
      'Dificuldade em compreender emoções alheias',
      'Interesses intensos e restritos',
      'Dificuldade em fazer amizades'
    ],
    treatments: [
      'Terapia ABA (Applied Behavior Analysis)',
      'Fonoaudiologia',
      'Terapia Ocupacional',
      'Psicoterapia (TCC adaptada)',
      'Musicoterapia',
      'Equoterapia',
      'Intervenção educacional especializada',
      'Medicação (para comorbidades como ansiedade, TDAH)'
    ],
    supportOrganizations: [
      'Instituto Autismo & Vida',
      'APADEM - Associação de Pais e Amigos das Pessoas com Deficiência Mental',
      'AMA - Associação de Amigos do Autista',
      'Revista Autismo',
      'CRI DOWN'
    ],
    faqs: [
      {
        question: 'Meu filho com autismo vai conseguir falar?',
        answer: 'Muitas crianças com autismo desenvolvem a fala, especialmente com intervenção precoce. Algumas podem usar comunicação alternativa (PECS, tablets). O importante é encontrar a melhor forma de comunicação para cada criança.',
        audience: 'parents'
      },
      {
        question: 'Crianças com autismo podem ir à escola regular?',
        answer: 'Sim! Com suporte adequado (auxiliar de sala, adaptações curriculares), muitas crianças com TEA frequentam escolas regulares com sucesso. A inclusão beneficia todas as crianças.',
        audience: 'parents'
      },
      {
        question: 'Por que algumas crianças com autismo não gostam de abraços?',
        answer: 'Para algumas crianças com autismo, toques físicos podem ser desconfortáveis ou até dolorosos por causa da sensibilidade sensorial. Elas ainda amam você, só preferem demonstrar carinho de outras formas!',
        audience: 'children'
      }
    ]
  },
  {
    id: 'paralisia-cerebral',
    name: 'Paralisia Cerebral',
    category: 'neurological',
    forChildren: `
      Algumas crianças nascem com músculos que funcionam de um jeito diferente. 🦾
      
      A paralisia cerebral acontece quando uma parte do cérebro que controla os movimentos 
      não funciona como deveria. Isso pode significar:
      - Ter dificuldade para andar ou correr
      - Usar cadeira de rodas para se locomover
      - Precisar de ajuda para segurar objetos
      - Ter músculos mais duros ou mais moles que o normal
      
      Mas o cérebro que pensa, aprende e sente funciona super bem! 🧠💪
    `,
    forParents: `
      A Paralisia Cerebral (PC) é um grupo de distúrbios permanentes do desenvolvimento motor e postura, 
      causados por lesões no cérebro em desenvolvimento (antes, durante ou após o nascimento).
      
      **Tipos principais:**
      1. **Espástica (70-80%):** Músculos rígidos e tensos
      2. **Discinética (10-20%):** Movimentos involuntários
      3. **Atáxica (5-10%):** Problemas de equilíbrio e coordenação
      4. **Mista:** Combinação de tipos
      
      **Níveis funcionais (GMFCS):**
      - Nível I: Anda sem limitações
      - Nível II: Anda com limitações
      - Nível III: Anda com dispositivos auxiliares
      - Nível IV: Mobilidade com limitações, usa cadeira motorizada
      - Nível V: Mobilidade severamente limitada
      
      **Causas:**
      - Prematuridade extrema
      - Falta de oxigênio no parto (asfixia perinatal)
      - AVC fetal ou neonatal
      - Infecções durante a gravidez (rubéola, toxoplasmose)
      - Kernicterus (icterícia grave não tratada)
    `,
    scientific: `
      A Paralisia Cerebral representa um grupo heterogêneo de encefalopatias não progressivas 
      resultantes de lesões do sistema nervoso central em desenvolvimento, caracterizadas por 
      distúrbios motores permanentes frequentemente acompanhados de comorbidades sensoriais, 
      cognitivas e comportamentais.
      
      **Fisiopatologia:**
      - Lesão primária: encefalopatia hipóxico-isquêmica, leucomalácia periventricular, 
        hemorragia intraventricular
      - Interrupção do desenvolvimento normal da substância branca e cinzenta
      - Reorganização neural adaptativa (neuroplasticidade)
      
      **Classificação topográfica:**
      - Hemiplegia (unilateral)
      - Diplegia (membros inferiores predominantes)
      - Quadriplegia (todos os membros)
      
      **Epidemiologia:**
      - Prevalência: 2-3 por 1000 nascidos vivos
      - Principal causa de deficiência física na infância
      - Comorbidades: epilepsia (30-50%), deficiência intelectual (30-50%), problemas visuais (40%)
    `,
    symptoms: [
      'Atraso no desenvolvimento motor',
      'Tônus muscular anormal (espasticidade ou hipotonia)',
      'Dificuldade de coordenação motora',
      'Movimentos involuntários',
      'Problemas de equilíbrio',
      'Dificuldade para engolir (disfagia)',
      'Contraturas articulares',
      'Marcha anormal'
    ],
    treatments: [
      'Fisioterapia intensiva',
      'Terapia Ocupacional',
      'Fonoaudiologia',
      'Órteses e dispositivos assistivos',
      'Medicações (relaxantes musculares, antiespásticos)',
      'Toxina botulínica (Botox) para espasticidade',
      'Cirurgias ortopédicas',
      'Estimulação elétrica funcional'
    ],
    supportOrganizations: [
      'AACD - Associação de Assistência à Criança Deficiente',
      'Rede SARAH de Hospitais',
      'APAE - Associação de Pais e Amigos dos Excepcionais',
      'ABBR - Associação Brasileira Beneficente de Reabilitação'
    ]
  },
  {
    id: 'hidrocefalia',
    name: 'Hidrocefalia',
    category: 'neurological',
    forChildren: `
      Dentro da nossa cabeça, existe um líquido especial que protege o cérebro. 🧠💧
      
      Na hidrocefalia, esse líquido aumenta muito e faz a cabeça ficar maior. 
      É como se fosse um balão enchendo devagar. Para ajudar, os médicos colocam 
      um tubinho especial (como um canudinho) que tira o líquido extra.
      
      Depois disso, a criança pode brincar, estudar e fazer tudo normalmente! 🎈
    `,
    forParents: `
      A hidrocefalia é o acúmulo excessivo de líquido cefalorraquidiano (LCR) nos ventrículos cerebrais, 
      causando aumento da pressão intracraniana.
      
      **Tipos:**
      1. **Congênita:** Presente ao nascimento (malformações, infecções intrauterinas)
      2. **Adquirida:** Desenvolve após nascimento (meningite, hemorragias, tumores)
      
      **Mecanismos:**
      - **Obstrutiva (não comunicante):** Bloqueio no fluxo de LCR
      - **Não obstrutiva (comunicante):** Problema na absorção do LCR
      
      **Sinais em bebês:**
      - Cabeça aumentando rapidamente
      - Fontanela (moleira) tensa e abaulada
      - Veias do couro cabeludo dilatadas
      - Olhar "do sol poente" (olhos voltados para baixo)
      - Irritabilidade e choro agudo
      
      **Tratamento:**
      - **DVP (Derivação Ventrículo-Peritoneal):** Cateter que drena LCR para abdômen
      - **DVE (Derivação Ventrículo-Endoscópica):** Terceiro ventriculostomia
      - Acompanhamento neurocirúrgico vitalício
    `,
    scientific: `
      Hidrocefalia é definida como dilatação ventricular secundária a desequilíbrio entre produção 
      e absorção de líquido cefalorraquidiano, resultando em hipertensão intracraniana.
      
      **Fisiopatologia:**
      - Produção de LCR: ~500ml/dia (plexos coroides)
      - Absorção: granulações aracnoides (vilosidades de Pacchioni)
      - Pressão intracraniana normal: 5-15 mmHg (crianças)
      
      **Etiologia:**
      - Congênita: estenose aqueduto de Sylvius, malformação de Chiari, mielomeningocele
      - Adquirida: meningite bacteriana, HIV, hemorragia intraventricular prematuridade
      - Tumores: bloqueio por massa
      
      **Complicações:**
      - Déficits cognitivos variáveis
      - Disfunção de derivação (obstrução, infecção)
      - Epilepsia secundária
      - Endocrinopatias (puberdade precoce)
    `,
    symptoms: [
      'Aumento do perímetro cefálico',
      'Fontanela abaulada',
      'Separação de suturas cranianas',
      'Vômitos em jato',
      'Irritabilidade',
      'Sonolência excessiva',
      'Convulsões',
      'Atraso no desenvolvimento'
    ],
    treatments: [
      'Derivação ventrículo-peritoneal (DVP)',
      'Terceiro ventriculostomia endoscópica (TVE)',
      'Monitoramento neurocirúrgico regular',
      'Neuroimagem periódica (TC, RM)',
      'Tratamento de infecções do shunt',
      'Revisão cirúrgica quando necessário'
    ],
    supportOrganizations: [
      'Associação Brasileira de Hidrocefalia e Espinha Bífida',
      'Instituto de Neurocirurgia Pediátrica',
      'Hospitais de referência em neurocirurgia'
    ]
  },
  {
    id: 'epilepsia-infantil',
    name: 'Epilepsia Infantil',
    category: 'neurological',
    forChildren: `
      Às vezes, o cérebro manda sinais elétricos muito rápidos e fortes, como se fosse uma tempestade! ⚡
      
      Quando isso acontece, a criança pode:
      - Ficar parada olhando para o nada por alguns segundos
      - Ter movimentos que ela não controla
      - Cair no chão e se sacudir (convulsão)
      
      Mas não se preocupe! Com remédio e cuidados, muitas crianças ficam bem e vivem normalmente. 
      É importante avisar um adulto quando isso acontecer! 🏥
    `,
    forParents: `
      A epilepsia é uma doença neurológica caracterizada por crises epilépticas recorrentes 
      (duas ou mais crises não provocadas).
      
      **Tipos de crises:**
      
      **Crises focais (parciais):**
      - Início em uma área específica do cérebro
      - Podem ou não alterar consciência
      - Sintomas: movimentos involuntários, sensações estranhas, déjà vu
      
      **Crises generalizadas:**
      - Envolvem ambos hemisférios cerebrais
      - Tipos: tônico-clônicas, ausências, mioclônicas, atônicas
      
      **Síndromes epilépticas pediátricas:**
      - **Epilepsia Rolândica Benigna:** Crises noturnas, bom prognóstico
      - **Síndrome de West:** Espasmos infantis, grave
      - **Síndrome de Lennox-Gastaut:** Múltiplos tipos de crises, difícil controle
      - **Epilepsia Ausência Infantil:** "Desligamentos" breves
      
      **Primeiros socorros durante crise:**
      ✅ Proteger de lesões (afastar objetos)
      ✅ Virar de lado (prevenir aspiração)
      ✅ Cronometrar duração
      ✅ Permanecer com a criança
      ❌ NÃO colocar objetos na boca
      ❌ NÃO segurar com força
      🚨 Chamar emergência se: >5 minutos, primeira crise, lesão grave
    `,
    scientific: `
      Epilepsia é definida pela ILAE como predisposição duradoura a gerar crises epilépticas, 
      caracterizadas por descargas neuronais excessivas e hipersincronizadas.
      
      **Classificação ILAE 2017:**
      - Tipo de crise (focal, generalizada, início desconhecido)
      - Tipo de epilepsia (focal, generalizada, combinada)
      - Síndrome epiléptica
      
      **Fisiopatologia:**
      - Desbalanço excitação (glutamato) / inibição (GABA)
      - Canalopatias (mutações em genes de canais iônicos)
      - Reorganização sináptica pós-lesão
      - Gliose e esclerose mesial temporal
      
      **Etiologia:**
      - Genética (30%): SCN1A, KCNQ2, CDKL5
      - Estrutural: displasia cortical, tumor, AVC
      - Infecciosa: meningite, encefalite
      - Metabólica: erros inatos do metabolismo
      - Imune: encefalite autoimune
      - Desconhecida (40%)
      
      **Epidemiologia:**
      - Prevalência: 0.5-1% população
      - Incidência maior na infância e idosos
      - 70% controlam com medicação
    `,
    symptoms: [
      'Crises convulsivas tônico-clônicas',
      'Ausências (olhar fixo)',
      'Movimentos involuntários repetitivos',
      'Perda súbita de consciência',
      'Aura antes da crise (sensações estranhas)',
      'Confusão pós-ictal',
      'Mordedura de língua',
      'Incontinência urinária durante crise'
    ],
    treatments: [
      'Medicações antiepilépticas (valproato, levetiracetam, lamotrigina)',
      'Dieta cetogênica',
      'Cirurgia de epilepsia (casos refratários)',
      'Estimulador de nervo vago (VNS)',
      'Canabidiol (CBD) - aprovado para síndromes específicas',
      'Evitar gatilhos (privação de sono, luzes piscantes)',
      'Acompanhamento neurológico regular'
    ],
    supportOrganizations: [
      'ABE - Associação Brasileira de Epilepsia',
      'Liga Brasileira de Epilepsia',
      'Epilepsy Foundation',
      'Grupos de apoio locais'
    ]
  }
];
