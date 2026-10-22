# AI Curatorial Protocol (AICP): formulários / forms

**PT** · [EN](#english)

Formulários do *AI Curatorial Protocol* (AICP) para a curadoria de artigos gerados por IA: seis fases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing), que alargam o modelo 5R de Bain et al. (2002) com a fase *Reconciling* (Costa et al., 2026).

## Utilizar

- **No navegador:** abra a página publicada (GitHub Pages) e preencha os formulários. Pode alternar entre português e inglês a qualquer momento.
- **Guardar:** o preenchimento fica guardado automaticamente no navegador. Para guardar num ficheiro, ou para continuar noutro computador, use *Guardar ficheiro (JSON)* e depois *Abrir ficheiro (JSON)*.
- **Exportar:** *Exportar Markdown* gera um registo legível para anexar ao artigo; *Imprimir / PDF* gera uma versão para impressão, com uma fase por página.
- **Privacidade:** a página não envia dados para nenhum servidor. Não registe dados pessoais ou confidenciais nos campos.
- **Modelos para descarregar** (pasta [`docs/`](docs/)): `AICP_Formularios_PT.docx` (modelo original em português), `AICP_forms_PT.md`, `AICP_forms_EN.md` e as respetivas versões `.docx`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes ficheiros para o ramo `main`.
2. Em *Settings → Pages*, escolha *Deploy from a branch*, ramo `main`, pasta `/ (root)`.
3. A página fica disponível em `https://<utilizador>.github.io/<repositório>/`.

## Editar os formulários

Todo o conteúdo está num único ficheiro, [`assets/schema.js`](assets/schema.js), com cada texto em português e em inglês. Depois de o editar, regenere os modelos Markdown com:

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

Forms for the *AI Curatorial Protocol* (AICP), for curating AI-generated articles in six phases (Reporting, Relating, Responding, Reasoning, Reconciling, Reconstructing). The protocol extends the 5R model of Bain et al. (2002) with a new phase, *Reconciling* (Costa et al., 2026).

### Use

- **In the browser:** open the published page (GitHub Pages) and fill in the forms. You can switch between Portuguese and English at any time.
- **Saving:** entries are saved automatically in the browser. To keep a file, or to continue on another computer, use *Save file (JSON)* and then *Open file (JSON)*.
- **Exporting:** *Export Markdown* produces a readable record to attach to the article; *Print / PDF* produces a printable version, one phase per page.
- **Privacy:** the page sends no data to any server. Do not record personal or confidential data in the fields.
- **Downloadable templates** in [`docs/`](docs/).

### Publish on GitHub Pages

Push these files to the `main` branch, then go to *Settings → Pages*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`.

### Edit the forms

All content lives in [`assets/schema.js`](assets/schema.js), with each text in Portuguese and English. Regenerate the Markdown templates with `node tools/build-templates.js`. No dependencies, no build step.

### Licence

Form content: CC BY 4.0. Code: MIT.
