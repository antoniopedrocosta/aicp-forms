/*
 * AICP forms schema (PT / EN).
 * Field types: text, textarea, date, radio (single choice), check (multiple choice),
 * table (rows of text cells; rows can be added), radioTable (rows with a fixed single-choice column).
 * Each label is an object {pt, en}. To edit the forms, edit this file only.
 */
const L = (pt, en) => ({ pt, en });

const YN = [L("Não", "No"), L("Sim", "Yes")];
const SNA = [L("S", "Y"), L("N", "N"), L("NA", "NA")];

window.AICP_SCHEMA = {
  meta: {
    title: L("AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)"),
    subtitle: L("Formulários de curadoria de artigos gerados por IA",
                "Curation forms for AI-generated articles"),
    intro: L("Seis formulários, um por fase, para anexar ao artigo curado. Extensão do modelo 5R (Bain et al., 2002) com uma nova fase, Reconciling (Costa et al., 2026).",
             "Six forms, one per phase, to attach to the curated article. An extension of the 5R model (Bain et al., 2002) with a new phase, Reconciling (Costa et al., 2026)."),
    howto: [
      L("Preencha por ordem (Fases 1 a 6). O processo é iterativo: pode regressar a fases anteriores quando surgir nova evidência e deve registar esse regresso.",
        "Complete the forms in order (Phases 1 to 6). The process is iterative: you may return to earlier phases when new evidence emerges, and should record that return."),
      L("Os formulários são formativos. \"Sim\" e \"Não\" descrevem o que foi feito; não medem certo ou errado nem autorizam o uso do artigo.",
        "The forms are formative. \"Yes\" and \"No\" describe what was done; they do not measure right or wrong, nor do they authorise use of the article."),
      L("A Fase 5 exige um segundo grupo que não participou na produção do artigo. Uma opinião livre, sem confronto estruturado, é um levantamento de conceções, não é Reconciling.",
        "Phase 5 requires a second group that was not involved in producing the article. Free opinion without structured comparison is a survey of conceptions, not Reconciling."),
      L("Guarde o texto original gerado (Fase 1) e anexe estes formulários ao artigo final. Não registe dados pessoais ou confidenciais nos campos.",
        "Keep the original generated text (Phase 1) and attach these forms to the final article. Do not record personal or confidential data in the fields."),
      L("A responsabilidade pela decisão e pelo texto final permanece nas pessoas, e fica documentada na Fase 6.",
        "Responsibility for the decision and the final text remains with people, and is documented in Phase 6.")
    ],
    references: L("Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.",
                  "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.")
  },

  sections: [
    {
      id: "id", kind: "intro",
      title: L("Identificação do processo", "Process identification"),
      blocks: [{
        id: "id", fields: [
          { id: "title", type: "text", label: L("Título ou tema do artigo analisado", "Title or topic of the article analysed") },
          { id: "code", type: "text", label: L("Código do registo", "Record code"), hint: L("ex.: AICP-2026-001", "e.g. AICP-2026-001") },
          { id: "curator", type: "text", label: L("Curador(a) responsável", "Responsible curator") },
          { id: "reviewers", type: "text", label: L("Orientador(a) / revisor(es)", "Supervisor / reviewer(s)") },
          { id: "institution", type: "text", label: L("Instituição / unidade", "Institution / unit") },
          { id: "purpose", type: "text", label: L("Finalidade da utilização prevista", "Intended use"), hint: L("ex.: submissão, trabalho curricular, base de revisão, avaliação", "e.g. submission, coursework, basis for a review, assessment") },
          { id: "start", type: "date", label: L("Data de início", "Start date") },
          { id: "end", type: "date", label: L("Data de conclusão", "Completion date") }
        ]
      }, {
        id: "control", title: L("Controlo das fases", "Phase control"), fields: [
          { id: "phases", type: "table", fixedRows: true,
            columns: [L("Fase", "Phase"), L("Concluída (data)", "Completed (date)"), L("Responsável", "Responsible")],
            rowLabels: [L("1 · Reporting", "1 · Reporting"), L("2 · Relating", "2 · Relating"), L("3 · Responding", "3 · Responding"),
                        L("4 · Reasoning", "4 · Reasoning"), L("5 · Reconciling", "5 · Reconciling"), L("6 · Reconstructing", "6 · Reconstructing")] }
        ]
      }]
    },

    {
      id: "p1", phase: 1,
      title: L("Fase 1 · Reporting", "Phase 1 · Reporting"),
      subtitle: L("Registo de proveniência (Provenance Record)", "Provenance Record"),
      prompt: L("Como foi produzido este artigo? Registar as condições de produção antes de o avaliar.",
                "How was this article produced? Record the conditions of production before assessing it."),
      blocks: [
        { id: "a", title: L("A. Texto analisado", "A. Text analysed"), fields: [
          { id: "type", type: "radio", label: L("Tipo de texto", "Type of text"), other: true,
            options: [L("Artigo científico", "Research article"), L("Revisão", "Review"), L("Resumo/abstract", "Abstract"), L("Outro", "Other")] },
          { id: "degree", type: "radio", label: L("Grau de produção por IA", "Degree of AI production"),
            options: [L("Totalmente gerado", "Fully generated"), L("Parcialmente gerado", "Partly generated"), L("Reescrito por IA", "Rewritten by AI"), L("Não sei", "Don't know")] },
          { id: "extent", type: "textarea", label: L("Extensão e secções geradas", "Length and sections generated"), hint: L("n.º de palavras; secções ou parágrafos produzidos pela IA", "number of words; sections or paragraphs produced by AI") }
        ]},
        { id: "b", title: L("B. Condições de produção", "B. Conditions of production"), fields: [
          { id: "tool", type: "text", label: L("Ferramenta e fornecedor", "Tool and provider") },
          { id: "model", type: "text", label: L("Modelo e versão", "Model and version") },
          { id: "when", type: "text", label: L("Data e hora da geração", "Date and time of generation") },
          { id: "prompt", type: "textarea", rows: 6, label: L("Prompt exato (ou ligação para o ficheiro)", "Exact prompt (or link to file)"), hint: L("copiar integralmente; incluir instruções de sistema, se conhecidas", "copy in full; include system instructions, if known") },
          { id: "params", type: "textarea", label: L("Parâmetros e funcionalidades ativas", "Parameters and active features"), hint: L("pesquisa na web, ferramentas, memória, temperatura, idioma", "web search, tools, memory, temperature, language") },
          { id: "iterations", type: "textarea", label: L("N.º de tentativas / iterações", "Number of attempts / iterations"), hint: L("esta é a primeira versão gerada? o que mudou entre versões?", "is this the first generated version? what changed between versions?") }
        ]},
        { id: "c", title: L("C. Fontes e dados fornecidos à IA", "C. Sources and data provided to the AI"), fields: [
          { id: "docs", type: "radio", label: L("Foram fornecidos documentos ou dados?", "Were documents or data provided?"), options: YN, detailOn: 1, detailLabel: L("Quais", "Which") },
          { id: "refs", type: "radio", label: L("Foram pedidas referências à IA?", "Were references requested from the AI?"), options: YN },
          { id: "personal", type: "radio", label: L("Foram inseridos dados pessoais, confidenciais ou inéditos?", "Were personal, confidential or unpublished data entered?"),
            options: [L("Não", "No"), L("Sim, com salvaguardas", "Yes, with safeguards")], detailOn: 1, detailLabel: L("Salvaguardas", "Safeguards") }
        ]},
        { id: "d", title: L("D. Limites do que se sabe sobre a origem", "D. Limits of what is known about the origin"), fields: [
          { id: "known", type: "textarea", label: L("O que sei sobre a origem do texto", "What I know about the origin of the text") },
          { id: "unknown", type: "textarea", label: L("O que não consigo saber (dados de treino, passos intermédios)", "What I cannot know (training data, intermediate steps)") },
          { id: "stored", type: "text", label: L("Original guardado em", "Original stored at") },
          { id: "by", type: "text", label: L("Registo feito por", "Record made by") }
        ]}
      ]
    },

    {
      id: "p2", phase: 2,
      title: L("Fase 2 · Relating", "Phase 2 · Relating"),
      subtitle: L("Ancoragem cultural (Cultural Anchoring)", "Cultural Anchoring"),
      prompt: L("Com que fontes e conhecimentos posso comparar este artigo?", "Which sources and knowledge can I compare this article with?"),
      blocks: [
        { id: "a", title: L("A. Repositório de referência", "A. Reference repository"), fields: [
          { id: "repo", type: "table", rows: 3,
            columns: [L("Fonte consultada (obra, base de dados, diretriz)", "Source consulted (work, database, guideline)"), L("Tipo", "Type"), L("O que permite comparar", "What it allows to compare")] }
        ]},
        { id: "b", title: L("B. Verificação de afirmações e referências do artigo", "B. Checking claims and references in the article"),
          note: L("Existe? / Diz o que o texto afirma? → S = sim, N = não, NV = não consegui verificar", "Exists? / Says what the text claims? → Y = yes, N = no, NV = could not verify"),
          fields: [
          { id: "claims", type: "table", rows: 6,
            columns: [L("Afirmação ou referência no texto", "Claim or reference in the text"), L("Existe?", "Exists?"), L("Diz o que o texto afirma?", "Says what the text claims?"), L("Fonte / DOI verificado", "Source / DOI checked")],
            selectCols: { 1: [L("S", "Y"), L("N", "N"), L("NV", "NV")], 2: [L("S", "Y"), L("N", "N"), L("NV", "NV")] } }
        ]},
        { id: "c", title: L("C. Comparação com o campo", "C. Comparison with the field"), fields: [
          { id: "converges", type: "textarea", label: L("O que o artigo apresenta e converge com a literatura", "What the article presents that converges with the literature") },
          { id: "absent", type: "textarea", label: L("O que parece ausente (autores, línguas, regiões, perspetivas teóricas)", "What seems absent (authors, languages, regions, theoretical perspectives)") }
        ]},
        { id: "d", title: L("D. Adequação ao contexto", "D. Fit with the context"), fields: [
          { id: "currency", type: "textarea", label: L("Atualidade das fontes citadas", "Currency of the sources cited"), hint: L("intervalo de anos; obras de referência em falta", "range of years; missing key works") },
          { id: "context", type: "textarea", label: L("Contexto disciplinar, institucional, cultural e linguístico", "Disciplinary, institutional, cultural and linguistic context"), hint: L("o texto serve o contexto em que será usado?", "does the text serve the context in which it will be used?") }
        ]}
      ]
    },

    {
      id: "p3", phase: 3,
      title: L("Fase 3 · Responding", "Phase 3 · Responding"),
      subtitle: L("Auditoria de enviesamento e diversidade (Bias and Diversity Audit)", "Bias and Diversity Audit"),
      prompt: L("O que observo e como reajo? Comparar o artigo com variações do prompt.", "What do I observe and how do I respond? Compare the article with variations of the prompt."),
      blocks: [
        { id: "a", title: L("A. Resposta pessoal", "A. Personal response"), fields: [
          { id: "reaction", type: "textarea", label: L("O que me surpreende, incomoda ou convence", "What surprises, troubles or convinces me") },
          { id: "patterns", type: "textarea", label: L("Padrões que encontro no texto", "Patterns I find in the text") }
        ]},
        { id: "b", title: L("B. Teste de variação do prompt", "B. Prompt variation test"), fields: [
          { id: "variations", type: "table", rows: 3,
            columns: [L("Variação testada", "Variation tested"), L("Prompt alterado", "Modified prompt"), L("O que mudou na resposta", "What changed in the response")],
            placeholders: [L("ex.: idioma, região, perspetiva teórica", "e.g. language, region, theoretical perspective"), L("ex.: pedir contra-argumentos", "e.g. ask for counter-arguments"), L("ex.: pedir nível de certeza", "e.g. ask for level of certainty")] }
        ]},
        { id: "c", title: L("C. Verificação de enviesamentos", "C. Bias check"),
          note: L("S = sim, observado; N = não observado; NA = não avaliado", "Y = yes, observed; N = not observed; NA = not assessed"),
          fields: [
          { id: "biases", type: "radioTable", options: SNA,
            columns: [L("Aspeto observado", "Aspect observed"), L("Observado?", "Observed?"), L("Evidência (excerto, linha, página)", "Evidence (excerpt, line, page)")],
            rowLabels: [
              L("Generalização excessiva (\"todos\", \"em toda a parte\")", "Overgeneralisation (\"all\", \"everywhere\")"),
              L("Linguagem de certeza excessiva (\"demonstra\", \"elimina\")", "Overconfident language (\"demonstrates\", \"eliminates\")"),
              L("Concordância acrítica com o prompt (sicofancia)", "Uncritical agreement with the prompt (sycophancy)"),
              L("Domínio de uma região, língua ou escola teórica", "Dominance of one region, language or theoretical school"),
              L("Ausência de vozes, contextos ou grupos", "Absence of voices, contexts or groups"),
              L("Estereótipos (género, cultura, profissão, disciplina)", "Stereotypes (gender, culture, profession, discipline)"),
              L("Simplificação ou deturpação de teorias e autores", "Oversimplification or misrepresentation of theories and authors"),
              L("Homogeneização do estilo (perda de voz autoral)", "Homogenised style (loss of authorial voice)")
            ] }
        ]},
        { id: "d", title: L("D. Síntese", "D. Summary"), fields: [
          { id: "risks", type: "textarea", label: L("Três principais riscos identificados", "Three main risks identified"), hint: L("ordenar por gravidade", "order by severity") }
        ]}
      ]
    },

    {
      id: "p4", phase: 4,
      title: L("Fase 4 · Reasoning", "Phase 4 · Reasoning"),
      subtitle: L("Contextualização crítica (Critical Contextualisation)", "Critical Contextualisation"),
      prompt: L("Como interpreto o que observei? Separar o que posso afirmar do que apenas infiro.", "How do I interpret what I observed? Separate what I can claim from what I only infer."),
      blocks: [
        { id: "a", title: L("A. Observado, interpretado, incerto", "A. Observed, interpreted, uncertain"), fields: [
          { id: "oiu", type: "table", rows: 4,
            columns: [L("Observado (posso afirmar, com evidência)", "Observed (I can claim, with evidence)"), L("Interpretado (estou a inferir)", "Interpreted (I am inferring)"), L("Incerto (dúvidas que permanecem)", "Uncertain (remaining doubts)")] }
        ]},
        { id: "b", title: L("B. Avaliação do artigo como texto científico", "B. Assessment of the article as a scientific text"), fields: [
          { id: "coherence", type: "radio", label: L("Coerência: pergunta, objetivos, método, resultados e conclusão", "Coherence: question, aims, method, results and conclusion"),
            options: [L("Adequada", "Adequate"), L("Parcial", "Partial"), L("Inadequada", "Inadequate")] },
          { id: "support", type: "radio", label: L("Suporte teórico e empírico das afirmações", "Theoretical and empirical support for claims"),
            options: [L("Adequado", "Adequate"), L("Parcial", "Partial"), L("Inadequado", "Inadequate")] },
          { id: "limits", type: "radio", label: L("Limitações e incertezas declaradas pelo texto", "Limitations and uncertainties stated by the text"),
            options: [L("Sim", "Yes"), L("Parcialmente", "Partly"), L("Não", "No")] },
          { id: "expertise", type: "radio", label: L("Tenho conhecimento suficiente do tema para avaliar o texto?", "Do I have enough knowledge of the topic to assess the text?"),
            options: [L("Sim", "Yes"), L("Parcialmente", "Partly"), L("Não: consultar especialista", "No: consult an expert")] }
        ]},
        { id: "c", title: L("C. Integridade e direitos", "C. Integrity and rights"), fields: [
          { id: "plagiarism", type: "radio", label: L("Semelhança com fontes existentes verificada (plágio)", "Similarity with existing sources checked (plagiarism)"),
            options: [L("Sim", "Yes"), L("Não", "No"), L("Não aplicável", "Not applicable")], detailOn: 0, detailLabel: L("Ferramenta", "Tool") },
          { id: "rights", type: "radio", label: L("Autoria, propriedade intelectual e privacidade analisadas", "Authorship, intellectual property and privacy analysed"),
            options: [L("Sim", "Yes"), L("Não", "No"), L("Pendente", "Pending")] }
        ]},
        { id: "d", title: L("D. Texto curatorial (obrigatório se o artigo for divulgado além de quem o criou)", "D. Curatorial text (required if the article is shared beyond its creators)"), fields: [
          { id: "curatorial", type: "textarea", rows: 6, maxWords: 150, label: L("Ambiguidades por resolver, registadas como evidência analítica", "Unresolved ambiguities, recorded as analytical evidence"), hint: L("até 150 palavras", "up to 150 words") }
        ]}
      ]
    },

    {
      id: "p5", phase: 5,
      title: L("Fase 5 · Reconciling", "Phase 5 · Reconciling"),
      subtitle: L("Validação cruzada humana e comunitária (Human–Community Cross-Validation)", "Human–Community Cross-Validation"),
      prompt: L("O que dizem outras pessoas? Um segundo grupo, independente da produção, revê o artigo e as Fases 1 a 4.", "What do others say? A second group, independent of the production, reviews the article and Phases 1 to 4."),
      blocks: [
        { id: "a", title: L("A. Segundo grupo revisor", "A. Second reviewing group"), fields: [
          { id: "group", type: "table", rows: 3,
            columns: [L("Nome ou código", "Name or code"), L("Papel (par, docente, especialista, comunidade)", "Role (peer, teacher, expert, community)"), L("Independente da produção?", "Independent of production?"), L("Data da revisão", "Review date")],
            selectCols: { 2: [L("Sim", "Yes"), L("Não", "No")] } },
          { id: "consent", type: "radio", label: L("Consentimento e salvaguardas", "Consent and safeguards"),
            options: [L("Não aplicável", "Not applicable"), L("Obtido", "Obtained"), L("Pendente", "Pending")] },
          { id: "reviewed", type: "check", label: L("O que o grupo reviu", "What the group reviewed"),
            options: [L("Artigo", "Article"), L("Registo (F1)", "Record (P1)"), L("Repositório (F2)", "Repository (P2)"), L("Auditoria (F3)", "Audit (P3)"), L("Contextualização (F4)", "Contextualisation (P4)")] }
        ]},
        { id: "b", title: L("B. Resultado da revisão", "B. Review outcome"), fields: [
          { id: "agree", type: "textarea", label: L("Em que concordamos", "Where we agree") },
          { id: "disagree", type: "textarea", label: L("Em que discordamos", "Where we disagree") },
          { id: "reconsider", type: "textarea", label: L("O que preciso de reconsiderar", "What I need to reconsider") }
        ]},
        { id: "c", title: L("C. Divergências e resolução", "C. Divergences and resolution"), fields: [
          { id: "divergences", type: "table", rows: 3,
            columns: [L("Ponto de divergência", "Point of divergence"), L("Posição do curador", "Curator's position"), L("Posição do revisor", "Reviewer's position"), L("Resolução", "Resolution")],
            selectCols: { 3: [L("Consenso", "Consensus"), L("Mantidas ambas as leituras", "Both readings kept"), L("Escalado a terceiro", "Escalated to a third party")] } }
        ]},
        { id: "d", title: L("D. Seguimento", "D. Follow-up"),
          note: L("Se os estudantes ou o curador apenas exprimem opiniões livres, sem confrontar o artigo com um segundo grupo independente, não é Reconciling: é brainstorming ou levantamento de conceções, e deve ser registado como tal.",
                  "If students or the curator only express free opinions, without comparing the article with an independent second group, this is not Reconciling: it is brainstorming or a survey of conceptions, and should be recorded as such."),
          fields: [
          { id: "goback", type: "radio", label: L("É necessário regressar a fases anteriores?", "Is it necessary to return to earlier phases?"), options: YN, detailOn: 1, detailLabel: L("Fase(s)", "Phase(s)") }
        ]}
      ]
    },

    {
      id: "p6", phase: 6,
      title: L("Fase 6 · Reconstructing", "Phase 6 · Reconstructing"),
      subtitle: L("Decisão curatorial documentada (Documented Curatorial Decision)", "Documented Curatorial Decision"),
      prompt: L("O que decido? Uma decisão fundamentada nas Fases 1 a 5, assumida por pessoas e escrita.", "What do I decide? A decision grounded in Phases 1 to 5, owned by people and written down."),
      blocks: [
        { id: "a", title: L("A. Decisão", "A. Decision"), fields: [
          { id: "decision", type: "radio", label: L("Decisão sobre o artigo", "Decision about the article"),
            options: [L("Utilizar", "Use"), L("Utilizar com contextualização", "Use with contextualisation"), L("Adaptar", "Adapt"), L("Não utilizar", "Do not use")] },
          { id: "use", type: "textarea", label: L("Utilização prevista", "Intended use"), hint: L("onde, para quê, perante que público", "where, for what, for which audience") },
          { id: "justification", type: "textarea", label: L("Justificação", "Justification"), hint: L("evidências decisivas das Fases 1 a 5", "decisive evidence from Phases 1 to 5") }
        ]},
        { id: "b", title: L("B. Condições antes de utilizar", "B. Conditions before use"), fields: [
          { id: "conditions", type: "check", label: L("Condições cumpridas", "Conditions met"),
            options: [L("Todas as referências verificadas na fonte (existem e dizem o que o texto afirma)", "All references checked at source (they exist and say what the text claims)"),
                      L("Afirmações factuais e dados verificados", "Factual claims and data checked"),
                      L("Voz e autoria asseguradas (texto reescrito e assumido por quem assina)", "Voice and authorship ensured (text rewritten and owned by the signatories)"),
                      L("Direitos de autor, privacidade e consentimentos tratados", "Copyright, privacy and consents addressed"),
                      L("Revisão final integral do manuscrito", "Full final review of the manuscript")] },
          { id: "changes", type: "textarea", label: L("O que será alterado ou rejeitado", "What will be changed or rejected"), hint: L("partes do texto, números, referências", "parts of the text, figures, references") }
        ]},
        { id: "c", title: L("C. Declaração de uso", "C. Use statement"), fields: [
          { id: "statement", type: "textarea", rows: 6, label: L("Texto da declaração", "Statement text"),
            hint: L("modelo: \"Utilizei [ferramenta, versão, data] para [finalidade]. O conteúdo e as referências foram verificados e são da minha responsabilidade.\"",
                    "template: \"I used [tool, version, date] for [purpose]. The content and references were checked and are my responsibility.\"") }
        ]},
        { id: "d", title: L("D. Repositório e aprendizagem", "D. Repository and learning"), fields: [
          { id: "repoupdate", type: "textarea", label: L("Atualização do repositório da Fase 2", "Update to the Phase 2 repository") },
          { id: "next", type: "textarea", label: L("Numa próxima utilização de IA farei diferente", "Next time I use AI I will do differently") }
        ]},
        { id: "e", title: L("E. Responsabilidade", "E. Responsibility"), fields: [
          { id: "signCurator", type: "text", label: L("Curador(a) responsável", "Responsible curator") },
          { id: "signReviewers", type: "text", label: L("Revisor(es) / orientador(a)", "Reviewer(s) / supervisor") },
          { id: "signDate", type: "date", label: L("Data", "Date") },
          { id: "signNote", type: "text", label: L("Assinatura (nome escrito ou iniciais)", "Signature (typed name or initials)") }
        ]}
      ]
    }
  ]
};
