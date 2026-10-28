/*
 * AICP forms schema (PT / EN).
 * Field types: text, textarea, date, radio (single choice), check (multiple choice),
 * table (rows of text cells; rows can be added), radioTable (rows with a fixed single-choice column).
 * Each label is an object {pt, en, es, it}: L("português", "English", "español", "italiano"). To edit the forms, edit this file only.
 */
const L = (pt, en, es, it) => ({ pt, en, es, it });

const YN = [L("Não", "No", "No", "No"), L("Sim", "Yes", "Sí", "Sì")];
const SNA = [L("S", "Y", "S", "S"), L("N", "N", "N", "N"), L("NA", "NA", "NA", "NA")];

window.AICP_SCHEMA = {
  meta: {
    title: L("AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)"),
    subtitle: L("Formulários de curadoria de artigos gerados por IA",
                "Curation forms for AI-generated articles", "Formularios de curaduría de artículos generados por IA", "Moduli di curatela di articoli generati dall'IA"),
    intro: L("Seis formulários, um por fase, para anexar ao artigo curado. Extensão do modelo 5R (Bain et al., 2002) com uma nova fase, Reconciling (Costa et al., 2026).",
             "Six forms, one per phase, to attach to the curated article. An extension of the 5R model (Bain et al., 2002) with a new phase, Reconciling (Costa et al., 2026).", "Seis formularios, uno por fase, para adjuntar al artículo curado. Extensión del modelo 5R (Bain et al., 2002) con una nueva fase, Reconciling (Costa et al., 2026).", "Sei moduli, uno per fase, da allegare all'articolo curato. Estensione del modello 5R (Bain et al., 2002) con una nuova fase, Reconciling (Costa et al., 2026)."),
    howto: [
      L("Preencha por ordem (Fases 1 a 6). O processo é iterativo: pode regressar a fases anteriores quando surgir nova evidência e deve registar esse regresso.",
        "Complete the forms in order (Phases 1 to 6). The process is iterative: you may return to earlier phases when new evidence emerges, and should record that return.", "Complete los formularios en orden (Fases 1 a 6). El proceso es iterativo: puede volver a fases anteriores cuando surja nueva evidencia y debe registrar ese regreso.", "Compilare i moduli in ordine (Fasi 1-6). Il processo è iterativo: è possibile tornare a fasi precedenti quando emergono nuove evidenze, e tale ritorno va registrato."),
      L("Os formulários são formativos. \"Sim\" e \"Não\" descrevem o que foi feito; não medem certo ou errado nem autorizam o uso do artigo.",
        "The forms are formative. \"Yes\" and \"No\" describe what was done; they do not measure right or wrong, nor do they authorise use of the article.", "Los formularios son formativos. \"Sí\" y \"No\" describen lo que se hizo; no miden lo correcto o incorrecto ni autorizan el uso del artículo.", "I moduli sono formativi. \"Sì\" e \"No\" descrivono ciò che è stato fatto; non misurano giusto o sbagliato né autorizzano l'uso dell'articolo."),
      L("A Fase 5 exige um segundo grupo que não participou na produção do artigo. Uma opinião livre, sem confronto estruturado, é um levantamento de conceções, não é Reconciling.",
        "Phase 5 requires a second group that was not involved in producing the article. Free opinion without structured comparison is a survey of conceptions, not Reconciling.", "La Fase 5 exige un segundo grupo que no haya participado en la producción del artículo. Una opinión libre, sin contraste estructurado, es un relevamiento de concepciones, no es Reconciling.", "La Fase 5 richiede un secondo gruppo che non abbia partecipato alla produzione dell'articolo. Un'opinione libera, senza confronto strutturato, è una rilevazione di concezioni, non è Reconciling."),
      L("Guarde o texto original gerado (Fase 1) e anexe estes formulários ao artigo final. Não registe dados pessoais ou confidenciais nos campos.",
        "Keep the original generated text (Phase 1) and attach these forms to the final article. Do not record personal or confidential data in the fields.", "Guarde el texto original generado (Fase 1) y adjunte estos formularios al artículo final. No registre datos personales o confidenciales en los campos.", "Conservare il testo originale generato (Fase 1) e allegare questi moduli all'articolo finale. Non registrare dati personali o riservati nei campi."),
      L("A responsabilidade pela decisão e pelo texto final permanece nas pessoas, e fica documentada na Fase 6.",
        "Responsibility for the decision and the final text remains with people, and is documented in Phase 6.", "La responsabilidad por la decisión y por el texto final recae en las personas y queda documentada en la Fase 6.", "La responsabilità della decisione e del testo finale resta alle persone e viene documentata nella Fase 6.")
    ],
    references: L("Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.",
                  "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.", "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.", "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.")
  },

  sections: [
    {
      id: "id", kind: "intro",
      title: L("Identificação do processo", "Process identification", "Identificación del proceso", "Identificazione del processo"),
      blocks: [{
        id: "id", fields: [
          { id: "title", type: "text", label: L("Título ou tema do artigo analisado", "Title or topic of the article analysed", "Título o tema del artículo analizado", "Titolo o tema dell'articolo analizzato") },
          { id: "code", type: "text", label: L("Código do registo", "Record code", "Código del registro", "Codice del registro"), hint: L("ex.: AICP-2026-001", "e.g. AICP-2026-001", "p. ej.: AICP-2026-001", "es.: AICP-2026-001") },
          { id: "curator", type: "text", label: L("Curador(a) responsável", "Responsible curator", "Curador(a) responsable", "Curatore/curatrice responsabile") },
          { id: "reviewers", type: "text", label: L("Orientador(a) / revisor(es)", "Supervisor / reviewer(s)", "Director(a) / revisor(es)", "Relatore/relatrice / revisore/i") },
          { id: "institution", type: "text", label: L("Instituição / unidade", "Institution / unit", "Institución / unidad", "Istituzione / unità") },
          { id: "purpose", type: "text", label: L("Finalidade da utilização prevista", "Intended use", "Finalidad del uso previsto", "Finalità dell'uso previsto"), hint: L("ex.: submissão, trabalho curricular, base de revisão, avaliação", "e.g. submission, coursework, basis for a review, assessment", "p. ej.: envío a revista, trabajo curricular, base de revisión, evaluación", "es.: invio a rivista, lavoro curricolare, base di revisione, valutazione") },
          { id: "start", type: "date", label: L("Data de início", "Start date", "Fecha de inicio", "Data di inizio") },
          { id: "end", type: "date", label: L("Data de conclusão", "Completion date", "Fecha de finalización", "Data di conclusione") }
        ]
      }, {
        id: "control", title: L("Controlo das fases", "Phase control", "Control de las fases", "Controllo delle fasi"), fields: [
          { id: "phases", type: "table", fixedRows: true,
            columns: [L("Fase", "Phase", "Fase", "Fase"), L("Concluída (data)", "Completed (date)", "Completada (fecha)", "Completata (data)"), L("Responsável", "Responsible", "Responsable", "Responsabile")],
            rowLabels: [L("1 · Reporting", "1 · Reporting", "1 · Reporting", "1 · Reporting"), L("2 · Relating", "2 · Relating", "2 · Relating", "2 · Relating"), L("3 · Responding", "3 · Responding", "3 · Responding", "3 · Responding"),
                        L("4 · Reasoning", "4 · Reasoning", "4 · Reasoning", "4 · Reasoning"), L("5 · Reconciling", "5 · Reconciling", "5 · Reconciling", "5 · Reconciling"), L("6 · Reconstructing", "6 · Reconstructing", "6 · Reconstructing", "6 · Reconstructing")] }
        ]
      }]
    },

    {
      id: "p1", phase: 1,
      title: L("Fase 1 · Reporting", "Phase 1 · Reporting", "Fase 1 · Reporting", "Fase 1 · Reporting"),
      subtitle: L("Registo de proveniência (Provenance Record)", "Provenance Record", "Registro de procedencia (Provenance Record)", "Registro di provenienza (Provenance Record)"),
      prompt: L("Como foi produzido este artigo? Registar as condições de produção antes de o avaliar.",
                "How was this article produced? Record the conditions of production before assessing it.", "¿Cómo se produjo este artículo? Registrar las condiciones de producción antes de evaluarlo.", "Come è stato prodotto questo articolo? Registrare le condizioni di produzione prima di valutarlo."),
      blocks: [
        { id: "a", title: L("A. Texto analisado", "A. Text analysed", "A. Texto analizado", "A. Testo analizzato"), fields: [
          { id: "type", type: "radio", label: L("Tipo de texto", "Type of text", "Tipo de texto", "Tipo di testo"), other: true,
            options: [L("Artigo científico", "Research article", "Artículo científico", "Articolo scientifico"), L("Revisão", "Review", "Revisión", "Rassegna"), L("Resumo/abstract", "Abstract", "Resumen/abstract", "Abstract"), L("Outro", "Other", "Otro", "Altro")] },
          { id: "degree", type: "radio", label: L("Grau de produção por IA", "Degree of AI production", "Grado de producción por IA", "Grado di produzione da parte dell'IA"),
            options: [L("Totalmente gerado", "Fully generated", "Totalmente generado", "Interamente generato"), L("Parcialmente gerado", "Partly generated", "Parcialmente generado", "Parzialmente generato"), L("Reescrito por IA", "Rewritten by AI", "Reescrito por IA", "Riscritto dall'IA"), L("Não sei", "Don't know", "No sé", "Non so")] },
          { id: "extent", type: "textarea", label: L("Extensão e secções geradas", "Length and sections generated", "Extensión y secciones generadas", "Estensione e sezioni generate"), hint: L("n.º de palavras; secções ou parágrafos produzidos pela IA", "number of words; sections or paragraphs produced by AI", "n.º de palabras; secciones o párrafos producidos por la IA", "n. di parole; sezioni o paragrafi prodotti dall'IA") }
        ]},
        { id: "b", title: L("B. Condições de produção", "B. Conditions of production", "B. Condiciones de producción", "B. Condizioni di produzione"), fields: [
          { id: "tool", type: "text", label: L("Ferramenta e fornecedor", "Tool and provider", "Herramienta y proveedor", "Strumento e fornitore") },
          { id: "model", type: "text", label: L("Modelo e versão", "Model and version", "Modelo y versión", "Modello e versione") },
          { id: "when", type: "text", label: L("Data e hora da geração", "Date and time of generation", "Fecha y hora de la generación", "Data e ora della generazione") },
          { id: "prompt", type: "textarea", rows: 6, label: L("Prompt exato (ou ligação para o ficheiro)", "Exact prompt (or link to file)", "Prompt exacto (o enlace al archivo)", "Prompt esatto (o link al file)"), hint: L("copiar integralmente; incluir instruções de sistema, se conhecidas", "copy in full; include system instructions, if known", "copiar íntegramente; incluir instrucciones de sistema, si se conocen", "copiare integralmente; includere le istruzioni di sistema, se note") },
          { id: "params", type: "textarea", label: L("Parâmetros e funcionalidades ativas", "Parameters and active features", "Parámetros y funcionalidades activas", "Parametri e funzionalità attive"), hint: L("pesquisa na web, ferramentas, memória, temperatura, idioma", "web search, tools, memory, temperature, language", "búsqueda web, herramientas, memoria, temperatura, idioma", "ricerca web, strumenti, memoria, temperatura, lingua") },
          { id: "iterations", type: "textarea", label: L("N.º de tentativas / iterações", "Number of attempts / iterations", "N.º de intentos / iteraciones", "N. di tentativi / iterazioni"), hint: L("esta é a primeira versão gerada? o que mudou entre versões?", "is this the first generated version? what changed between versions?", "¿es la primera versión generada? ¿qué cambió entre versiones?", "è la prima versione generata? cosa è cambiato tra le versioni?") }
        ]},
        { id: "c", title: L("C. Fontes e dados fornecidos à IA", "C. Sources and data provided to the AI", "C. Fuentes y datos proporcionados a la IA", "C. Fonti e dati forniti all'IA"), fields: [
          { id: "docs", type: "radio", label: L("Foram fornecidos documentos ou dados?", "Were documents or data provided?", "¿Se proporcionaron documentos o datos?", "Sono stati forniti documenti o dati?"), options: YN, detailOn: 1, detailLabel: L("Quais", "Which", "Cuáles", "Quali") },
          { id: "refs", type: "radio", label: L("Foram pedidas referências à IA?", "Were references requested from the AI?", "¿Se pidieron referencias a la IA?", "Sono stati chiesti riferimenti bibliografici all'IA?"), options: YN },
          { id: "personal", type: "radio", label: L("Foram inseridos dados pessoais, confidenciais ou inéditos?", "Were personal, confidential or unpublished data entered?", "¿Se introdujeron datos personales, confidenciales o inéditos?", "Sono stati inseriti dati personali, riservati o inediti?"),
            options: [L("Não", "No", "No", "No"), L("Sim, com salvaguardas", "Yes, with safeguards", "Sí, con salvaguardas", "Sì, con garanzie")], detailOn: 1, detailLabel: L("Salvaguardas", "Safeguards", "Salvaguardas", "Garanzie") }
        ]},
        { id: "d", title: L("D. Limites do que se sabe sobre a origem", "D. Limits of what is known about the origin", "D. Límites de lo que se sabe sobre el origen", "D. Limiti di ciò che si sa sull'origine"), fields: [
          { id: "known", type: "textarea", label: L("O que sei sobre a origem do texto", "What I know about the origin of the text", "Lo que sé sobre el origen del texto", "Ciò che so sull'origine del testo") },
          { id: "unknown", type: "textarea", label: L("O que não consigo saber (dados de treino, passos intermédios)", "What I cannot know (training data, intermediate steps)", "Lo que no puedo saber (datos de entrenamiento, pasos intermedios)", "Ciò che non posso sapere (dati di addestramento, passaggi intermedi)") },
          { id: "stored", type: "text", label: L("Original guardado em", "Original stored at", "Original guardado en", "Originale conservato in") },
          { id: "by", type: "text", label: L("Registo feito por", "Record made by", "Registro realizado por", "Registro compilato da") }
        ]}
      ]
    },

    {
      id: "p2", phase: 2,
      title: L("Fase 2 · Relating", "Phase 2 · Relating", "Fase 2 · Relating", "Fase 2 · Relating"),
      subtitle: L("Ancoragem cultural (Cultural Anchoring)", "Cultural Anchoring", "Anclaje cultural (Cultural Anchoring)", "Ancoraggio culturale (Cultural Anchoring)"),
      prompt: L("Com que fontes e conhecimentos posso comparar este artigo?", "Which sources and knowledge can I compare this article with?", "¿Con qué fuentes y conocimientos puedo comparar este artículo?", "Con quali fonti e conoscenze posso confrontare questo articolo?"),
      blocks: [
        { id: "a", title: L("A. Repositório de referência", "A. Reference repository", "A. Repositorio de referencia", "A. Repertorio di riferimento"), fields: [
          { id: "repo", type: "table", rows: 3,
            columns: [L("Fonte consultada (obra, base de dados, diretriz)", "Source consulted (work, database, guideline)", "Fuente consultada (obra, base de datos, directriz)", "Fonte consultata (opera, banca dati, linea guida)"), L("Tipo", "Type", "Tipo", "Tipo"), L("O que permite comparar", "What it allows to compare", "Qué permite comparar", "Cosa permette di confrontare")] }
        ]},
        { id: "b", title: L("B. Verificação de afirmações e referências do artigo", "B. Checking claims and references in the article", "B. Verificación de afirmaciones y referencias del artículo", "B. Verifica di affermazioni e riferimenti dell'articolo"),
          note: L("Existe? / Diz o que o texto afirma? → S = sim, N = não, NV = não consegui verificar", "Exists? / Says what the text claims? → Y = yes, N = no, NV = could not verify", "¿Existe? / ¿Dice lo que el texto afirma? → S = sí, N = no, NV = no pude verificar", "Esiste? / Dice ciò che il testo afferma? → S = sì, N = no, NV = non verificabile"),
          fields: [
          { id: "claims", type: "table", rows: 6,
            columns: [L("Afirmação ou referência no texto", "Claim or reference in the text", "Afirmación o referencia en el texto", "Affermazione o riferimento nel testo"), L("Existe?", "Exists?", "¿Existe?", "Esiste?"), L("Diz o que o texto afirma?", "Says what the text claims?", "¿Dice lo que el texto afirma?", "Dice ciò che il testo afferma?"), L("Fonte / DOI verificado", "Source / DOI checked", "Fuente / DOI verificado", "Fonte / DOI verificato")],
            selectCols: { 1: [L("S", "Y", "S", "S"), L("N", "N", "N", "N"), L("NV", "NV", "NV", "NV")], 2: [L("S", "Y", "S", "S"), L("N", "N", "N", "N"), L("NV", "NV", "NV", "NV")] } }
        ]},
        { id: "c", title: L("C. Comparação com o campo", "C. Comparison with the field", "C. Comparación con el campo", "C. Confronto con il campo"), fields: [
          { id: "converges", type: "textarea", label: L("O que o artigo apresenta e converge com a literatura", "What the article presents that converges with the literature", "Lo que el artículo presenta y converge con la literatura", "Ciò che l'articolo presenta e converge con la letteratura") },
          { id: "absent", type: "textarea", label: L("O que parece ausente (autores, línguas, regiões, perspetivas teóricas)", "What seems absent (authors, languages, regions, theoretical perspectives)", "Lo que parece ausente (autores, lenguas, regiones, perspectivas teóricas)", "Ciò che sembra assente (autori, lingue, regioni, prospettive teoriche)") }
        ]},
        { id: "d", title: L("D. Adequação ao contexto", "D. Fit with the context", "D. Adecuación al contexto", "D. Adeguatezza al contesto"), fields: [
          { id: "currency", type: "textarea", label: L("Atualidade das fontes citadas", "Currency of the sources cited", "Actualidad de las fuentes citadas", "Attualità delle fonti citate"), hint: L("intervalo de anos; obras de referência em falta", "range of years; missing key works", "intervalo de años; obras de referencia que faltan", "intervallo di anni; opere di riferimento mancanti") },
          { id: "context", type: "textarea", label: L("Contexto disciplinar, institucional, cultural e linguístico", "Disciplinary, institutional, cultural and linguistic context", "Contexto disciplinar, institucional, cultural y lingüístico", "Contesto disciplinare, istituzionale, culturale e linguistico"), hint: L("o texto serve o contexto em que será usado?", "does the text serve the context in which it will be used?", "¿sirve el texto al contexto en que se usará?", "il testo serve il contesto in cui sarà usato?") }
        ]}
      ]
    },

    {
      id: "p3", phase: 3,
      title: L("Fase 3 · Responding", "Phase 3 · Responding", "Fase 3 · Responding", "Fase 3 · Responding"),
      subtitle: L("Auditoria de enviesamento e diversidade (Bias and Diversity Audit)", "Bias and Diversity Audit", "Auditoría de sesgos y diversidad (Bias and Diversity Audit)", "Audit dei bias e della diversità (Bias and Diversity Audit)"),
      prompt: L("O que observo e como reajo? Comparar o artigo com variações do prompt.", "What do I observe and how do I respond? Compare the article with variations of the prompt.", "¿Qué observo y cómo reacciono? Comparar el artículo con variaciones del prompt.", "Cosa osservo e come reagisco? Confrontare l'articolo con variazioni del prompt."),
      blocks: [
        { id: "a", title: L("A. Resposta pessoal", "A. Personal response", "A. Respuesta personal", "A. Risposta personale"), fields: [
          { id: "reaction", type: "textarea", label: L("O que me surpreende, incomoda ou convence", "What surprises, troubles or convinces me", "Lo que me sorprende, incomoda o convence", "Ciò che mi sorprende, disturba o convince") },
          { id: "patterns", type: "textarea", label: L("Padrões que encontro no texto", "Patterns I find in the text", "Patrones que encuentro en el texto", "Schemi ricorrenti che trovo nel testo") }
        ]},
        { id: "b", title: L("B. Teste de variação do prompt", "B. Prompt variation test", "B. Prueba de variación del prompt", "B. Prova di variazione del prompt"), fields: [
          { id: "variations", type: "table", rows: 3,
            columns: [L("Variação testada", "Variation tested", "Variación probada", "Variazione provata"), L("Prompt alterado", "Modified prompt", "Prompt modificado", "Prompt modificato"), L("O que mudou na resposta", "What changed in the response", "Qué cambió en la respuesta", "Cosa è cambiato nella risposta")],
            placeholders: [L("ex.: idioma, região, perspetiva teórica", "e.g. language, region, theoretical perspective", "p. ej.: idioma, región, perspectiva teórica", "es.: lingua, regione, prospettiva teorica"), L("ex.: pedir contra-argumentos", "e.g. ask for counter-arguments", "p. ej.: pedir contraargumentos", "es.: chiedere controargomentazioni"), L("ex.: pedir nível de certeza", "e.g. ask for level of certainty", "p. ej.: pedir nivel de certeza", "es.: chiedere il livello di certezza")] }
        ]},
        { id: "c", title: L("C. Verificação de enviesamentos", "C. Bias check", "C. Verificación de sesgos", "C. Verifica dei bias"),
          note: L("S = sim, observado; N = não observado; NA = não avaliado", "Y = yes, observed; N = not observed; NA = not assessed", "S = sí, observado; N = no observado; NA = no evaluado", "S = sì, osservato; N = non osservato; NA = non valutato"),
          fields: [
          { id: "biases", type: "radioTable", options: SNA,
            columns: [L("Aspeto observado", "Aspect observed", "Aspecto observado", "Aspetto osservato"), L("Observado?", "Observed?", "¿Observado?", "Osservato?"), L("Evidência (excerto, linha, página)", "Evidence (excerpt, line, page)", "Evidencia (fragmento, línea, página)", "Evidenza (estratto, riga, pagina)")],
            rowLabels: [
              L("Generalização excessiva (\"todos\", \"em toda a parte\")", "Overgeneralisation (\"all\", \"everywhere\")", "Generalización excesiva (\"todos\", \"en todas partes\")", "Generalizzazione eccessiva (\"tutti\", \"ovunque\")"),
              L("Linguagem de certeza excessiva (\"demonstra\", \"elimina\")", "Overconfident language (\"demonstrates\", \"eliminates\")", "Lenguaje de certeza excesiva (\"demuestra\", \"elimina\")", "Linguaggio di eccessiva certezza (\"dimostra\", \"elimina\")"),
              L("Concordância acrítica com o prompt (sicofancia)", "Uncritical agreement with the prompt (sycophancy)", "Acuerdo acrítico con el prompt (complacencia)", "Accordo acritico con il prompt (compiacenza)"),
              L("Domínio de uma região, língua ou escola teórica", "Dominance of one region, language or theoretical school", "Predominio de una región, lengua o escuela teórica", "Predominio di una regione, lingua o scuola teorica"),
              L("Ausência de vozes, contextos ou grupos", "Absence of voices, contexts or groups", "Ausencia de voces, contextos o grupos", "Assenza di voci, contesti o gruppi"),
              L("Estereótipos (género, cultura, profissão, disciplina)", "Stereotypes (gender, culture, profession, discipline)", "Estereotipos (género, cultura, profesión, disciplina)", "Stereotipi (genere, cultura, professione, disciplina)"),
              L("Simplificação ou deturpação de teorias e autores", "Oversimplification or misrepresentation of theories and authors", "Simplificación o tergiversación de teorías y autores", "Semplificazione o travisamento di teorie e autori"),
              L("Homogeneização do estilo (perda de voz autoral)", "Homogenised style (loss of authorial voice)", "Homogeneización del estilo (pérdida de voz autoral)", "Omogeneizzazione dello stile (perdita della voce autoriale)")
            ] }
        ]},
        { id: "d", title: L("D. Síntese", "D. Summary", "D. Síntesis", "D. Sintesi"), fields: [
          { id: "risks", type: "textarea", label: L("Três principais riscos identificados", "Three main risks identified", "Tres principales riesgos identificados", "Tre principali rischi individuati"), hint: L("ordenar por gravidade", "order by severity", "ordenar por gravedad", "ordinare per gravità") }
        ]}
      ]
    },

    {
      id: "p4", phase: 4,
      title: L("Fase 4 · Reasoning", "Phase 4 · Reasoning", "Fase 4 · Reasoning", "Fase 4 · Reasoning"),
      subtitle: L("Contextualização crítica (Critical Contextualisation)", "Critical Contextualisation", "Contextualización crítica (Critical Contextualisation)", "Contestualizzazione critica (Critical Contextualisation)"),
      prompt: L("Como interpreto o que observei? Separar o que posso afirmar do que apenas infiro.", "How do I interpret what I observed? Separate what I can claim from what I only infer.", "¿Cómo interpreto lo que observé? Separar lo que puedo afirmar de lo que solo infiero.", "Come interpreto ciò che ho osservato? Separare ciò che posso affermare da ciò che soltanto inferisco."),
      blocks: [
        { id: "a", title: L("A. Observado, interpretado, incerto", "A. Observed, interpreted, uncertain", "A. Observado, interpretado, incierto", "A. Osservato, interpretato, incerto"), fields: [
          { id: "oiu", type: "table", rows: 4,
            columns: [L("Observado (posso afirmar, com evidência)", "Observed (I can claim, with evidence)", "Observado (puedo afirmarlo, con evidencia)", "Osservato (posso affermarlo, con evidenze)"), L("Interpretado (estou a inferir)", "Interpreted (I am inferring)", "Interpretado (estoy infiriendo)", "Interpretato (sto inferendo)"), L("Incerto (dúvidas que permanecem)", "Uncertain (remaining doubts)", "Incierto (dudas que persisten)", "Incerto (dubbi che permangono)")] }
        ]},
        { id: "b", title: L("B. Avaliação do artigo como texto científico", "B. Assessment of the article as a scientific text", "B. Evaluación del artículo como texto científico", "B. Valutazione dell'articolo come testo scientifico"), fields: [
          { id: "coherence", type: "radio", label: L("Coerência: pergunta, objetivos, método, resultados e conclusão", "Coherence: question, aims, method, results and conclusion", "Coherencia: pregunta, objetivos, método, resultados y conclusión", "Coerenza: domanda, obiettivi, metodo, risultati e conclusione"),
            options: [L("Adequada", "Adequate", "Adecuada", "Adeguata"), L("Parcial", "Partial", "Parcial", "Parziale"), L("Inadequada", "Inadequate", "Inadecuada", "Inadeguata")] },
          { id: "support", type: "radio", label: L("Suporte teórico e empírico das afirmações", "Theoretical and empirical support for claims", "Fundamentación teórica y empírica de las afirmaciones", "Fondamento teorico ed empirico delle affermazioni"),
            options: [L("Adequado", "Adequate", "Adecuada", "Adeguato"), L("Parcial", "Partial", "Parcial", "Parziale"), L("Inadequado", "Inadequate", "Inadecuada", "Inadeguato")] },
          { id: "limits", type: "radio", label: L("Limitações e incertezas declaradas pelo texto", "Limitations and uncertainties stated by the text", "Limitaciones e incertidumbres declaradas por el texto", "Limiti e incertezze dichiarati dal testo"),
            options: [L("Sim", "Yes", "Sí", "Sì"), L("Parcialmente", "Partly", "Parcialmente", "In parte"), L("Não", "No", "No", "No")] },
          { id: "expertise", type: "radio", label: L("Tenho conhecimento suficiente do tema para avaliar o texto?", "Do I have enough knowledge of the topic to assess the text?", "¿Tengo conocimiento suficiente del tema para evaluar el texto?", "Ho una conoscenza sufficiente del tema per valutare il testo?"),
            options: [L("Sim", "Yes", "Sí", "Sì"), L("Parcialmente", "Partly", "Parcialmente", "In parte"), L("Não: consultar especialista", "No: consult an expert", "No: consultar a un especialista", "No: consultare un esperto")] }
        ]},
        { id: "c", title: L("C. Integridade e direitos", "C. Integrity and rights", "C. Integridad y derechos", "C. Integrità e diritti"), fields: [
          { id: "plagiarism", type: "radio", label: L("Semelhança com fontes existentes verificada (plágio)", "Similarity with existing sources checked (plagiarism)", "Similitud con fuentes existentes verificada (plagio)", "Somiglianza con fonti esistenti verificata (plagio)"),
            options: [L("Sim", "Yes", "Sí", "Sì"), L("Não", "No", "No", "No"), L("Não aplicável", "Not applicable", "No aplicable", "Non applicabile")], detailOn: 0, detailLabel: L("Ferramenta", "Tool", "Herramienta", "Strumento") },
          { id: "rights", type: "radio", label: L("Autoria, propriedade intelectual e privacidade analisadas", "Authorship, intellectual property and privacy analysed", "Autoría, propiedad intelectual y privacidad analizadas", "Paternità, proprietà intellettuale e privacy analizzate"),
            options: [L("Sim", "Yes", "Sí", "Sì"), L("Não", "No", "No", "No"), L("Pendente", "Pending", "Pendiente", "In sospeso")] }
        ]},
        { id: "d", title: L("D. Texto curatorial (obrigatório se o artigo for divulgado além de quem o criou)", "D. Curatorial text (required if the article is shared beyond its creators)", "D. Texto curatorial (obligatorio si el artículo se difunde más allá de quienes lo crearon)", "D. Testo curatoriale (obbligatorio se l'articolo è diffuso oltre chi lo ha creato)"), fields: [
          { id: "curatorial", type: "textarea", rows: 6, maxWords: 150, label: L("Ambiguidades por resolver, registadas como evidência analítica", "Unresolved ambiguities, recorded as analytical evidence", "Ambigüedades por resolver, registradas como evidencia analítica", "Ambiguità irrisolte, registrate come evidenza analitica"), hint: L("até 150 palavras", "up to 150 words", "hasta 150 palabras", "fino a 150 parole") }
        ]}
      ]
    },

    {
      id: "p5", phase: 5,
      title: L("Fase 5 · Reconciling", "Phase 5 · Reconciling", "Fase 5 · Reconciling", "Fase 5 · Reconciling"),
      subtitle: L("Validação cruzada humana e comunitária (Human–Community Cross-Validation)", "Human–Community Cross-Validation", "Validación cruzada humana y comunitaria (Human–Community Cross-Validation)", "Validazione incrociata umana e comunitaria (Human–Community Cross-Validation)"),
      prompt: L("O que dizem outras pessoas? Um segundo grupo, independente da produção, revê o artigo e as Fases 1 a 4.", "What do others say? A second group, independent of the production, reviews the article and Phases 1 to 4.", "¿Qué dicen otras personas? Un segundo grupo, independiente de la producción, revisa el artículo y las Fases 1 a 4.", "Cosa dicono altre persone? Un secondo gruppo, indipendente dalla produzione, rivede l'articolo e le Fasi 1-4."),
      blocks: [
        { id: "a", title: L("A. Segundo grupo revisor", "A. Second reviewing group", "A. Segundo grupo revisor", "A. Secondo gruppo di revisione"), fields: [
          { id: "group", type: "table", rows: 3,
            columns: [L("Nome ou código", "Name or code", "Nombre o código", "Nome o codice"), L("Papel (par, docente, especialista, comunidade)", "Role (peer, teacher, expert, community)", "Rol (par, docente, especialista, comunidad)", "Ruolo (pari, docente, esperto, comunità)"), L("Independente da produção?", "Independent of production?", "¿Independiente de la producción?", "Indipendente dalla produzione?"), L("Data da revisão", "Review date", "Fecha de la revisión", "Data della revisione")],
            selectCols: { 2: [L("Sim", "Yes", "Sí", "Sì"), L("Não", "No", "No", "No")] } },
          { id: "consent", type: "radio", label: L("Consentimento e salvaguardas", "Consent and safeguards", "Consentimiento y salvaguardas", "Consenso e garanzie"),
            options: [L("Não aplicável", "Not applicable", "No aplicable", "Non applicabile"), L("Obtido", "Obtained", "Obtenido", "Ottenuto"), L("Pendente", "Pending", "Pendiente", "In sospeso")] },
          { id: "reviewed", type: "check", label: L("O que o grupo reviu", "What the group reviewed", "Qué revisó el grupo", "Cosa ha rivisto il gruppo"),
            options: [L("Artigo", "Article", "Artículo", "Articolo"), L("Registo (F1)", "Record (P1)", "Registro (F1)", "Registro (F1)"), L("Repositório (F2)", "Repository (P2)", "Repositorio (F2)", "Repertorio (F2)"), L("Auditoria (F3)", "Audit (P3)", "Auditoría (F3)", "Audit (F3)"), L("Contextualização (F4)", "Contextualisation (P4)", "Contextualización (F4)", "Contestualizzazione (F4)")] }
        ]},
        { id: "b", title: L("B. Resultado da revisão", "B. Review outcome", "B. Resultado de la revisión", "B. Esito della revisione"), fields: [
          { id: "agree", type: "textarea", label: L("Em que concordamos", "Where we agree", "En qué coincidimos", "Su cosa concordiamo") },
          { id: "disagree", type: "textarea", label: L("Em que discordamos", "Where we disagree", "En qué discrepamos", "Su cosa discordiamo") },
          { id: "reconsider", type: "textarea", label: L("O que preciso de reconsiderar", "What I need to reconsider", "Qué necesito reconsiderar", "Cosa devo riconsiderare") }
        ]},
        { id: "c", title: L("C. Divergências e resolução", "C. Divergences and resolution", "C. Divergencias y resolución", "C. Divergenze e risoluzione"), fields: [
          { id: "divergences", type: "table", rows: 3,
            columns: [L("Ponto de divergência", "Point of divergence", "Punto de divergencia", "Punto di divergenza"), L("Posição do curador", "Curator's position", "Posición del curador", "Posizione del curatore"), L("Posição do revisor", "Reviewer's position", "Posición del revisor", "Posizione del revisore"), L("Resolução", "Resolution", "Resolución", "Risoluzione")],
            selectCols: { 3: [L("Consenso", "Consensus", "Consenso", "Consenso"), L("Mantidas ambas as leituras", "Both readings kept", "Se mantienen ambas lecturas", "Mantenute entrambe le letture"), L("Escalado a terceiro", "Escalated to a third party", "Escalado a un tercero", "Rimesso a un terzo")] } }
        ]},
        { id: "d", title: L("D. Seguimento", "D. Follow-up", "D. Seguimiento", "D. Seguito"),
          note: L("Se os estudantes ou o curador apenas exprimem opiniões livres, sem confrontar o artigo com um segundo grupo independente, não é Reconciling: é brainstorming ou levantamento de conceções, e deve ser registado como tal.",
                  "If students or the curator only express free opinions, without comparing the article with an independent second group, this is not Reconciling: it is brainstorming or a survey of conceptions, and should be recorded as such.", "Si los estudiantes o el curador solo expresan opiniones libres, sin contrastar el artículo con un segundo grupo independiente, no es Reconciling: es una lluvia de ideas o un relevamiento de concepciones, y debe registrarse como tal.", "Se gli studenti o il curatore esprimono solo opinioni libere, senza confrontare l'articolo con un secondo gruppo indipendente, non si tratta di Reconciling: è un brainstorming o una rilevazione di concezioni, e va registrato come tale."),
          fields: [
          { id: "goback", type: "radio", label: L("É necessário regressar a fases anteriores?", "Is it necessary to return to earlier phases?", "¿Es necesario volver a fases anteriores?", "È necessario tornare a fasi precedenti?"), options: YN, detailOn: 1, detailLabel: L("Fase(s)", "Phase(s)", "Fase(s)", "Fase/i") }
        ]}
      ]
    },

    {
      id: "p6", phase: 6,
      title: L("Fase 6 · Reconstructing", "Phase 6 · Reconstructing", "Fase 6 · Reconstructing", "Fase 6 · Reconstructing"),
      subtitle: L("Decisão curatorial documentada (Documented Curatorial Decision)", "Documented Curatorial Decision", "Decisión curatorial documentada (Documented Curatorial Decision)", "Decisione curatoriale documentata (Documented Curatorial Decision)"),
      prompt: L("O que decido? Uma decisão fundamentada nas Fases 1 a 5, assumida por pessoas e escrita.", "What do I decide? A decision grounded in Phases 1 to 5, owned by people and written down.", "¿Qué decido? Una decisión fundamentada en las Fases 1 a 5, asumida por personas y escrita.", "Cosa decido? Una decisione fondata sulle Fasi 1-5, assunta da persone e messa per iscritto."),
      blocks: [
        { id: "a", title: L("A. Decisão", "A. Decision", "A. Decisión", "A. Decisione"), fields: [
          { id: "decision", type: "radio", label: L("Decisão sobre o artigo", "Decision about the article", "Decisión sobre el artículo", "Decisione sull'articolo"),
            options: [L("Utilizar", "Use", "Utilizar", "Utilizzare"), L("Utilizar com contextualização", "Use with contextualisation", "Utilizar con contextualización", "Utilizzare con contestualizzazione"), L("Adaptar", "Adapt", "Adaptar", "Adattare"), L("Não utilizar", "Do not use", "No utilizar", "Non utilizzare")] },
          { id: "use", type: "textarea", label: L("Utilização prevista", "Intended use", "Uso previsto", "Uso previsto"), hint: L("onde, para quê, perante que público", "where, for what, for which audience", "dónde, para qué, ante qué público", "dove, per quale scopo, davanti a quale pubblico") },
          { id: "justification", type: "textarea", label: L("Justificação", "Justification", "Justificación", "Motivazione"), hint: L("evidências decisivas das Fases 1 a 5", "decisive evidence from Phases 1 to 5", "evidencias decisivas de las Fases 1 a 5", "evidenze decisive delle Fasi 1-5") }
        ]},
        { id: "b", title: L("B. Condições antes de utilizar", "B. Conditions before use", "B. Condiciones antes de utilizar", "B. Condizioni prima dell'uso"), fields: [
          { id: "conditions", type: "check", label: L("Condições cumpridas", "Conditions met", "Condiciones cumplidas", "Condizioni soddisfatte"),
            options: [L("Todas as referências verificadas na fonte (existem e dizem o que o texto afirma)", "All references checked at source (they exist and say what the text claims)", "Todas las referencias verificadas en la fuente (existen y dicen lo que el texto afirma)", "Tutti i riferimenti verificati alla fonte (esistono e dicono ciò che il testo afferma)"),
                      L("Afirmações factuais e dados verificados", "Factual claims and data checked", "Afirmaciones factuales y datos verificados", "Affermazioni fattuali e dati verificati"),
                      L("Voz e autoria asseguradas (texto reescrito e assumido por quem assina)", "Voice and authorship ensured (text rewritten and owned by the signatories)", "Voz y autoría aseguradas (texto reescrito y asumido por quien firma)", "Voce e paternità garantite (testo riscritto e assunto da chi firma)"),
                      L("Direitos de autor, privacidade e consentimentos tratados", "Copyright, privacy and consents addressed", "Derechos de autor, privacidad y consentimientos atendidos", "Diritto d'autore, privacy e consensi gestiti"),
                      L("Revisão final integral do manuscrito", "Full final review of the manuscript", "Revisión final completa del manuscrito", "Revisione finale completa del manoscritto")] },
          { id: "changes", type: "textarea", label: L("O que será alterado ou rejeitado", "What will be changed or rejected", "Lo que se modificará o rechazará", "Cosa sarà modificato o respinto"), hint: L("partes do texto, números, referências", "parts of the text, figures, references", "partes del texto, cifras, referencias", "parti del testo, cifre, riferimenti") }
        ]},
        { id: "c", title: L("C. Declaração de uso", "C. Use statement", "C. Declaración de uso", "C. Dichiarazione d'uso"), fields: [
          { id: "statement", type: "textarea", rows: 6, label: L("Texto da declaração", "Statement text", "Texto de la declaración", "Testo della dichiarazione"),
            hint: L("modelo: \"Utilizei [ferramenta, versão, data] para [finalidade]. O conteúdo e as referências foram verificados e são da minha responsabilidade.\"",
                    "template: \"I used [tool, version, date] for [purpose]. The content and references were checked and are my responsibility.\"", "modelo: \"Utilicé [herramienta, versión, fecha] para [finalidad]. El contenido y las referencias fueron verificados y son de mi responsabilidad.\"", "modello: \"Ho utilizzato [strumento, versione, data] per [finalità]. Il contenuto e i riferimenti sono stati verificati e sono sotto la mia responsabilità.\"") }
        ]},
        { id: "d", title: L("D. Repositório e aprendizagem", "D. Repository and learning", "D. Repositorio y aprendizaje", "D. Repertorio e apprendimento"), fields: [
          { id: "repoupdate", type: "textarea", label: L("Atualização do repositório da Fase 2", "Update to the Phase 2 repository", "Actualización del repositorio de la Fase 2", "Aggiornamento del repertorio della Fase 2") },
          { id: "next", type: "textarea", label: L("Numa próxima utilização de IA farei diferente", "Next time I use AI I will do differently", "En un próximo uso de IA haré diferente", "In un prossimo uso dell'IA farò diversamente") }
        ]},
        { id: "e", title: L("E. Responsabilidade", "E. Responsibility", "E. Responsabilidad", "E. Responsabilità"), fields: [
          { id: "signCurator", type: "text", label: L("Curador(a) responsável", "Responsible curator", "Curador(a) responsable", "Curatore/curatrice responsabile") },
          { id: "signReviewers", type: "text", label: L("Revisor(es) / orientador(a)", "Reviewer(s) / supervisor", "Revisor(es) / director(a)", "Revisore/i / relatore/relatrice") },
          { id: "signDate", type: "date", label: L("Data", "Date", "Fecha", "Data") },
          { id: "signNote", type: "text", label: L("Assinatura (nome escrito ou iniciais)", "Signature (typed name or initials)", "Firma (nombre escrito o iniciales)", "Firma (nome per esteso o iniziali)") }
        ]}
      ]
    }
  ]
};
