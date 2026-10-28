# AI Curatorial Protocol (AICP): formulários / forms / formularios / moduli

**PT** · [EN](#english) · [ES](#espanol) · [IT](#italiano)

Formulários do *AI Curatorial Protocol* (AICP) para a curadoria de textos produzidos com IA generativa (artigos, trabalhos académicos, relatórios, materiais didáticos, textos de divulgação, entre outros): seis fases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing), que alargam o modelo 5R de Bain et al. (2002) com a fase *Reconciling* (Costa et al., 2026).

## Utilizar

- **No navegador:** abra a página publicada (GitHub Pages) e preencha os formulários. Pode alternar entre português, inglês, espanhol e italiano a qualquer momento.
- **Guardar:** o preenchimento fica guardado automaticamente no navegador. Para guardar num ficheiro, ou para continuar noutro computador, use *Guardar ficheiro (JSON)* e depois *Abrir ficheiro (JSON)*.
- **Estado do processo:** mostra, por fase, quantos campos estão preenchidos e quais faltam, se a Fase 5 tem um revisor independente e se as condições da Fase 6 estão cumpridas.
- **Gerar declaração:** monta um rascunho da declaração de uso de IA a partir das respostas (Fases 1, 2, 5 e 6), com parênteses retos onde faltar informação; pode copiá-lo ou colocá-lo na Fase 6.
- **Exportar:** *Exportar Word* gera um documento .docx com todas as fases; *Exportar Markdown* gera um registo em texto; *Imprimir / PDF* gera uma versão para impressão, com uma fase por página.
- **Privacidade:** a página não envia dados para nenhum servidor. Não registe dados pessoais ou confidenciais nos campos.
- **Modelos para descarregar** (pasta [`docs/`](docs/)): `AICP_Formularios_PT.docx` (modelo original em português), `AICP_forms_PT.md`, `AICP_forms_EN.md`, `AICP_forms_ES.md`, `AICP_forms_IT.md` e as respetivas versões `.docx`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes ficheiros para o ramo `main`.
2. Em *Settings → Pages*, escolha *Deploy from a branch*, ramo `main`, pasta `/ (root)`.
3. A página fica disponível em `https://<utilizador>.github.io/<repositório>/`.

## Editar os formulários

Todo o conteúdo está num único ficheiro, [`assets/schema.js`](assets/schema.js), com cada texto em português, inglês, espanhol e italiano: `L("português", "English", "español", "italiano")`. Depois de o editar, regenere os modelos Markdown com:

```
node tools/build-templates.js
```

Não há dependências nem passo de compilação: a página usa apenas HTML, CSS e JavaScript.

## Citar

Costa, A. P., Pinho, I., Piedade, F., Balula, A., Ribeiro, N., Ruano, L. E., & Antonini, A. (2026). Algorithmic responsibility in education: A curatorial protocol for AI-generated text, images, and videos. *조형교육, 99*(2), 25–38.

Ver também [`CITATION.cff`](CITATION.cff).

## Licença

Conteúdo dos formulários: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Código: MIT (ver [`LICENSE`](LICENSE)).

---

<a id="english"></a>

## English

Forms for the *AI Curatorial Protocol* (AICP), for curating texts produced with generative AI (articles, academic assignments, reports, teaching materials, outreach texts, among others) in six phases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). The protocol extends the 5R model of Bain et al. (2002) with a new phase, *Reconciling* (Costa et al., 2026).

### Use

- **In the browser:** open the published page (GitHub Pages) and fill in the forms. You can switch between Portuguese, English, Spanish and Italian at any time.
- **Saving:** entries are saved automatically in the browser. To keep a file, or to continue on another computer, use *Save file (JSON)* and then *Open file (JSON)*.
- **Process status:** shows, per phase, how many fields are filled in and which are missing, whether Phase 5 has an independent reviewer and whether the Phase 6 conditions are met.
- **Generate statement:** drafts the AI use statement from the answers (Phases 1, 2, 5 and 6), with square brackets where information is missing; copy it or insert it in Phase 6.
- **Exporting:** *Export Word* produces a .docx with all phases; *Export Markdown* produces a text record; *Print / PDF* produces a printable version, one phase per page.
- **Privacy:** the page sends no data to any server. Do not record personal or confidential data in the fields.
- **Downloadable templates** in [`docs/`](docs/).

### Publish on GitHub Pages

Push these files to the `main` branch, then go to *Settings → Pages*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`.

### Edit the forms

All content lives in [`assets/schema.js`](assets/schema.js), with each text in Portuguese, English, Spanish and Italian. Regenerate the Markdown templates with `node tools/build-templates.js`. No dependencies, no build step.

### Licence

Form content: CC BY 4.0. Code: MIT.

---

<a id="espanol"></a>

## Español

Formularios del *AI Curatorial Protocol* (AICP) para la curaduría de textos producidos con IA generativa (artículos, trabajos académicos, informes, materiales didácticos, textos de divulgación, entre otros), en seis fases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). El protocolo amplía el modelo 5R de Bain et al. (2002) con una nueva fase, *Reconciling* (Costa et al., 2026).

### Uso

- **En el navegador:** abra la página publicada (GitHub Pages) y complete los formularios. Puede cambiar entre portugués, inglés, español e italiano en cualquier momento (botones PT/EN/ES/IT).
- **Guardar:** las respuestas se guardan automáticamente en el navegador. Para conservar un archivo o continuar en otro ordenador, use *Guardar archivo (JSON)* y después *Abrir archivo (JSON)*.
- **Estado del proceso:** muestra, por fase, cuántos campos están completos y cuáles faltan, si la Fase 5 tiene un revisor independiente y si se cumplen las condiciones de la Fase 6.
- **Generar declaración:** redacta un borrador de la declaración de uso de IA a partir de las respuestas, con corchetes donde falta información.
- **Exportar:** *Exportar Word* (.docx), *Exportar Markdown* e *Imprimir / PDF*, con una fase por página.
- **Privacidad:** la página no envía datos a ningún servidor. No registre datos personales o confidenciales en los campos.
- **Plantillas descargables** en [`docs/`](docs/), incluidas `AICP_forms_ES.md` y `AICP_forms_ES.docx`.

### Licencia

Contenido de los formularios: CC BY 4.0. Código: MIT.

---

<a id="italiano"></a>

## Italiano

Moduli dell'*AI Curatorial Protocol* (AICP) per la curatela di testi prodotti con l'IA generativa (articoli, elaborati accademici, relazioni, materiali didattici, testi divulgativi, tra gli altri), in sei fasi (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). Il protocollo estende il modello 5R di Bain et al. (2002) con una nuova fase, *Reconciling* (Costa et al., 2026).

### Uso

- **Nel browser:** aprire la pagina pubblicata (GitHub Pages) e compilare i moduli. È possibile passare dal portoghese all'inglese, allo spagnolo e all'italiano in qualsiasi momento (pulsanti PT/EN/ES/IT).
- **Salvataggio:** le risposte vengono salvate automaticamente nel browser. Per conservare un file o continuare su un altro computer, usare *Salva file (JSON)* e poi *Apri file (JSON)*.
- **Stato del processo:** mostra, per ogni fase, quanti campi sono compilati e quali mancano, se la Fase 5 ha un revisore indipendente e se le condizioni della Fase 6 sono soddisfatte.
- **Genera dichiarazione:** redige una bozza della dichiarazione d'uso dell'IA a partire dalle risposte, con parentesi quadre dove mancano informazioni.
- **Esportazione:** *Esporta Word* (.docx), *Esporta Markdown* e *Stampa / PDF*, con una fase per pagina.
- **Privacy:** la pagina non invia dati ad alcun server. Non registrare dati personali o riservati nei campi.
- **Modelli scaricabili** in [`docs/`](docs/), inclusi `AICP_forms_IT.md` e `AICP_forms_IT.docx`.

### Licenza

Contenuto dei moduli: CC BY 4.0. Codice: MIT.
