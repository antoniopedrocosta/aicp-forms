# AI Curatorial Protocol (AICP): formulários / forms / formularios / moduli / 양식

**PT** · [EN](#english) · [ES](#espanol) · [IT](#italiano) · [KO](#korean)

Formulários do *AI Curatorial Protocol* (AICP) para a curadoria de conteúdos produzidos com IA generativa, textos (artigos, trabalhos académicos, relatórios, materiais didáticos, textos de divulgação), imagens e vídeos: seis fases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing), que alargam o modelo 5R de Bain et al. (2002) com a fase *Reconciling* (Costa et al., 2026).

## Utilizar

- **No navegador:** abra a página publicada (GitHub Pages) e preencha os formulários. Pode alternar entre português, inglês, espanhol, italiano e coreano a qualquer momento.
- **Texto, imagem e vídeo:** comece por escolher o tipo de conteúdo; os campos próprios de texto ou de imagem e vídeo aparecem conforme a escolha.
- **Ajudas e exemplos:** cada campo tem uma ajuda curta e, quando útil, um exemplo fictício (conteúdos sobre burnout em enfermeiros).
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

Todo o conteúdo está num único ficheiro, [`assets/schema.js`](assets/schema.js), com cada texto em português, inglês, espanhol, italiano e coreano: `L("português", "English", "español", "italiano", "한국어")`. A chave `show` ("text", "visual" ou "video") define os campos que só aparecem para esse tipo de conteúdo. Depois de o editar, regenere os modelos Markdown com:

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

Forms for the *AI Curatorial Protocol* (AICP), for curating content produced with generative AI, texts (articles, academic assignments, reports, teaching materials, outreach texts), images and videos, in six phases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). The protocol extends the 5R model of Bain et al. (2002) with a new phase, *Reconciling* (Costa et al., 2026).

### Use

- **In the browser:** open the published page (GitHub Pages) and fill in the forms. You can switch between Portuguese, English, Spanish, Italian and Korean at any time.
- **Text, image and video:** start by choosing the type of content; the fields specific to text or to image and video appear accordingly.
- **Help and examples:** each field has a short help note and, where useful, a fictional example (content about burnout in nurses).
- **Saving:** entries are saved automatically in the browser. To keep a file, or to continue on another computer, use *Save file (JSON)* and then *Open file (JSON)*.
- **Process status:** shows, per phase, how many fields are filled in and which are missing, whether Phase 5 has an independent reviewer and whether the Phase 6 conditions are met.
- **Generate statement:** drafts the AI use statement from the answers (Phases 1, 2, 5 and 6), with square brackets where information is missing; copy it or insert it in Phase 6.
- **Exporting:** *Export Word* produces a .docx with all phases; *Export Markdown* produces a text record; *Print / PDF* produces a printable version, one phase per page.
- **Privacy:** the page sends no data to any server. Do not record personal or confidential data in the fields.
- **Downloadable templates** in [`docs/`](docs/).

### Publish on GitHub Pages

Push these files to the `main` branch, then go to *Settings → Pages*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`.

### Edit the forms

All content lives in [`assets/schema.js`](assets/schema.js), with each text in Portuguese, English, Spanish, Italian and Korean; the `show` key marks fields used only for text, image and video, or video. Regenerate the Markdown templates with `node tools/build-templates.js`. No dependencies, no build step.

### Licence

Form content: CC BY 4.0. Code: MIT.

---

<a id="espanol"></a>

## Español

Formularios del *AI Curatorial Protocol* (AICP) para la curaduría de contenidos producidos con IA generativa, textos (artículos, trabajos académicos, informes, materiales didácticos, textos de divulgación), imágenes y vídeos, en seis fases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). El protocolo amplía el modelo 5R de Bain et al. (2002) con una nueva fase, *Reconciling* (Costa et al., 2026).

### Uso

- **En el navegador:** abra la página publicada (GitHub Pages) y complete los formularios. Puede cambiar entre portugués, inglés, español, italiano y coreano en cualquier momento (botones PT/EN/ES/IT/KO).
- **Texto, imagen y vídeo:** empiece eligiendo el tipo de contenido; los campos propios de texto o de imagen y vídeo aparecen según la elección.
- **Ayudas y ejemplos:** cada campo tiene una breve ayuda y, cuando es útil, un ejemplo ficticio (contenidos sobre burnout en enfermeros).
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

Moduli dell'*AI Curatorial Protocol* (AICP) per la curatela di contenuti prodotti con l'IA generativa, testi (articoli, elaborati accademici, relazioni, materiali didattici, testi divulgativi), immagini e video, in sei fasi (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). Il protocollo estende il modello 5R di Bain et al. (2002) con una nuova fase, *Reconciling* (Costa et al., 2026).

### Uso

- **Nel browser:** aprire la pagina pubblicata (GitHub Pages) e compilare i moduli. È possibile passare tra portoghese, inglese, spagnolo, italiano e coreano in qualsiasi momento (pulsanti PT/EN/ES/IT/KO).
- **Testo, immagine e video:** si comincia scegliendo il tipo di contenuto; i campi propri del testo o dell'immagine e del video compaiono in base alla scelta.
- **Aiuti ed esempi:** ogni campo ha un breve aiuto e, quando utile, un esempio fittizio (contenuti sul burnout negli infermieri).
- **Salvataggio:** le risposte vengono salvate automaticamente nel browser. Per conservare un file o continuare su un altro computer, usare *Salva file (JSON)* e poi *Apri file (JSON)*.
- **Stato del processo:** mostra, per ogni fase, quanti campi sono compilati e quali mancano, se la Fase 5 ha un revisore indipendente e se le condizioni della Fase 6 sono soddisfatte.
- **Genera dichiarazione:** redige una bozza della dichiarazione d'uso dell'IA a partire dalle risposte, con parentesi quadre dove mancano informazioni.
- **Esportazione:** *Esporta Word* (.docx), *Esporta Markdown* e *Stampa / PDF*, con una fase per pagina.
- **Privacy:** la pagina non invia dati ad alcun server. Non registrare dati personali o riservati nei campi.
- **Modelli scaricabili** in [`docs/`](docs/), inclusi `AICP_forms_IT.md` e `AICP_forms_IT.docx`.

### Licenza

Contenuto dei moduli: CC BY 4.0. Codice: MIT.

---

<a id="korean"></a>

## 한국어

생성형 AI로 만든 콘텐츠, 즉 텍스트(논문, 학업 과제, 보고서, 교육 자료, 대중용 글), 이미지, 영상을 큐레이션하기 위한 *AI Curatorial Protocol*(AICP) 양식입니다. 6단계(Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing)로 구성되며, Bain et al.(2002)의 5R 모델에 새로운 단계인 *Reconciling*을 더해 확장했습니다(Costa et al., 2026).

### 사용 방법

- **브라우저에서:** 게시된 페이지(GitHub Pages)를 열고 양식을 작성합니다. 포르투갈어, 영어, 스페인어, 이탈리아어, 한국어 사이를 언제든 전환할 수 있습니다(PT/EN/ES/IT/KO 버튼).
- **텍스트, 이미지, 영상:** 먼저 콘텐츠 유형을 선택하면, 텍스트용 또는 이미지·영상용 항목이 선택에 따라 나타납니다.
- **도움말과 예시:** 각 항목에는 짧은 도움말과, 필요한 경우 가상의 예시(간호사 번아웃에 관한 콘텐츠)가 있습니다.
- **저장:** 입력 내용은 브라우저에 자동 저장됩니다. 파일로 보관하거나 다른 컴퓨터에서 이어서 작성하려면 *파일 저장(JSON)*과 *파일 열기(JSON)*를 사용하십시오.
- **진행 상태:** 단계별로 작성한 항목과 남은 항목, 5단계의 독립 검토자 여부, 6단계 확인 사항 충족 여부를 보여 줍니다.
- **고지문 생성:** 응답을 바탕으로 AI 사용 고지문 초안을 만들며, 정보가 없는 곳은 대괄호로 표시합니다.
- **내보내기:** *Word 내보내기*(.docx), *Markdown 내보내기*, *인쇄 / PDF*(단계별로 한 페이지).
- **개인정보:** 이 페이지는 어떤 서버로도 데이터를 보내지 않습니다. 항목에 개인정보나 기밀 정보를 기록하지 마십시오.
- **내려받을 수 있는 양식:** [`docs/`](docs/)에 `AICP_forms_KO.md`와 `AICP_forms_KO.docx`가 있습니다.

### 라이선스

양식 내용: CC BY 4.0. 코드: MIT.
