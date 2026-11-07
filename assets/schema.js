/*
 * AICP forms schema, version 2 (short forms with help and examples).
 * Field types: text, textarea, date, radio (single choice), check (multiple choice),
 * table (rows of text cells; rows can be added), radioTable (rows with a fixed single-choice column).
 * Optional keys: hint (help text), ex (example), optionHints (one help per option),
 * rowHints (one help per fixed row), colExamples (example per column, shown in the first row).
 * Each label is an object {pt, en, es, it}: L("português", "English", "español", "italiano"). To edit the forms, edit this file only.
 * The examples are fictional (a text about burnout in nurses).
 */
const L = (pt, en, es, it) => ({ pt, en, es, it });

const YN = [L("Não", "No", "No", "No"), L("Sim", "Yes", "Sí", "Sì")];
const SPN = [L("Sim", "Yes", "Sí", "Sì"), L("Em parte", "Partly", "En parte", "In parte"), L("Não", "No", "No", "No")];
const CHK = [L("Sim", "Yes", "Sí", "Sì"), L("Não", "No", "No", "No"), L("Não consegui verificar", "Could not verify", "No pude verificar", "Non verificabile")];

window.AICP_SCHEMA = {
  meta: {
    title: L("AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)", "AI Curatorial Protocol (AICP)"),
    subtitle: L("Formulários de curadoria de textos gerados por IA", "Curation forms for AI-generated texts", "Formularios de curaduría de textos generados por IA", "Moduli di curatela di testi generati dall'IA"),
    intro: L("Seis formulários curtos, um por fase, para anexar a qualquer texto produzido com IA generativa (artigo, trabalho académico, relatório, material didático, texto de divulgação, entre outros). Cada campo tem uma ajuda e, quando útil, um exemplo. Extensão do modelo 5R (Bain et al., 2002) com uma nova fase, Reconciling (Costa et al., 2026).",
      "Six short forms, one per phase, to attach to any text produced with generative AI (article, academic assignment, report, teaching material, outreach text, among others). Each field has a help note and, where useful, an example. An extension of the 5R model (Bain et al., 2002) with a new phase, Reconciling (Costa et al., 2026).",
      "Seis formularios breves, uno por fase, para adjuntar a cualquier texto producido con IA generativa (artículo, trabajo académico, informe, material didáctico, texto de divulgación, entre otros). Cada campo tiene una ayuda y, cuando es útil, un ejemplo. Extensión del modelo 5R (Bain et al., 2002) con una nueva fase, Reconciling (Costa et al., 2026).",
      "Sei moduli brevi, uno per fase, da allegare a qualsiasi testo prodotto con l'IA generativa (articolo, elaborato accademico, relazione, materiale didattico, testo divulgativo, tra gli altri). Ogni campo ha un aiuto e, quando utile, un esempio. Estensione del modello 5R (Bain et al., 2002) con una nuova fase, Reconciling (Costa et al., 2026)."),
    howto: [
      L("Preencha por ordem (Fases 1 a 6). Pode voltar a uma fase anterior quando surgir informação nova; registe esse regresso.",
        "Complete the forms in order (Phases 1 to 6). You may go back to an earlier phase when new information emerges; record that return.",
        "Complete los formularios en orden (Fases 1 a 6). Puede volver a una fase anterior cuando surja información nueva; registre ese regreso.",
        "Compilare i moduli in ordine (Fasi 1-6). È possibile tornare a una fase precedente quando emergono nuove informazioni; registrare tale ritorno."),
      L("As ajudas e os exemplos são só orientação. Os exemplos são fictícios (um texto sobre burnout em enfermeiros).",
        "The help notes and examples are guidance only. The examples are fictional (a text about burnout in nurses).",
        "Las ayudas y los ejemplos son solo orientación. Los ejemplos son ficticios (un texto sobre burnout en enfermeros).",
        "Gli aiuti e gli esempi sono solo un orientamento. Gli esempi sono fittizi (un testo sul burnout negli infermieri)."),
      L("\"Sim\" e \"Não\" descrevem o que foi feito; não são certo ou errado. Se não sabe, escreva \"Não sei\": é uma resposta válida.",
        "\"Yes\" and \"No\" describe what was done; they are not right or wrong. If you do not know, write \"Don't know\": it is a valid answer.",
        "\"Sí\" y \"No\" describen lo que se hizo; no son correcto o incorrecto. Si no lo sabe, escriba \"No sé\": es una respuesta válida.",
        "\"Sì\" e \"No\" descrivono ciò che è stato fatto; non sono giusto o sbagliato. Se non lo sa, scriva \"Non so\": è una risposta valida."),
      L("Guarde o texto original gerado e anexe estes formulários ao texto final. Não escreva dados pessoais nos campos.",
        "Keep the original generated text and attach these forms to the final text. Do not write personal data in the fields.",
        "Guarde el texto original generado y adjunte estos formularios al texto final. No escriba datos personales en los campos.",
        "Conservare il testo originale generato e allegare questi moduli al testo finale. Non scrivere dati personali nei campi."),
      L("A decisão e o texto final são sempre da pessoa que assina, nunca da IA.",
        "The decision and the final text always belong to the person who signs, never to the AI.",
        "La decisión y el texto final son siempre de la persona que firma, nunca de la IA.",
        "La decisione e il testo finale sono sempre della persona che firma, mai dell'IA.")
    ],
    references: L("Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.",
                  "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.",
                  "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.",
                  "Bain, J. D., Ballantyne, R., Mills, C., & Lester, N. C. (2002). Reflecting on practice: Student teachers' perspectives. Post Pressed. Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. 조형교육, 99(2), 25–38.")
  },

  sections: [
    {
      id: "id", kind: "intro",
      title: L("Identificação", "Identification", "Identificación", "Identificazione"),
      blocks: [{
        id: "id", fields: [
          { id: "title", type: "text", label: L("Texto analisado", "Text analysed", "Texto analizado", "Testo analizzato"),
            hint: L("Título ou tema do texto gerado por IA que vai avaliar.", "Title or topic of the AI-generated text you will assess.", "Título o tema del texto generado por IA que va a evaluar.", "Titolo o tema del testo generato dall'IA che valuterà."),
            ex: L("Enquadramento sobre burnout em enfermeiros", "Background section on burnout in nurses", "Marco sobre burnout en enfermeros", "Inquadramento sul burnout negli infermieri") },
          { id: "type", type: "radio", label: L("Tipo de texto", "Type of text", "Tipo de texto", "Tipo di testo"), other: true,
            hint: L("O tipo de texto muda o que é preciso verificar: um texto científico exige referências; um material didático exige rigor e adequação aos alunos.", "The type of text changes what needs checking: a scientific text requires references; teaching material requires accuracy and fit with the learners.", "El tipo de texto cambia lo que hay que verificar: un texto científico exige referencias; un material didáctico exige rigor y adecuación al alumnado.", "Il tipo di testo cambia ciò che occorre verificare: un testo scientifico richiede riferimenti; un materiale didattico richiede rigore e adeguatezza agli studenti."),
            options: [L("Científico ou académico", "Scientific or academic", "Científico o académico", "Scientifico o accademico"),
                      L("Didático", "Teaching material", "Didáctico", "Didattico"),
                      L("Divulgação ou jornalismo", "Outreach or journalism", "Divulgación o periodismo", "Divulgazione o giornalismo"),
                      L("Institucional ou profissional", "Institutional or professional", "Institucional o profesional", "Istituzionale o professionale"),
                      L("Criativo", "Creative", "Creativo", "Creativo"),
                      L("Outro", "Other", "Otro", "Altro")] },
          { id: "code", type: "text", label: L("Código do registo", "Record code", "Código del registro", "Codice del registro"),
            hint: L("Um código curto para ligar os formulários ao texto e ao original guardado.", "A short code linking the forms to the text and to the stored original.", "Un código breve para vincular los formularios al texto y al original guardado.", "Un codice breve che collega i moduli al testo e all'originale conservato."),
            ex: L("AICP-2026-001", "AICP-2026-001", "AICP-2026-001", "AICP-2026-001") },
          { id: "curator", type: "text", label: L("Curador(a)", "Curator", "Curador(a)", "Curatore/curatrice"),
            hint: L("Pessoa que preenche e assume a decisão final.", "Person who fills in the forms and owns the final decision.", "Persona que completa los formularios y asume la decisión final.", "Persona che compila i moduli e si assume la decisione finale.") },
          { id: "reviewers", type: "text", label: L("Orientador(a) / revisor(es)", "Supervisor / reviewer(s)", "Director(a) / revisor(es)", "Relatore/relatrice / revisore/i"),
            hint: L("Quem vai rever na Fase 5.", "Who will review in Phase 5.", "Quién revisará en la Fase 5.", "Chi rivedrà nella Fase 5.") },
          { id: "purpose", type: "text", label: L("Para que vai usar o texto?", "What will you use the text for?", "¿Para qué va a usar el texto?", "Per che cosa userà il testo?"),
            hint: L("A utilização prevista muda o rigor necessário.", "The intended use changes the rigour required.", "El uso previsto cambia el rigor necesario.", "L'uso previsto cambia il rigore necessario."),
            ex: L("submissão a revista; trabalho de curso; material de aula; base de leitura", "journal submission; coursework; class material; background reading", "envío a revista; trabajo de curso; material de clase; base de lectura", "invio a rivista; lavoro del corso; materiale didattico; base di lettura") }
        ]
      }, {
        id: "control", title: L("As seis fases em resumo", "The six phases at a glance", "Las seis fases en resumen", "Le sei fasi in sintesi"),
        note: L("Preencha por ordem; pode voltar atrás.", "Fill in order; you may go back.", "Complete en orden; puede volver atrás.", "Compilare in ordine; è possibile tornare indietro."),
        fields: [
          { id: "phases", type: "table", fixedRows: true,
            columns: [L("Fase e pergunta", "Phase and question", "Fase y pregunta", "Fase e domanda"), L("Concluída em", "Completed on", "Completada el", "Completata il")],
            rowLabels: [L("1 · Reporting: Como foi criado?", "1 · Reporting: How was it made?", "1 · Reporting: ¿Cómo se creó?", "1 · Reporting: Come è stato creato?"),
                        L("2 · Relating: O que dizem outras fontes?", "2 · Relating: What do other sources say?", "2 · Relating: ¿Qué dicen otras fuentes?", "2 · Relating: Cosa dicono altre fonti?"),
                        L("3 · Responding: O que observo e como reajo?", "3 · Responding: What do I observe and how do I respond?", "3 · Responding: ¿Qué observo y cómo reacciono?", "3 · Responding: Cosa osservo e come reagisco?"),
                        L("4 · Reasoning: O que posso afirmar com segurança?", "4 · Reasoning: What can I safely claim?", "4 · Reasoning: ¿Qué puedo afirmar con seguridad?", "4 · Reasoning: Cosa posso affermare con sicurezza?"),
                        L("5 · Reconciling: O que dizem os outros?", "5 · Reconciling: What do others say?", "5 · Reconciling: ¿Qué dicen los demás?", "5 · Reconciling: Cosa dicono gli altri?"),
                        L("6 · Reconstructing: O que decido?", "6 · Reconstructing: What do I decide?", "6 · Reconstructing: ¿Qué decido?", "6 · Reconstructing: Cosa decido?")] }
        ]
      }]
    },

    {
      id: "p1", phase: 1,
      title: L("Fase 1 · Reporting", "Phase 1 · Reporting", "Fase 1 · Reporting", "Fase 1 · Reporting"),
      subtitle: L("Registar a origem do texto (Provenance Record)", "Record the origin of the text (Provenance Record)", "Registrar el origen del texto (Provenance Record)", "Registrare l'origine del testo (Provenance Record)"),
      prompt: L("Como foi criado este texto? Anote o que sabe sobre a forma como a IA o produziu.", "How was this text made? Note what you know about how the AI produced it.", "¿Cómo se creó este texto? Anote lo que sabe sobre cómo lo produjo la IA.", "Come è stato creato questo testo? Annoti ciò che sa su come l'IA lo ha prodotto."),
      blocks: [
        { id: "a", title: L("Origem do texto", "Origin of the text", "Origen del texto", "Origine del testo"), fields: [
          { id: "tool", type: "text", label: L("1. Ferramenta e versão", "1. Tool and version", "1. Herramienta y versión", "1. Strumento e versione"),
            hint: L("Nome da ferramenta e, se aparecer, a versão ou o modelo (costuma ver-se no ecrã ou nas definições). Indique se a pesquisa na web estava ativa.", "Name of the tool and, if shown, the version or model (usually visible on screen or in settings). State whether web search was on.", "Nombre de la herramienta y, si aparece, la versión o el modelo (suele verse en pantalla o en la configuración). Indique si la búsqueda web estaba activa.", "Nome dello strumento e, se indicato, la versione o il modello (di solito visibile sullo schermo o nelle impostazioni). Indichi se la ricerca web era attiva."),
            ex: L("ChatGPT, modelo indicado no ecrã, sem pesquisa na web", "ChatGPT, model shown on screen, web search off", "ChatGPT, modelo indicado en pantalla, sin búsqueda web", "ChatGPT, modello indicato sullo schermo, senza ricerca web") },
          { id: "when", type: "text", label: L("2. Data e hora", "2. Date and time", "2. Fecha y hora", "2. Data e ora"),
            hint: L("Os resultados podem mudar com a data e a versão, por isso o registo é importante.", "Results can change with the date and version, so recording them matters.", "Los resultados pueden cambiar con la fecha y la versión; por eso el registro es importante.", "I risultati possono cambiare con la data e la versione, perciò la registrazione è importante."),
            ex: L("12/10/2026, 15h", "12/10/2026, 3 pm", "12/10/2026, 15 h", "12/10/2026, ore 15") },
          { id: "prompt", type: "textarea", rows: 5, label: L("3. Pedido feito (prompt)", "3. Request made (prompt)", "3. Petición realizada (prompt)", "3. Richiesta effettuata (prompt)"),
            hint: L("Copie e cole o pedido tal como o escreveu, incluindo instruções anteriores na mesma conversa. Se fez várias tentativas, diga quantas e qual usou.", "Copy and paste the request exactly as you wrote it, including earlier instructions in the same conversation. If you made several attempts, say how many and which one you used.", "Copie y pegue la petición tal como la escribió, incluidas las instrucciones anteriores en la misma conversación. Si hizo varios intentos, indique cuántos y cuál usó.", "Copi e incolli la richiesta così come l'ha scritta, comprese le istruzioni precedenti nella stessa conversazione. Se ha fatto più tentativi, indichi quanti e quale ha usato."),
            ex: L("«Escreve um parágrafo sobre burnout em enfermeiros portugueses, com referências.»", "\"Write a paragraph on burnout in Portuguese nurses, with references.\"", "«Escribe un párrafo sobre el burnout en enfermeros portugueses, con referencias.»", "«Scrivi un paragrafo sul burnout negli infermieri portoghesi, con riferimenti.»") },
          { id: "degree", type: "radio", label: L("4. Que parte foi gerada pela IA?", "4. Which part was generated by AI?", "4. ¿Qué parte generó la IA?", "4. Quale parte è stata generata dall'IA?"),
            hint: L("\"Reescrita\": o texto original era seu e a IA só o melhorou. Se escolher \"Parte\", indique quais.", "\"Rewrite\": the original text was yours and the AI only improved it. If you choose \"Part\", say which.", "\"Reescritura\": el texto original era suyo y la IA solo lo mejoró. Si elige \"Parte\", indique cuáles.", "\"Riscrittura\": il testo originale era suo e l'IA lo ha solo migliorato. Se sceglie \"Parte\", indichi quali."),
            options: [L("Tudo", "All of it", "Todo", "Tutto"), L("Parte", "Part", "Parte", "Parte"), L("Reescrita de texto meu", "Rewrite of my own text", "Reescritura de un texto mío", "Riscrittura di un mio testo"), L("Não sei", "Don't know", "No sé", "Non so")],
            detailOn: 1, detailLabel: L("Que partes?", "Which parts?", "¿Qué partes?", "Quali parti?") },
          { id: "docs", type: "radio", label: L("5. Deu documentos ou fontes à IA?", "5. Did you give the AI documents or sources?", "5. ¿Proporcionó documentos o fuentes a la IA?", "5. Ha fornito documenti o fonti all'IA?"),
            hint: L("\"Sim\" se anexou ficheiros ou colou textos. Se pediu referências sem dar fontes, a IA pode tê-las inventado.", "\"Yes\" if you attached files or pasted texts. If you asked for references without giving sources, the AI may have invented them.", "\"Sí\" si adjuntó archivos o pegó textos. Si pidió referencias sin dar fuentes, la IA puede haberlas inventado.", "\"Sì\" se ha allegato file o incollato testi. Se ha chiesto riferimenti senza fornire fonti, l'IA potrebbe averli inventati."),
            options: YN, detailOn: 1, detailLabel: L("Quais?", "Which?", "¿Cuáles?", "Quali?") },
          { id: "personal", type: "radio", label: L("6. Usou dados pessoais ou confidenciais?", "6. Did you use personal or confidential data?", "6. ¿Usó datos personales o confidenciales?", "6. Ha usato dati personali o riservati?"),
            hint: L("Ex.: nomes de participantes, entrevistas, textos inéditos. Se \"Sim\", diga como os protegeu.", "E.g. participants' names, interviews, unpublished texts. If \"Yes\", say how you protected them.", "P. ej.: nombres de participantes, entrevistas, textos inéditos. Si \"Sí\", indique cómo los protegió.", "Es.: nomi di partecipanti, interviste, testi inediti. Se \"Sì\", indichi come li ha protetti."),
            options: YN, detailOn: 1, detailLabel: L("Como os protegeu?", "How did you protect them?", "¿Cómo los protegió?", "Come li ha protetti?") },
          { id: "stored", type: "text", label: L("7. Onde guardou o texto original?", "7. Where did you store the original text?", "7. ¿Dónde guardó el texto original?", "7. Dove ha conservato il testo originale?"),
            hint: L("Guarde sempre a versão original, sem edições (ficheiro ou ligação).", "Always keep the original, unedited version (file or link).", "Guarde siempre la versión original, sin ediciones (archivo o enlace).", "Conservi sempre la versione originale, senza modifiche (file o link)."),
            ex: L("pasta AICP-001/original.docx", "folder AICP-001/original.docx", "carpeta AICP-001/original.docx", "cartella AICP-001/original.docx") },
          { id: "unknown", type: "textarea", label: L("8. O que não consegue saber?", "8. What can you not know?", "8. ¿Qué no puede saber?", "8. Che cosa non può sapere?"),
            hint: L("Dizer o que não se sabe faz parte do rigor.", "Stating what is not known is part of rigour.", "Decir lo que no se sabe forma parte del rigor.", "Dire ciò che non si sa fa parte del rigore."),
            ex: L("com que textos a IA aprendeu; que fontes usou", "which texts the AI learned from; which sources it used", "con qué textos aprendió la IA; qué fuentes usó", "su quali testi l'IA ha imparato; quali fonti ha usato") }
        ]}
      ]
    },

    {
      id: "p2", phase: 2,
      title: L("Fase 2 · Relating", "Phase 2 · Relating", "Fase 2 · Relating", "Fase 2 · Relating"),
      subtitle: L("Comparar com fontes de confiança (Cultural Anchoring)", "Compare with trusted sources (Cultural Anchoring)", "Comparar con fuentes de confianza (Cultural Anchoring)", "Confrontare con fonti affidabili (Cultural Anchoring)"),
      prompt: L("O que dizem as fontes que conheço? Compare o texto com fontes fiáveis sobre o tema.", "What do the sources I know say? Compare the text with reliable sources on the topic.", "¿Qué dicen las fuentes que conozco? Compare el texto con fuentes fiables sobre el tema.", "Cosa dicono le fonti che conosco? Confronti il testo con fonti affidabili sul tema."),
      blocks: [
        { id: "a", title: L("A. Fontes de comparação (escolha 2 a 3 fontes fiáveis)", "A. Comparison sources (choose 2 to 3 reliable sources)", "A. Fuentes de comparación (elija 2 a 3 fuentes fiables)", "A. Fonti di confronto (scelga 2-3 fonti affidabili)"),
          note: L("Se o texto não cita fontes (por exemplo, um texto didático ou de divulgação), compare-o com fontes de referência sobre o tema: manual, programa, documento oficial.", "If the text cites no sources (for example, a teaching or outreach text), compare it with reference sources on the topic: textbook, curriculum, official document.", "Si el texto no cita fuentes (por ejemplo, un texto didáctico o de divulgación), compárelo con fuentes de referencia sobre el tema: manual, programa, documento oficial.", "Se il testo non cita fonti (ad esempio un testo didattico o divulgativo), lo confronti con fonti di riferimento sul tema: manuale, programma, documento ufficiale."),
          fields: [
          { id: "sources", type: "table", rows: 3,
            columns: [L("Fonte usada para comparar", "Source used for comparison", "Fuente usada para comparar", "Fonte usata per il confronto"), L("Onde a encontrou", "Where you found it", "Dónde la encontró", "Dove l'ha trovata")],
            colExamples: [L("Ex.: manual de referência da área; artigos recentes sobre o tema", "E.g. key textbook in the field; recent articles on the topic", "P. ej.: manual de referencia del área; artículos recientes sobre el tema", "Es.: manuale di riferimento del settore; articoli recenti sul tema"),
                          L("Ex.: biblioteca, Scopus, SciELO, Google Académico", "E.g. library, Scopus, SciELO, Google Scholar", "P. ej.: biblioteca, Scopus, SciELO, Google Académico", "Es.: biblioteca, Scopus, SciELO, Google Scholar")] }
        ]},
        { id: "b", title: L("B. Verificar referências e afirmações (comece pelas mais importantes)", "B. Check references and claims (start with the most important)", "B. Verificar referencias y afirmaciones (empiece por las más importantes)", "B. Verificare riferimenti e affermazioni (cominci dai più importanti)"),
          note: L("Procure a obra pelo título e pelo DOI. \"Diz o que o texto afirma?\": abra a fonte e confirme a ideia. Antes de usar o texto, todas as referências têm de estar verificadas (Fase 6).", "Search for the work by title and DOI. \"Says what the text claims?\": open the source and confirm the idea. Before using the text, all references must be checked (Phase 6).", "Busque la obra por título y DOI. \"¿Dice lo que el texto afirma?\": abra la fuente y confirme la idea. Antes de usar el texto, todas las referencias deben estar verificadas (Fase 6).", "Cerchi l'opera per titolo e DOI. \"Dice ciò che il testo afferma?\": apra la fonte e confermi l'idea. Prima di usare il testo, tutti i riferimenti devono essere verificati (Fase 6)."),
          fields: [
          { id: "claims", type: "table", rows: 4,
            columns: [L("Afirmação ou referência do texto", "Claim or reference in the text", "Afirmación o referencia del texto", "Affermazione o riferimento del testo"), L("Existe?", "Exists?", "¿Existe?", "Esiste?"), L("Diz o que o texto afirma?", "Says what the text claims?", "¿Dice lo que el texto afirma?", "Dice ciò che il testo afferma?"), L("Onde verificou", "Where you checked", "Dónde lo verificó", "Dove ha verificato")],
            colExamples: [L("Ex.: (Ferreira & Almeida, 2021)", "E.g. (Ferreira & Almeida, 2021)", "P. ej.: (Ferreira & Almeida, 2021)", "Es.: (Ferreira & Almeida, 2021)"), null, null, L("Ex.: Google Académico e DOI", "E.g. Google Scholar and DOI", "P. ej.: Google Académico y DOI", "Es.: Google Scholar e DOI")],
            selectCols: { 1: CHK, 2: CHK } }
        ]},
        { id: "c", title: L("C. Balanço", "C. Overall", "C. Balance", "C. Bilancio"), fields: [
          { id: "converges", type: "textarea", label: L("O que está de acordo com as fontes?", "What agrees with the sources?", "¿Qué coincide con las fuentes?", "Che cosa concorda con le fonti?"),
            hint: L("Ideias do texto que as fontes confirmam.", "Ideas in the text that the sources confirm.", "Ideas del texto que las fuentes confirman.", "Idee del testo che le fonti confermano.") },
          { id: "absent", type: "textarea", label: L("O que falta?", "What is missing?", "¿Qué falta?", "Che cosa manca?"),
            hint: L("Autores, línguas, países ou perspetivas importantes que não aparecem.", "Important authors, languages, countries or perspectives that do not appear.", "Autores, lenguas, países o perspectivas importantes que no aparecen.", "Autori, lingue, paesi o prospettive importanti che non compaiono."),
            ex: L("estudos em português; autores da América Latina", "studies in Portuguese; Latin American authors", "estudios en portugués; autores de América Latina", "studi in portoghese; autori dell'America Latina") },
          { id: "context", type: "radio", label: L("Está atualizado e adequado ao meu contexto?", "Is it up to date and suited to my context?", "¿Está actualizado y adecuado a mi contexto?", "È aggiornato e adeguato al mio contesto?"),
            hint: L("Veja os anos das fontes, quando existam (em geral, os últimos 5 a 10 anos, exceto obras clássicas), e se serve a sua disciplina, o seu público e o seu país.", "Check the years of the sources, where present (generally the last 5 to 10 years, except classic works), and whether it suits your discipline, audience and country.", "Mire los años de las fuentes, cuando existan (en general, los últimos 5 a 10 años, salvo obras clásicas), y si sirve a su disciplina, su público y su país.", "Guardi gli anni delle fonti, se presenti (in genere gli ultimi 5-10 anni, salvo opere classiche), e se è adatto alla sua disciplina, al suo pubblico e al suo paese."),
            options: SPN }
        ]}
      ]
    },

    {
      id: "p3", phase: 3,
      title: L("Fase 3 · Responding", "Phase 3 · Responding", "Fase 3 · Responding", "Fase 3 · Responding"),
      subtitle: L("Testar e procurar sinais de alerta (Bias and Diversity Audit)", "Test and look for warning signs (Bias and Diversity Audit)", "Probar y buscar señales de alerta (Bias and Diversity Audit)", "Testare e cercare segnali d'allarme (Bias and Diversity Audit)"),
      prompt: L("O que observo e como reajo? Procure problemas e veja o que acontece se mudar o pedido.", "What do I observe and how do I respond? Look for problems and see what happens if you change the request.", "¿Qué observo y cómo reacciono? Busque problemas y vea qué ocurre si cambia la petición.", "Cosa osservo e come reagisco? Cerchi problemi e veda cosa succede se cambia la richiesta."),
      blocks: [
        { id: "a", title: L("A. Primeira reação", "A. First reaction", "A. Primera reacción", "A. Prima reazione"), fields: [
          { id: "reaction", type: "textarea", label: L("O que o surpreende, incomoda ou convence?", "What surprises, troubles or convinces you?", "¿Qué le sorprende, incomoda o convence?", "Che cosa la sorprende, la disturba o la convince?"),
            hint: L("Escreva a sua reação espontânea, antes de analisar.", "Write your spontaneous reaction, before analysing.", "Escriba su reacción espontánea, antes de analizar.", "Scriva la sua reazione spontanea, prima di analizzare."),
            ex: L("Convenceu-me porque tem números, mas não os reconheço.", "It convinced me because it has figures, but I don't recognise them.", "Me convenció porque tiene cifras, pero no las reconozco.", "Mi ha convinto perché ha dei numeri, ma non li riconosco.") }
        ]},
        { id: "b", title: L("B. Teste: mude o pedido (peça outra vez à IA, alterando uma coisa)", "B. Test: change the request (ask the AI again, changing one thing)", "B. Prueba: cambie la petición (pida otra vez a la IA, cambiando una cosa)", "B. Prova: cambi la richiesta (chieda di nuovo all'IA, cambiando una cosa)"),
          note: L("Pode mudar o país, a teoria, o idioma ou pedir a opinião contrária. Se a resposta muda muito, o texto não é estável.", "You can change the country, the theory or the language, or ask for the opposite view. If the response changes a lot, the text is not stable.", "Puede cambiar el país, la teoría, el idioma o pedir la opinión contraria. Si la respuesta cambia mucho, el texto no es estable.", "Può cambiare il paese, la teoria, la lingua o chiedere l'opinione contraria. Se la risposta cambia molto, il testo non è stabile."),
          fields: [
          { id: "variations", type: "table", rows: 2,
            columns: [L("O que mudou no pedido", "What changed in the request", "Qué cambió en la petición", "Cosa è cambiato nella richiesta"), L("O que mudou na resposta", "What changed in the response", "Qué cambió en la respuesta", "Cosa è cambiato nella risposta")],
            colExamples: [L("Ex.: pedi contra-argumentos", "E.g. asked for counter-arguments", "P. ej.: pedí contraargumentos", "Es.: ho chiesto controargomentazioni"), L("Ex.: o texto passou a admitir limitações", "E.g. the text began to acknowledge limitations", "P. ej.: el texto pasó a admitir limitaciones", "Es.: il testo ha cominciato ad ammettere limiti")] }
        ]},
        { id: "c", title: L("C. Sinais de alerta", "C. Warning signs", "C. Señales de alerta", "C. Segnali d'allarme"), fields: [
          { id: "signs", type: "radioTable", options: [L("Vi", "Seen", "Lo vi", "Visto"), L("Não vi", "Not seen", "No lo vi", "Non visto")],
            columns: [L("Sinal de alerta", "Warning sign", "Señal de alerta", "Segnale d'allarme"), L("Resposta", "Answer", "Respuesta", "Risposta"), L("Onde (excerto)", "Where (excerpt)", "Dónde (fragmento)", "Dove (estratto)")],
            rowLabels: [
              L("Generaliza demais", "Overgeneralises", "Generaliza demasiado", "Generalizza troppo"),
              L("Fala com certeza demais", "Sounds too certain", "Habla con demasiada certeza", "Parla con troppa certezza"),
              L("Concorda sempre consigo", "Always agrees with you", "Siempre le da la razón", "Le dà sempre ragione"),
              L("Deixa vozes de fora", "Leaves voices out", "Deja voces fuera", "Lascia fuori delle voci"),
              L("Usa estereótipos", "Uses stereotypes", "Usa estereotipos", "Usa stereotipi"),
              L("Simplifica ou apaga o seu estilo", "Oversimplifies or erases your style", "Simplifica o borra su estilo", "Semplifica o cancella il suo stile")],
            rowHints: [
              L("Usa \"todos\", \"sempre\", \"em toda a Europa\" sem provas.", "Uses \"all\", \"always\", \"across Europe\" without evidence.", "Usa \"todos\", \"siempre\", \"en toda Europa\" sin pruebas.", "Usa \"tutti\", \"sempre\", \"in tutta Europa\" senza prove."),
              L("Diz \"prova\", \"elimina\", \"demonstra\" sem dados que o sustentem.", "Says \"proves\", \"eliminates\", \"demonstrates\" without supporting data.", "Dice \"prueba\", \"elimina\", \"demuestra\" sin datos que lo sostengan.", "Dice \"prova\", \"elimina\", \"dimostra\" senza dati a sostegno."),
              L("Se pedir o contrário, também concorda? A IA tende a agradar.", "If you ask for the opposite, does it agree too? AI tends to please.", "Si pide lo contrario, ¿también está de acuerdo? La IA tiende a complacer.", "Se chiede il contrario, è d'accordo lo stesso? L'IA tende a compiacere."),
              L("Só aparecem autores ou exemplos de um país, língua ou escola teórica.", "Only authors or examples from one country, language or school of thought appear.", "Solo aparecen autores o ejemplos de un país, lengua o escuela teórica.", "Compaiono solo autori o esempi di un paese, una lingua o una scuola teorica."),
              L("Associa grupos a papéis ou características (género, idade, cultura, profissão).", "Links groups to roles or traits (gender, age, culture, profession).", "Asocia grupos a papeles o características (género, edad, cultura, profesión).", "Associa gruppi a ruoli o caratteristiche (genere, età, cultura, professione)."),
              L("Resume ideias ou autores de forma pobre, ou o texto soa genérico.", "Summarises ideas or authors poorly, or the text sounds generic.", "Resume ideas o autores de forma pobre, o el texto suena genérico.", "Riassume idee o autori in modo povero, o il testo suona generico.")] }
        ]},
        { id: "d", title: L("D. Resumo", "D. Summary", "D. Resumen", "D. Sintesi"), fields: [
          { id: "risk", type: "textarea", label: L("Principal risco encontrado", "Main risk found", "Principal riesgo encontrado", "Rischio principale individuato"),
            hint: L("O problema mais grave que viu (uma frase).", "The most serious problem you saw (one sentence).", "El problema más grave que vio (una frase).", "Il problema più grave che ha visto (una frase)."),
            ex: L("Referências inventadas e certeza excessiva.", "Invented references and overconfidence.", "Referencias inventadas y certeza excesiva.", "Riferimenti inventati e certezza eccessiva.") }
        ]}
      ]
    },

    {
      id: "p4", phase: 4,
      title: L("Fase 4 · Reasoning", "Phase 4 · Reasoning", "Fase 4 · Reasoning", "Fase 4 · Reasoning"),
      subtitle: L("Pensar com cuidado (Critical Contextualisation)", "Think carefully (Critical Contextualisation)", "Pensar con cuidado (Critical Contextualisation)", "Pensare con attenzione (Critical Contextualisation)"),
      prompt: L("O que posso afirmar com segurança? Separe o que sabe do que apenas supõe.", "What can I safely claim? Separate what you know from what you only assume.", "¿Qué puedo afirmar con seguridad? Separe lo que sabe de lo que solo supone.", "Cosa posso affermare con sicurezza? Separi ciò che sa da ciò che soltanto suppone."),
      blocks: [
        { id: "a", title: L("A. Três colunas (escreva 2 a 3 frases em cada)", "A. Three columns (write 2 to 3 sentences in each)", "A. Tres columnas (escriba 2 a 3 frases en cada una)", "A. Tre colonne (scriva 2-3 frasi in ciascuna)"), fields: [
          { id: "oiu", type: "table", rows: 2,
            columns: [L("Observado (tenho prova)", "Observed (I have evidence)", "Observado (tengo pruebas)", "Osservato (ho prove)"), L("Interpretado (estou a deduzir)", "Interpreted (I am inferring)", "Interpretado (estoy deduciendo)", "Interpretato (sto deducendo)"), L("Incerto (não sei)", "Uncertain (I don't know)", "Incierto (no lo sé)", "Incerto (non lo so)")],
            colExamples: [L("Ex.: as 2 referências não existem", "E.g. the 2 references do not exist", "P. ej.: las 2 referencias no existen", "Es.: i 2 riferimenti non esistono"), L("Ex.: burnout e sobrecarga parecem relacionados", "E.g. burnout and workload seem related", "P. ej.: burnout y sobrecarga parecen relacionados", "Es.: burnout e sovraccarico sembrano collegati"), L("Ex.: a percentagem real em Portugal", "E.g. the actual percentage in Portugal", "P. ej.: el porcentaje real en Portugal", "Es.: la percentuale reale in Portogallo")] }
        ]},
        { id: "b", title: L("B. Avaliação rápida", "B. Quick assessment", "B. Evaluación rápida", "B. Valutazione rapida"), fields: [
          { id: "coherence", type: "radio", label: L("O texto é coerente?", "Is the text coherent?", "¿El texto es coherente?", "Il testo è coerente?"), options: SPN,
            hint: L("O propósito, a estrutura e as conclusões estão alinhados? Num texto científico: a pergunta, os objetivos, o método e as conclusões.", "Are the purpose, structure and conclusions aligned? In a scientific text: the question, aims, method and conclusions.", "¿El propósito, la estructura y las conclusiones están alineados? En un texto científico: la pregunta, los objetivos, el método y las conclusiones.", "Scopo, struttura e conclusioni sono allineati? In un testo scientifico: domanda, obiettivi, metodo e conclusioni.") },
          { id: "support", type: "radio", label: L("Apoia o que diz com fontes, dados ou bons argumentos?", "Does it support what it says with sources, data or sound arguments?", "¿Apoya lo que dice con fuentes, datos o buenos argumentos?", "Sostiene ciò che dice con fonti, dati o buoni argomenti?"), options: SPN,
            hint: L("Há fontes, dados ou raciocínio para as afirmações principais?", "Are there sources, data or reasoning behind the main claims?", "¿Hay fuentes, datos o razonamiento para las afirmaciones principales?", "Ci sono fonti, dati o ragionamenti per le affermazioni principali?") },
          { id: "expertise", type: "radio", label: L("Sei o suficiente do tema para avaliar?", "Do I know enough about the topic to assess it?", "¿Sé lo suficiente del tema para evaluar?", "Conosco abbastanza il tema per valutare?"), options: SPN,
            hint: L("Se \"Não\", peça ajuda a quem domine o tema antes de decidir. É a resposta mais honesta e frequente.", "If \"No\", ask someone who knows the topic before deciding. It is the most honest and most common answer.", "Si \"No\", pida ayuda a quien domine el tema antes de decidir. Es la respuesta más honesta y frecuente.", "Se \"No\", chieda aiuto a chi conosce il tema prima di decidere. È la risposta più onesta e frequente.") },
          { id: "plagiarism", type: "radio", label: L("Verifiquei plágio e direitos?", "Did I check plagiarism and rights?", "¿Verifiqué plagio y derechos?", "Ho verificato plagio e diritti?"),
            options: [L("Sim", "Yes", "Sí", "Sì"), L("Não", "No", "No", "No"), L("Pendente", "Pending", "Pendiente", "In sospeso")],
            hint: L("Use a ferramenta de similaridade da sua instituição e confirme se há textos ou imagens com direitos de autor.", "Use your institution's similarity tool and check for copyrighted texts or images.", "Use la herramienta de similitud de su institución y confirme si hay textos o imágenes con derechos de autor.", "Usi lo strumento di similarità della sua istituzione e verifichi se ci sono testi o immagini protetti da diritto d'autore.") }
        ]},
        { id: "c", title: L("C. Nota para quem vai ler (obrigatória se o texto sair do seu grupo)", "C. Note for readers (required if the text leaves your group)", "C. Nota para quien vaya a leer (obligatoria si el texto sale de su grupo)", "C. Nota per chi leggerà (obbligatoria se il testo esce dal suo gruppo)"), fields: [
          { id: "curatorial", type: "textarea", rows: 4, label: L("O que ficou por resolver", "What remains unresolved", "Lo que quedó por resolver", "Ciò che resta da risolvere"),
            hint: L("3 a 5 linhas com as dúvidas que permanecem. Uma dúvida declarada ajuda o leitor.", "3 to 5 lines on the doubts that remain. A stated doubt helps the reader.", "3 a 5 líneas con las dudas que persisten. Una duda declarada ayuda al lector.", "3-5 righe con i dubbi che restano. Un dubbio dichiarato aiuta il lettore."),
            ex: L("«A prevalência citada não foi confirmada; os dados devem ser lidos com cautela.»", "\"The prevalence cited was not confirmed; the figures should be read with caution.\"", "«La prevalencia citada no se confirmó; los datos deben leerse con cautela.»", "«La prevalenza citata non è stata confermata; i dati vanno letti con cautela.»") }
        ]}
      ]
    },

    {
      id: "p5", phase: 5,
      title: L("Fase 5 · Reconciling", "Phase 5 · Reconciling", "Fase 5 · Reconciling", "Fase 5 · Reconciling"),
      subtitle: L("Confrontar com outras pessoas (Human–Community Cross-Validation)", "Compare with other people (Human–Community Cross-Validation)", "Contrastar con otras personas (Human–Community Cross-Validation)", "Confrontarsi con altre persone (Human–Community Cross-Validation)"),
      prompt: L("O que dizem pessoas que não criaram o texto? Peça a pelo menos uma pessoa independente (idealmente um pequeno grupo) que reveja o texto e as Fases 1 a 4.", "What do people who did not create the text say? Ask at least one independent person (ideally a small group) to review the text and Phases 1 to 4.", "¿Qué dicen las personas que no crearon el texto? Pida a al menos una persona independiente (idealmente un pequeño grupo) que revise el texto y las Fases 1 a 4.", "Cosa dicono le persone che non hanno creato il testo? Chieda ad almeno una persona indipendente (idealmente un piccolo gruppo) di rivedere il testo e le Fasi 1-4."),
      blocks: [
        { id: "a", title: L("A. Quem reviu", "A. Who reviewed", "A. Quién revisó", "A. Chi ha rivisto"),
          note: L("A revisão só conta como Reconciling se a pessoa não participou na criação do texto. Se o texto envolve trabalhos de estudantes ou dados de outras pessoas, peça consentimento.", "The review only counts as Reconciling if the person was not involved in creating the text. If the text involves students' work or other people's data, ask for consent.", "La revisión solo cuenta como Reconciling si la persona no participó en la creación del texto. Si el texto incluye trabajos de estudiantes o datos de otras personas, pida consentimiento.", "La revisione conta come Reconciling solo se la persona non ha partecipato alla creazione del testo. Se il testo coinvolge lavori di studenti o dati di altre persone, chieda il consenso."),
          fields: [
          { id: "group", type: "table", rows: 2,
            columns: [L("Nome ou código", "Name or code", "Nombre o código", "Nome o codice"), L("Papel", "Role", "Rol", "Ruolo"), L("Participou na produção do texto?", "Involved in producing the text?", "¿Participó en la producción del texto?", "Ha partecipato alla produzione del testo?")],
            colExamples: [L("Ex.: Colega X", "E.g. Colleague X", "P. ej.: Colega X", "Es.: Collega X"), L("Ex.: par; orientador(a); especialista", "E.g. peer; supervisor; expert", "P. ej.: par; director(a); especialista", "Es.: pari; relatore/relatrice; esperto"), null],
            selectCols: { 2: [L("Não", "No", "No", "No"), L("Sim", "Yes", "Sí", "Sì")] } }
        ]},
        { id: "b", title: L("B. Resultado", "B. Outcome", "B. Resultado", "B. Esito"),
          note: L("Se apenas pedir opiniões livres, sem confrontar o texto com alguém independente, isso é um levantamento de ideias (brainstorming) e não é Reconciling. Registe-o como tal.", "If you only ask for free opinions, without comparing the text with someone independent, that is brainstorming and not Reconciling. Record it as such.", "Si solo pide opiniones libres, sin contrastar el texto con alguien independiente, eso es una lluvia de ideas y no es Reconciling. Regístrelo como tal.", "Se chiede solo opinioni libere, senza confrontare il testo con qualcuno di indipendente, si tratta di un brainstorming e non di Reconciling. Lo registri come tale."),
          fields: [
          { id: "agree", type: "textarea", label: L("Em que concordamos?", "Where do we agree?", "¿En qué coincidimos?", "Su cosa concordiamo?"),
            hint: L("Pontos em que o revisor e você têm a mesma leitura.", "Points where you and the reviewer read things the same way.", "Puntos en los que usted y el revisor tienen la misma lectura.", "Punti su cui lei e il revisore avete la stessa lettura.") },
          { id: "disagree", type: "textarea", label: L("Em que discordamos?", "Where do we disagree?", "¿En qué discrepamos?", "Su cosa discordiamo?"),
            hint: L("Pontos com leituras diferentes, e porquê.", "Points with different readings, and why.", "Puntos con lecturas diferentes, y por qué.", "Punti con letture diverse, e perché."),
            ex: L("O revisor acha que o conceito está mal definido.", "The reviewer thinks the concept is poorly defined.", "El revisor cree que el concepto está mal definido.", "Il revisore ritiene che il concetto sia definito male.") },
          { id: "change", type: "textarea", label: L("O que vou mudar?", "What will I change?", "¿Qué voy a cambiar?", "Che cosa cambierò?"),
            hint: L("Alterações ou verificações que decidiu fazer depois da conversa.", "Changes or checks you decided to make after the discussion.", "Cambios o verificaciones que decidió hacer después de la conversación.", "Modifiche o verifiche che ha deciso di fare dopo la discussione.") },
          { id: "resolved", type: "radio", label: L("As diferenças ficaram resolvidas?", "Were the differences resolved?", "¿Se resolvieron las diferencias?", "Le differenze sono state risolte?"),
            hint: L("É aceitável manter leituras diferentes, desde que fique registado.", "Keeping different readings is acceptable, as long as it is recorded.", "Es aceptable mantener lecturas diferentes, siempre que quede registrado.", "È accettabile mantenere letture diverse, purché sia registrato."),
            options: [L("Sim, houve acordo", "Yes, we agreed", "Sí, hubo acuerdo", "Sì, c'è stato accordo"), L("Mantêm-se duas leituras", "Two readings remain", "Se mantienen dos lecturas", "Restano due letture"), L("Pedimos 3.ª opinião", "We asked for a third opinion", "Pedimos una tercera opinión", "Abbiamo chiesto un terzo parere")] },
          { id: "goback", type: "radio", label: L("É preciso voltar a fases anteriores?", "Do we need to go back to earlier phases?", "¿Hay que volver a fases anteriores?", "Occorre tornare a fasi precedenti?"),
            hint: L("Se a revisão trouxe provas novas, volte à fase respetiva.", "If the review brought new evidence, go back to the relevant phase.", "Si la revisión aportó pruebas nuevas, vuelva a la fase correspondiente.", "Se la revisione ha portato nuove prove, torni alla fase corrispondente."),
            options: YN, detailOn: 1, detailLabel: L("Fase(s)", "Phase(s)", "Fase(s)", "Fase/i") }
        ]}
      ]
    },

    {
      id: "p6", phase: 6,
      title: L("Fase 6 · Reconstructing", "Phase 6 · Reconstructing", "Fase 6 · Reconstructing", "Fase 6 · Reconstructing"),
      subtitle: L("Decidir e registar (Documented Curatorial Decision)", "Decide and record (Documented Curatorial Decision)", "Decidir y registrar (Documented Curatorial Decision)", "Decidere e registrare (Documented Curatorial Decision)"),
      prompt: L("O que decido? Uma decisão baseada nas fases anteriores, assumida por pessoas e escrita.", "What do I decide? A decision based on the earlier phases, owned by people and written down.", "¿Qué decido? Una decisión basada en las fases anteriores, asumida por personas y escrita.", "Cosa decido? Una decisione basata sulle fasi precedenti, assunta da persone e messa per iscritto."),
      blocks: [
        { id: "a", title: L("A. Decisão", "A. Decision", "A. Decisión", "A. Decisione"), fields: [
          { id: "decision", type: "radio", label: L("Assinale uma", "Choose one", "Marque una", "Ne scelga una"),
            options: [L("Utilizar", "Use", "Utilizar", "Utilizzare"), L("Utilizar com contextualização", "Use with contextualisation", "Utilizar con contextualización", "Utilizzare con contestualizzazione"), L("Adaptar", "Adapt", "Adaptar", "Adattare"), L("Não utilizar", "Do not use", "No utilizar", "Non utilizzare")],
            optionHints: [L("usa o texto como está; só se nenhuma fase encontrou problemas", "use the text as it is; only if no phase found problems", "usa el texto tal como está; solo si ninguna fase encontró problemas", "usa il testo così com'è; solo se nessuna fase ha trovato problemi"),
                          L("usa o texto com uma nota que explique a origem (IA) e os limites", "use the text with a note explaining its origin (AI) and limits", "usa el texto con una nota que explique el origen (IA) y los límites", "usa il testo con una nota che ne spieghi l'origine (IA) e i limiti"),
                          L("aproveita partes e reescreve ou corrige o resto", "keep some parts and rewrite or correct the rest", "aprovecha partes y reescribe o corrige el resto", "conserva alcune parti e riscrive o corregge il resto"),
                          L("rejeita o texto; registe o motivo", "reject the text; record the reason", "rechaza el texto; registre el motivo", "respinge il testo; registri il motivo")] },
          { id: "justification", type: "textarea", label: L("Porquê?", "Why?", "¿Por qué?", "Perché?"),
            hint: L("2 a 3 frases com as provas das Fases 1 a 5. Se escolheu \"Adaptar\", diga o que muda.", "2 to 3 sentences with the evidence from Phases 1 to 5. If you chose \"Adapt\", say what changes.", "2 a 3 frases con las pruebas de las Fases 1 a 5. Si eligió \"Adaptar\", indique qué cambia.", "2-3 frasi con le prove delle Fasi 1-5. Se ha scelto \"Adattare\", indichi cosa cambia."),
            ex: L("Há referências inexistentes e certeza excessiva; a revisão confirmou.", "There are non-existent references and overconfidence; the review confirmed it.", "Hay referencias inexistentes y certeza excesiva; la revisión lo confirmó.", "Ci sono riferimenti inesistenti e certezza eccessiva; la revisione lo ha confermato.") }
        ]},
        { id: "b", title: L("B. Antes de usar, confirmou?", "B. Before use, did you confirm?", "B. Antes de usar, ¿confirmó?", "B. Prima dell'uso, ha confermato?"), fields: [
          { id: "conditions", type: "check", label: L("Assinale o que já fez", "Tick what you have done", "Marque lo que ya hizo", "Spunti ciò che ha già fatto"),
            options: [L("Referências verificadas na fonte, quando existam", "References checked at source, where present", "Referencias verificadas en la fuente, cuando existan", "Riferimenti verificati alla fonte, ove presenti"),
                      L("Dados e factos verificados", "Data and facts checked", "Datos y hechos verificados", "Dati e fatti verificati"),
                      L("Texto reescrito e assumido por quem assina", "Text rewritten and owned by the signatory", "Texto reescrito y asumido por quien firma", "Testo riscritto e assunto da chi firma"),
                      L("Direitos de autor e privacidade tratados", "Copyright and privacy addressed", "Derechos de autor y privacidad atendidos", "Diritto d'autore e privacy gestiti"),
                      L("Revisão final do texto completo", "Final review of the full text", "Revisión final del texto completo", "Revisione finale del testo completo")] }
        ]},
        { id: "c", title: L("C. Declaração de uso", "C. Use statement", "C. Declaración de uso", "C. Dichiarazione d'uso"), fields: [
          { id: "statement", type: "textarea", rows: 5, label: L("Texto da declaração", "Statement text", "Texto de la declaración", "Testo della dichiarazione"),
            hint: L("Frase curta para acompanhar o texto. Adapte ao seu caso ou use o botão \"Gerar declaração\".", "A short sentence to accompany the text. Adapt it to your case or use the \"Generate statement\" button.", "Frase breve para acompañar el texto. Adáptela a su caso o use el botón \"Generar declaración\".", "Frase breve da allegare al testo. La adatti al suo caso o usi il pulsante \"Genera dichiarazione\"."),
            ex: L("«Utilizei [ferramenta, versão, data] para [finalidade]. Verifiquei o conteúdo e as referências e assumo a responsabilidade pelo texto.»", "\"I used [tool, version, date] for [purpose]. I checked the content and references and take responsibility for the text.\"", "«Utilicé [herramienta, versión, fecha] para [finalidad]. Verifiqué el contenido y las referencias y asumo la responsabilidad por el texto.»", "«Ho utilizzato [strumento, versione, data] per [finalità]. Ho verificato il contenuto e i riferimenti e mi assumo la responsabilità del testo.»") },
          { id: "next", type: "textarea", label: L("Da próxima vez farei diferente", "Next time I will do differently", "La próxima vez haré diferente", "La prossima volta farò diversamente"),
            hint: L("Uma aprendizagem para a próxima utilização de IA.", "One lesson for the next time you use AI.", "Un aprendizaje para el próximo uso de IA.", "Un insegnamento per il prossimo uso dell'IA."),
            ex: L("Fornecer fontes verificadas no pedido.", "Provide checked sources in the request.", "Proporcionar fuentes verificadas en la petición.", "Fornire fonti verificate nella richiesta.") }
        ]},
        { id: "d", title: L("D. Assinatura", "D. Signature", "D. Firma", "D. Firma"), fields: [
          { id: "signCurator", type: "text", label: L("Curador(a)", "Curator", "Curador(a)", "Curatore/curatrice") },
          { id: "signReviewers", type: "text", label: L("Revisor(a) / orientador(a)", "Reviewer / supervisor", "Revisor(a) / director(a)", "Revisore/revisora / relatore/relatrice") },
          { id: "signDate", type: "date", label: L("Data", "Date", "Fecha", "Data") }
        ]}
      ]
    }
  ]
};
