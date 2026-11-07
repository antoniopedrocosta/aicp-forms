/* AICP forms: rendering, autosave, import/export. No dependencies. */
(function () {
  "use strict";
  const S = window.AICP_SCHEMA;
  const STORE = "aicp-forms-v2";
  const UI = {
    lang: { pt: "PT", en: "EN", es: "ES", it: "IT", ko: "KO" },
    exportMd: { pt: "Exportar Markdown", en: "Export Markdown", es: "Exportar Markdown", it: "Esporta Markdown", ko: "Markdown 내보내기" },
    exportJson: { pt: "Guardar ficheiro (JSON)", en: "Save file (JSON)", es: "Guardar archivo (JSON)", it: "Salva file (JSON)", ko: "파일 저장(JSON)" },
    importJson: { pt: "Abrir ficheiro (JSON)", en: "Open file (JSON)", es: "Abrir archivo (JSON)", it: "Apri file (JSON)", ko: "파일 열기(JSON)" },
    print: { pt: "Imprimir / PDF", en: "Print / PDF", es: "Imprimir / PDF", it: "Stampa / PDF", ko: "인쇄 / PDF" },
    reset: { pt: "Limpar tudo", en: "Clear all", es: "Borrar todo", it: "Cancella tutto", ko: "모두 지우기" },
    resetConfirm: { pt: "Apagar todos os campos preenchidos neste navegador?", en: "Delete all filled-in fields in this browser?", es: "¿Borrar todos los campos completados en este navegador?", it: "Cancellare tutti i campi compilati in questo browser?", ko: "이 브라우저에 입력한 모든 내용을 지우시겠습니까?" },
    addRow: { pt: "+ linha", en: "+ row", es: "+ fila", it: "+ riga", ko: "+ 행" },
    saved: { pt: "Guardado neste navegador", en: "Saved in this browser", es: "Guardado en este navegador", it: "Salvato in questo browser", ko: "이 브라우저에 저장됨" },
    notSaved: { pt: "Não foi possível guardar neste navegador; exporte o ficheiro para não perder dados.", en: "Could not save in this browser; export the file to avoid losing data.", es: "No se pudo guardar en este navegador; exporte el archivo para no perder datos.", it: "Impossibile salvare in questo browser; esportare il file per non perdere i dati.", ko: "이 브라우저에 저장할 수 없습니다. 데이터를 잃지 않도록 파일로 내보내십시오." },
    howto: { pt: "Como usar", en: "How to use", es: "Cómo usar", it: "Come usare", ko: "사용 방법" },
    privacy: { pt: "Os dados ficam apenas neste navegador. Nada é enviado para servidores.", en: "Data stays in this browser only. Nothing is sent to any server.", es: "Los datos quedan solo en este navegador. No se envía nada a ningún servidor.", it: "I dati restano solo in questo browser. Nulla viene inviato a server.", ko: "데이터는 이 브라우저에만 저장되며 어떤 서버로도 전송되지 않습니다." },
    refs: { pt: "Referências", en: "References", es: "Referencias", it: "Riferimenti bibliografici", ko: "참고문헌" },
    words: { pt: "palavras", en: "words", es: "palabras", it: "parole", ko: "단어" },
    ex: { pt: "Ex.:", en: "E.g.", es: "P. ej.:", it: "Es.:", ko: "예:" },
    detail: { pt: "Especificar", en: "Specify", es: "Especificar", it: "Specificare", ko: "구체적으로" },
    badFile: { pt: "Ficheiro inválido.", en: "Invalid file.", es: "Archivo no válido.", it: "File non valido.", ko: "유효하지 않은 파일입니다." },
    phases: { pt: "Fases", en: "Phases", es: "Fases", it: "Fasi", ko: "단계" },
    articleCode: { pt: "Conteúdo / código", en: "Content / code", es: "Contenido / código", it: "Contenuto / codice", ko: "콘텐츠 / 코드" },
    curator: { pt: "Curador(a)", en: "Curator", es: "Curador(a)", it: "Curatore/curatrice", ko: "큐레이터" },
    exportDocx: { pt: "Exportar Word", en: "Export Word", es: "Exportar Word", it: "Esporta Word", ko: "Word 내보내기" },
    statusBtn: { pt: "Estado do processo", en: "Process status", es: "Estado del proceso", it: "Stato del processo", ko: "진행 상태" },
    statementBtn: { pt: "Gerar declaração", en: "Generate statement", es: "Generar declaración", it: "Genera dichiarazione", ko: "고지문 생성" },
    status: { pt: "Estado do processo", en: "Process status", es: "Estado del proceso", it: "Stato del processo", ko: "진행 상태" },
    statement: { pt: "Declaração de uso de IA", en: "AI use statement", es: "Declaración de uso de IA", it: "Dichiarazione d'uso dell'IA", ko: "AI 사용 고지문" },
    stmtHint: { pt: "Rascunho gerado a partir das respostas. O que está entre parênteses retos tem de ser completado ou confirmado. Reveja antes de usar.", en: "Draft generated from the answers. Text in square brackets must be completed or confirmed. Review before use.", es: "Borrador generado a partir de las respuestas. Lo que está entre corchetes debe completarse o confirmarse. Revíselo antes de usarlo.", it: "Bozza generata a partire dalle risposte. Ciò che è tra parentesi quadre va completato o confermato. Rivedere prima dell'uso.", ko: "응답을 바탕으로 생성한 초안입니다. 대괄호 안의 내용은 채우거나 확인해야 합니다. 사용하기 전에 검토하십시오." },
    copy: { pt: "Copiar", en: "Copy", es: "Copiar", it: "Copia", ko: "복사" },
    copied: { pt: "Copiado", en: "Copied", es: "Copiado", it: "Copiato", ko: "복사됨" },
    insert: { pt: "Colocar na Fase 6", en: "Insert in Phase 6", es: "Colocar en la Fase 6", it: "Inserisci nella Fase 6", ko: "6단계에 넣기" },
    close: { pt: "Fechar", en: "Close", es: "Cerrar", it: "Chiudi", ko: "닫기" },
    emptyFields: { pt: "Campos por preencher", en: "Empty fields", es: "Campos por completar", it: "Campi da compilare", ko: "작성하지 않은 항목" },
    p5ok: { pt: "há pelo menos um revisor identificado que não participou na produção do conteúdo.", en: "there is at least one identified reviewer who was not involved in producing the content.", es: "hay al menos un revisor identificado que no participó en la producción del contenido.", it: "c'è almeno un revisore identificato che non ha partecipato alla produzione del contenuto.", ko: "콘텐츠 제작에 참여하지 않은 검토자가 최소 1명 확인되었습니다." },
    p5notok: { pt: "ainda não cumpre o requisito.", en: "requirement not yet met.", es: "todavía no cumple el requisito.", it: "non soddisfa ancora il requisito.", ko: "아직 요건을 충족하지 않습니다." },
    p5noIndep: { pt: "Falta um revisor identificado e independente da produção do conteúdo.", en: "An identified reviewer independent of production is missing.", es: "Falta un revisor identificado e independiente de la producción.", it: "Manca un revisore identificato e indipendente dalla produzione.", ko: "제작과 무관한 검토자가 확인되지 않았습니다." },
    conditions: { pt: "Condições da Fase 6 cumpridas", en: "Phase 6 conditions met", es: "Condiciones de la Fase 6 cumplidas", it: "Condizioni della Fase 6 soddisfatte", ko: "6단계 확인 사항" },
    stmtAuto: { pt: "Atualiza-se automaticamente à medida que preenche os formulários. O que está entre parênteses retos falta completar ou resolver.", en: "Updates automatically as you fill in the forms. Text in square brackets still needs completing or resolving.", es: "Se actualiza automáticamente a medida que completa los formularios. Lo que está entre corchetes falta completar o resolver.", it: "Si aggiorna automaticamente man mano che compila i moduli. Ciò che è tra parentesi quadre va ancora completato o risolto.", ko: "양식을 작성하는 대로 자동으로 갱신됩니다. 대괄호 안의 내용은 아직 채우거나 해결해야 합니다." },
    stmtManual: { pt: "Editada por si: já não se atualiza automaticamente.", en: "Edited by you: no longer updates automatically.", es: "Editada por usted: ya no se actualiza automáticamente.", it: "Modificata da lei: non si aggiorna più automaticamente.", ko: "직접 수정함: 더 이상 자동으로 갱신되지 않습니다." },
    stmtReset: { pt: "Voltar à versão automática", en: "Restore automatic version", es: "Volver a la versión automática", it: "Ripristina la versione automatica", ko: "자동 버전으로 되돌리기" },
    stmtResetConfirm: { pt: "Substituir o texto editado pela versão automática?", en: "Replace your edited text with the automatic version?", es: "¿Sustituir el texto editado por la versión automática?", it: "Sostituire il testo modificato con la versione automatica?", ko: "수정한 내용을 자동 버전으로 바꾸시겠습니까?" },
    decision: { pt: "Decisão", en: "Decision", es: "Decisión", it: "Decisione", ko: "결정" },
    noDecision: { pt: "por tomar", en: "not yet taken", es: "pendiente", it: "da prendere", ko: "미정" }
  };

  let state = load() || { lang: "pt", v: {} };
  const t = (o) => (o ? o[state.lang] || o.pt : "");

  function load() {
    try { const s = localStorage.getItem(STORE); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const st = document.getElementById("status");
      try { localStorage.setItem(STORE, JSON.stringify(state)); st.textContent = t(UI.saved); st.className = "status ok"; }
      catch (e) { st.textContent = t(UI.notSaved); st.className = "status warn"; }
    }, 300);
  }
  const key = (...p) => p.join(".");
  const get = (k, d) => (k in state.v ? state.v[k] : d);
  const STMT = "p6.c.statement";
  const set = (k, val) => { state.v[k] = val; save(); if (k !== STMT && k !== STMT + ".auto") scheduleStmt(); };
  // The Phase 6 statement follows the answers until the user edits it by hand.
  const stmtAuto = () => { const v = get(STMT + ".auto", null); return v == null ? !String(get(STMT, "") || "").trim() : v; };
  let stmtTimer = null;
  function scheduleStmt() { clearTimeout(stmtTimer); stmtTimer = setTimeout(syncStmt, 250); }
  function syncStmt() {
    if (!stmtAuto()) return;
    const txt = buildStatement();
    state.v[STMT] = txt; state.v[STMT + ".auto"] = true; save();
    const ta = document.getElementById("p6-c-statement");
    if (ta && document.activeElement !== ta) { ta.value = txt; grow(ta); }
  }
  function stmtMode() {
    const box = el("div", { class: "stmt-mode no-print", id: "stmt-mode" });
    if (stmtAuto()) box.append(el("span", {}, t(UI.stmtAuto)));
    else box.append(el("span", {}, t(UI.stmtManual) + " "), el("button", { type: "button", onclick: () => {
      if (!confirm(t(UI.stmtResetConfirm))) return;
      state.v[STMT + ".auto"] = true; syncStmt(); const old = document.getElementById("stmt-mode"); if (old) old.replaceWith(stmtMode());
    } }, t(UI.stmtReset)));
    return box;
  }
  // Which parts of the form apply, according to "Tipo de conteúdo" (0 text, 1 image, 2 video, 3 mixed; empty = text).
  const media = () => get("id.id.media", null);
  const hasText = () => { const m = media(); return m == null || m === 0 || m === 3; };
  const hasVisual = () => { const m = media(); return m === 1 || m === 2 || m === 3; };
  const hasVideo = () => { const m = media(); return m === 2 || m === 3; };
  const shown = (x) => !x.show || (x.show === "text" ? hasText() : x.show === "visual" ? hasVisual() : x.show === "video" ? hasVideo() : true);
  const each = (fn) => S.sections.forEach((sec) => sec.blocks.filter(shown).forEach((blk) => blk.fields.filter(shown).forEach((f) => fn(sec, blk, f))));

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [a, v] of Object.entries(attrs || {})) {
      if (a === "class") n.className = v;
      else if (a.startsWith("on")) n.addEventListener(a.slice(2), v);
      else if (v !== false && v != null) n.setAttribute(a, v === true ? "" : v);
    }
    kids.flat().forEach((c) => c != null && n.append(c.nodeType ? c : document.createTextNode(c)));
    return n;
  }

  /* ---------- field renderers ---------- */
  function fieldLabel(f, id) {
    return el("label", { for: id, class: "flabel" }, t(f.label), helpBits(f));
  }
  function helpBits(f) {
    return [f.hint ? el("span", { class: "hint" }, t(f.hint)) : null, f.ex ? el("span", { class: "ex" }, t(UI.ex) + " " + t(f.ex)) : null];
  }
  const helpText = (f) => [f.hint ? t(f.hint) : "", f.ex ? t(UI.ex) + " " + t(f.ex) : ""].filter(Boolean).join(" ");
  const rowLabelText = (f, r) => t(f.rowLabels[r]) + (f.rowHints && f.rowHints[r] ? ": " + t(f.rowHints[r]) : "");
  const optText = (f, i) => t(f.options[i]) + (f.optionHints && f.optionHints[i] ? " (" + t(f.optionHints[i]) + ")" : "");

  function renderField(sec, blk, f) {
    const k = key(sec.id, blk.id, f.id);
    const id = k.replace(/\./g, "-");
    const wrap = el("div", { class: "field f-" + f.type });

    if (f.type === "text" || f.type === "date") {
      const refresh = (k === "id.id.code" || k === "id.id.curator") ? () => document.querySelectorAll(".recordline").forEach(updRecord) : null;
      wrap.append(fieldLabel(f, id), el("input", { id, type: f.type, value: get(k, ""), oninput: (e) => { set(k, e.target.value); if (refresh) refresh(); } }));
    } else if (f.type === "textarea") {
      const counter = f.maxWords ? el("span", { class: "counter" }) : null;
      const upd = (v) => { if (counter) { const n = (v.trim().match(/\S+/g) || []).length; counter.textContent = n + " / " + f.maxWords + " " + t(UI.words); counter.classList.toggle("over", n > f.maxWords); } };
      const isStmt = k === STMT;
      const ta = el("textarea", { id, rows: f.rows || 3, oninput: (e) => {
        if (isStmt && stmtAuto()) { state.v[STMT + ".auto"] = false; const old = document.getElementById("stmt-mode"); if (old) old.replaceWith(stmtMode()); }
        set(k, e.target.value); upd(e.target.value);
      } });
      if (isStmt && stmtAuto()) { state.v[STMT] = buildStatement(); state.v[STMT + ".auto"] = true; }
      ta.value = get(k, ""); upd(ta.value);
      wrap.append(fieldLabel(f, id), ta); if (counter) wrap.append(counter);
      if (isStmt) wrap.append(stmtMode());
    } else if (f.type === "radio" || f.type === "check") {
      const fs = el("fieldset", {}, el("legend", { class: "flabel" }, t(f.label), helpBits(f)));
      const opts = el("div", { class: "opts" });
      const cur = get(k, f.type === "check" ? [] : null);
      const detailK = key(k, "detail");
      const detail = (f.detailOn != null || f.other) ? el("input", { type: "text", class: "detail", "aria-label": t(f.detailLabel || UI.detail), placeholder: t(f.detailLabel || UI.detail), value: get(detailK, ""), oninput: (e) => set(detailK, e.target.value) }) : null;
      const showDetail = () => { if (detail) { const v = get(k, null); const on = f.other ? v === f.options.length - 1 : v === f.detailOn; detail.hidden = !on; } };
      f.options.forEach((o, i) => {
        const oid = id + "-" + i;
        const inp = el("input", {
          type: f.type === "check" ? "checkbox" : "radio", name: id, id: oid,
          checked: f.type === "check" ? cur.includes(i) : cur === i,
          onchange: (e) => {
            if (f.type === "check") { const s = new Set(get(k, [])); e.target.checked ? s.add(i) : s.delete(i); set(k, [...s].sort()); }
            else set(k, i);
            showDetail();
            if (f.rerender) { const y = window.scrollY; render(); window.scrollTo(0, y); }
          }
        });
        opts.append(el("span", { class: "opt" + (f.optionHints ? " opt-wide" : "") }, inp, el("label", { for: oid }, t(o), f.optionHints && f.optionHints[i] ? el("span", { class: "ohint" }, t(f.optionHints[i])) : null)));
      });
      fs.append(opts);
      if (detail) fs.append(detail);
      showDetail();
      wrap.append(fs);
    } else if (f.type === "table" || f.type === "radioTable") {
      wrap.append(renderTable(sec, blk, f, k, id));
    }
    return wrap;
  }

  function renderTable(sec, blk, f, k, id) {
    const box = el("div", { class: "tablebox" });
    const tbl = el("table", { class: "grid" });
    tbl.append(el("thead", {}, el("tr", {}, f.columns.map((c) => el("th", { scope: "col" }, t(c))))));
    const body = el("tbody");
    const fixed = f.fixedRows || f.type === "radioTable";
    const n = fixed ? f.rowLabels.length : Math.max(f.rows || 3, get(key(k, "n"), 0));
    for (let r = 0; r < n; r++) {
      const tr = el("tr");
      f.columns.forEach((c, ci) => {
        const ck = key(k, r, ci);
        const cid = id + "-" + r + "-" + ci;
        if (fixed && ci === 0) { tr.append(el("th", { scope: "row" }, t(f.rowLabels[r]), f.rowHints && f.rowHints[r] ? el("span", { class: "rhint" }, t(f.rowHints[r])) : null)); return; }
        if (f.type === "radioTable" && ci === 1) {
          const cell = el("td", { class: "radiocell" });
          f.options.forEach((o, oi) => {
            const oid = cid + "-" + oi;
            cell.append(el("span", { class: "opt" }, el("input", { type: "radio", name: cid, id: oid, checked: get(ck, null) === oi, onchange: () => set(ck, oi) }), el("label", { for: oid }, t(o))));
          });
          tr.append(cell); return;
        }
        const sel = f.selectCols && f.selectCols[ci];
        if (sel) {
          const s = el("select", { id: cid, "aria-label": t(c), onchange: (e) => set(ck, e.target.value === "" ? null : +e.target.value) },
            el("option", { value: "" }, "—"), sel.map((o, oi) => el("option", { value: oi, selected: get(ck, null) === oi }, t(o))));
          tr.append(el("td", {}, s)); return;
        }
        const ph = f.placeholders && ci === 0 && f.placeholders[r] ? t(f.placeholders[r]) : (r === 0 && f.colExamples && f.colExamples[ci] ? t(f.colExamples[ci]) : "");
        const ta = el("textarea", { id: cid, rows: 2, "aria-label": t(c), placeholder: ph, oninput: (e) => set(ck, e.target.value) });
        ta.value = get(ck, "");
        tr.append(el("td", {}, ta));
      });
      body.append(tr);
    }
    tbl.append(body);
    box.append(tbl);
    if (!fixed) box.append(el("button", { type: "button", class: "addrow no-print", onclick: () => { set(key(k, "n"), n + 1); render(); } }, t(UI.addRow)));
    return box;
  }

  function updRecord(rl) {
    rl.innerHTML = "";
    rl.append(el("span", {}, t(UI.articleCode) + ": ", el("strong", {}, get("id.id.code", "") || "—")),
              el("span", {}, t(UI.curator) + ": ", el("strong", {}, get("id.id.curator", "") || "—")));
  }

  /* ---------- page ---------- */
  function render() {
    document.documentElement.lang = { pt: "pt-PT", en: "en", es: "es", it: "it", ko: "ko" }[state.lang] || "pt-PT";
    document.title = t(S.meta.title) + " · " + t(S.meta.subtitle);
    const app = document.getElementById("app");
    app.innerHTML = "";

    const head = el("header", { class: "top" },
      el("div", { class: "brand" }, el("p", { class: "kicker" }, t(S.meta.title)), el("h1", {}, t(S.meta.subtitle)), el("p", { class: "lede" }, t(S.meta.intro))),
      el("div", { class: "toolbar no-print" },
        el("div", { class: "langs", role: "group", "aria-label": "Language" },
          ["pt", "en", "es", "it", "ko"].map((l) => el("button", { type: "button", class: l === state.lang ? "on" : "", "aria-pressed": l === state.lang, onclick: () => { state.lang = l; save(); render(); } }, UI.lang[l]))),
        el("button", { type: "button", onclick: showStatus }, t(UI.statusBtn)),
        el("button", { type: "button", onclick: showStatement }, t(UI.statementBtn)),
        el("button", { type: "button", onclick: exportDocx }, t(UI.exportDocx)),
        el("button", { type: "button", onclick: exportMd }, t(UI.exportMd)),
        el("button", { type: "button", onclick: exportJson }, t(UI.exportJson)),
        el("label", { class: "btn" }, t(UI.importJson), el("input", { type: "file", accept: "application/json,.json", hidden: true, onchange: importJson })),
        el("button", { type: "button", onclick: () => window.print() }, t(UI.print)),
        el("button", { type: "button", class: "danger", onclick: () => { if (confirm(t(UI.resetConfirm))) { state.v = {}; save(); render(); } } }, t(UI.reset)),
        el("span", { id: "status", class: "status", role: "status", "aria-live": "polite" }, t(UI.privacy))
      )
    );

    const nav = el("nav", { class: "phases no-print", "aria-label": t(UI.phases) },
      S.sections.map((s) => el("a", { href: "#" + s.id }, s.phase ? String(s.phase) : "i", el("span", {}, s.phase ? " " + t(s.title).split("·")[1] : " " + t(s.title)))));

    const howto = el("details", { class: "howto no-print" }, el("summary", {}, t(UI.howto)), el("ol", {}, S.meta.howto.map((h) => el("li", {}, t(h)))));

    const main = el("main");
    S.sections.forEach((sec) => {
      const sh = el("section", { id: sec.id, class: "sheet" + (sec.phase ? " phase p" + sec.phase : " intro") });
      sh.append(el("div", { class: "band" }, el("h2", {}, t(sec.title)), sec.subtitle ? el("p", {}, t(sec.subtitle)) : null));
      if (sec.prompt) sh.append(el("p", { class: "prompt" }, t(sec.prompt)));
      if (sec.phase) {
        const rl = el("p", { class: "recordline" }); updRecord(rl); sh.append(rl);
      }
      sec.blocks.filter(shown).forEach((blk) => {
        const b = el("div", { class: "block" });
        if (blk.title) b.append(el("h3", {}, t(blk.title)));
        if (blk.note) b.append(el("p", { class: "note" }, t(blk.note)));
        blk.fields.filter(shown).forEach((f) => b.append(renderField(sec, blk, f)));
        sh.append(b);
      });
      main.append(sh);
    });

    const foot = el("footer", {}, el("h2", {}, t(UI.refs)), el("p", {}, t(S.meta.references)));
    app.append(head, nav, howto, main, foot);
    if (stmtAuto()) syncStmt();
  }

  /* ---------- export / import ---------- */
  function download(name, text, type) {
    const a = el("a", { href: URL.createObjectURL(new Blob([text], { type })), download: name });
    document.body.append(a); a.click(); a.remove();
  }
  const fileBase = () => (get("id.id.code", "") || "AICP").replace(/[^\w.-]+/g, "_");

  function exportJson() {
    download(fileBase() + ".json", JSON.stringify({ schema: "aicp-forms-v2", lang: state.lang, exported: new Date().toISOString(), values: state.v }, null, 2), "application/json");
  }
  function importJson(e) {
    const file = e.target.files[0]; if (!file) return;
    file.text().then((txt) => {
      try { const o = JSON.parse(txt); if (!o || typeof o.values !== "object") throw 0; state.v = o.values; if (o.lang) state.lang = o.lang; save(); render(); }
      catch (err) { alert(t(UI.badFile)); }
    });
  }

  function mdEsc(s) { return String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, "<br>"); }
  function exportMd() {
    const out = ["# " + t(S.meta.title), "", "**" + t(S.meta.subtitle) + "**", ""];
    S.sections.forEach((sec) => {
      out.push("## " + t(sec.title) + (sec.subtitle ? ": " + t(sec.subtitle) : ""), "");
      sec.blocks.filter(shown).forEach((blk) => {
        if (blk.title) out.push("### " + t(blk.title), "");
        if (blk.note) out.push("> " + t(blk.note), "");
        blk.fields.filter(shown).forEach((f) => {
          const k = key(sec.id, blk.id, f.id);
          if (f.type === "text" || f.type === "date" || f.type === "textarea") {
            out.push("**" + t(f.label) + "**", "", (get(k, "") || "_(" + ({ pt: "vazio", en: "empty", es: "vacío", it: "vuoto", ko: "비어 있음" })[state.lang] + ")_"), "");
          } else if (f.type === "radio" || f.type === "check") {
            const cur = get(k, f.type === "check" ? [] : null);
            const marks = f.options.map((o, i) => ((f.type === "check" ? cur.includes(i) : cur === i) ? "[x] " : "[ ] ") + t(o)).join("  ");
            const det = get(key(k, "detail"), "");
            out.push("**" + t(f.label) + "**: " + marks + (det ? " (" + det + ")" : ""), "");
          } else {
            const fixed = f.fixedRows || f.type === "radioTable";
            const n = fixed ? f.rowLabels.length : Math.max(f.rows || 3, get(key(k, "n"), 0));
            out.push("| " + f.columns.map(t).join(" | ") + " |", "|" + f.columns.map(() => " --- |").join(""));
            for (let r = 0; r < n; r++) {
              const cells = f.columns.map((c, ci) => {
                if (fixed && ci === 0) return mdEsc(rowLabelText(f, r));
                const v = get(key(k, r, ci), f.type === "radioTable" || (f.selectCols && f.selectCols[ci]) ? null : "");
                if (f.type === "radioTable" && ci === 1) return v == null ? "" : t(f.options[v]);
                if (f.selectCols && f.selectCols[ci]) return v == null ? "" : t(f.selectCols[ci][v]);
                return mdEsc(v);
              });
              if (fixed || cells.some((c) => c)) out.push("| " + cells.join(" | ") + " |");
            }
            out.push("");
          }
        });
      });
    });
    out.push("---", "", t(S.meta.references), "");
    download(fileBase() + ".md", out.join("\n"), "text/markdown");
  }

  /* ---------- shared helpers for the extra outputs ---------- */
  function rowsOf(f, k) {
    const fixed = f.fixedRows || f.type === "radioTable";
    return fixed ? f.rowLabels.length : Math.max(f.rows || 3, get(key(k, "n"), 0));
  }
  function cellText(f, k, r, ci) {
    const fixed = f.fixedRows || f.type === "radioTable";
    if (fixed && ci === 0) return rowLabelText(f, r);
    const v = get(key(k, r, ci), null);
    if (f.type === "radioTable" && ci === 1) return v == null ? "" : t(f.options[v]);
    if (f.selectCols && f.selectCols[ci]) return v == null ? "" : t(f.selectCols[ci][v]);
    return v || "";
  }
  function isFilled(f, k) {
    if (["text", "date", "textarea"].includes(f.type)) return !!String(get(k, "")).trim();
    if (f.type === "radio") return get(k, null) != null;
    if (f.type === "check") return get(k, []).length > 0;
    const n = rowsOf(f, k);
    if (f.type === "radioTable") { for (let r = 0; r < n; r++) if (get(key(k, r, 1), null) == null) return false; return true; }
    for (let r = 0; r < n; r++) for (let ci = 0; ci < f.columns.length; ci++) {
      if ((f.fixedRows) && ci === 0) continue;
      if (String(cellText(f, k, r, ci)).trim()) return true;
    }
    return false;
  }
  const fieldName = (f) => t(f.label) || f.columns.map(t).join(" / ");

  function openDialog(title, body, actions) {
    const dlg = el("dialog", { class: "dlg" },
      el("h2", {}, title), body,
      el("div", { class: "dlg-actions" }, actions || [], el("button", { type: "button", onclick: () => dlg.close() }, t(UI.close))));
    dlg.addEventListener("close", () => dlg.remove());
    document.body.append(dlg);
    dlg.showModal();
    return dlg;
  }

  /* ---------- 1. process status ---------- */
  function phase5Check() {
    const k = "p5.a.group", f = S.sections.find((s) => s.id === "p5").blocks[0].fields[0];
    let indep = 0;
    for (let r = 0; r < rowsOf(f, k); r++) {
      const name = String(get(key(k, r, 0), "") || "").trim();
      if (name && get(key(k, r, 2), null) === 0) indep++;
    }
    return { indep, ok: indep > 0 };
  }

  function showStatus() {
    const body = el("div", { class: "status-body" });
    const list = el("ul", { class: "status-list" });
    S.sections.forEach((sec) => {
      let total = 0, done = 0; const missing = [];
      sec.blocks.filter(shown).forEach((blk) => blk.fields.filter(shown).forEach((f) => {
        const k = key(sec.id, blk.id, f.id); total++;
        if (isFilled(f, k)) done++; else missing.push(fieldName(f));
      }));
      const pct = Math.round((100 * done) / total);
      const li = el("li", {},
        el("div", { class: "st-head" }, el("strong", {}, t(sec.title)), el("span", { class: "st-count" }, done + " / " + total)),
        el("div", { class: "bar", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100 }, el("span", { style: "width:" + pct + "%" })));
      if (missing.length) li.append(el("details", {}, el("summary", {}, t(UI.emptyFields) + " (" + missing.length + ")"), el("ul", {}, missing.map((m) => el("li", {}, m)))));
      list.append(li);
    });
    const p5 = phase5Check();
    const p5msg = p5.ok ? t(UI.p5ok) : t(UI.p5notok)
      + (p5.indep ? "" : " " + t(UI.p5noIndep));
    const condTotal = (hasText() ? 5 : 0) + (hasVisual() ? 5 : 0);
    const conds = (hasText() ? get("p6.b.conditions", []).length : 0) + (hasVisual() ? get("p6.b.vconditions", []).length : 0);
    const decision = get("p6.a.decision", null);
    body.append(list,
      el("p", { class: p5.ok ? "flag ok" : "flag warn" }, el("strong", {}, "Reconciling: "), p5msg),
      el("p", { class: conds === condTotal ? "flag ok" : "flag warn" }, el("strong", {}, t(UI.conditions) + ": "), conds + " / " + condTotal),
      el("p", { class: decision != null ? "flag ok" : "flag warn" }, el("strong", {}, t(UI.decision) + ": "),
        decision != null ? t(S.sections.find((s) => s.id === "p6").blocks[0].fields[0].options[decision]) : t(UI.noDecision)));
    openDialog(t(UI.status), body);
  }

  /* ---------- 2. AI use statement ---------- */
  function buildStatement() {
    const blank = (v, ph) => (v && String(v).trim() ? String(v).trim() : "[" + ph + "]");
    const L = state.lang;
    const fld = (sid, bid, fid) => S.sections.find((s) => s.id === sid).blocks.find((b) => b.id === bid).fields.find((f) => f.id === fid);
    const optTxt = (fid, f) => { const v = get(fid, null); return v == null ? null : (f.other && v === f.options.length - 1 ? get(fid + ".detail", "") : t(f.options[v])); };
    const m = media();
    const typeParts = [];
    if (hasText()) { const x = optTxt("id.id.type", fld("id", "id", "type")); if (x) typeParts.push(x.toLowerCase()); }
    if (hasVisual()) { const x = optTxt("id.id.vtype", fld("id", "id", "vtype")); if (x) typeParts.push(x.toLowerCase()); }
    const typeTxt = typeParts.join(", ");
    const degF = fld("p1", "a", "degree"), degV = get("p1.a.degree", null);
    const degTxt = degV == null ? "" : t(degF.options[degV]).toLowerCase() + (degV === 1 && get("p1.a.degree.detail", "") ? " (" + get("p1.a.degree.detail", "") + ")" : "");
    const tool = get("p1.a.tool", ""), when = get("p1.a.when", "");
    const docs = get("p1.a.docs", null) === 1 ? get("p1.a.docs.detail", "") : null;
    let nClaims = 0, nExists = 0, nSays = 0, nEl = 0, nElOk = 0, nBad = 0;
    if (hasText()) {
      const cf = fld("p2", "b", "claims");
      for (let r = 0; r < rowsOf(cf, "p2.b.claims"); r++) {
        if (!String(get(key("p2.b.claims", r, 0), "") || "").trim()) continue;
        nClaims++;
        const ex = get(key("p2.b.claims", r, 1), null) === 0, sa = get(key("p2.b.claims", r, 2), null) === 0;
        if (ex) nExists++;
        if (sa) nSays++;
        if (!(ex && sa)) nBad++;
      }
    }
    if (hasVisual()) {
      const ef = fld("p2", "e", "elements");
      for (let r = 0; r < rowsOf(ef, "p2.e.elements"); r++) {
        if (!String(get(key("p2.e.elements", r, 0), "") || "").trim()) continue;
        nEl++; if (get(key("p2.e.elements", r, 1), null) === 0) nElOk++;
      }
    }
    const gf = fld("p5", "a", "group"), group = [];
    for (let r = 0; r < rowsOf(gf, "p5.a.group"); r++) {
      const role = String(get(key("p5.a.group", r, 1), "") || "").trim();
      const name = String(get(key("p5.a.group", r, 0), "") || "").trim();
      if (role || name) group.push(role || name);
    }
    const p5 = phase5Check();
    const decF = fld("p6", "a", "decision"), decV = get("p6.a.decision", null);
    const decTxt = decV != null ? t(decF.options[decV]).toLowerCase() : "";
    const allConds = (!hasText() || get("p6.b.conditions", []).length === 5) && (!hasVisual() || get("p6.b.vconditions", []).length === 5);
    const labelled = hasVisual() && get("p6.b.vconditions", []).includes(0);
    const code = get("id.id.code", "");
    const kind = m == null ? 0 : m; // 0 text, 1 image, 2 video, 3 mixed

    const W = {
      pt: { dest: "Utilização prevista: ", pdNo: "Não foram introduzidos dados pessoais ou confidenciais na ferramenta.", pdYes: "Foram introduzidos dados pessoais ou confidenciais, protegidos da seguinte forma: ", pdPh: "salvaguardas",
            wm: "A marca de água e os metadados de origem foram preservados.", lim: "Limitações: ",
            notUsed: "[Decisão: não utilizar. Se o conteúdo não for usado, não é necessária declaração.]",
            wRefs: (k) => "[Atenção: " + k + " afirmação(ões) ou referência(s) por confirmar; resolver antes de usar.]",
            wEls: (k) => "[Atenção: " + k + " elemento(s) da imagem ou do vídeo incorreto(s) ou por verificar.]",
            wRights: "[Atenção: direitos ainda por verificar (Fase 4).]", wReal: "[Atenção: o conteúdo pode ser tomado como real e precisa de revisão (Fase 4).]",
            wLabel: "[Atenção: falta a identificação visível “gerado com IA” (Fase 6).]", wExpert: "[Atenção: falta o parecer de alguém que domine o tema (Fase 4).]",
            obj: ["do texto", "da imagem", "do vídeo", "do conteúdo"], tp: "tipo", tool: "ferramenta e versão", date: "data",
            open: (o, ty, tl, dt) => "Na preparação " + o + " (" + ty + "), foi utilizado o " + tl + ", em " + dt + ".",
            part: "Parte gerada pela IA: ", purpose: "A ferramenta foi usada para [finalidades: por exemplo, redação de uma primeira versão, revisão de linguagem, tradução, criação de uma ilustração].",
            docs: "Foram fornecidos à ferramenta os seguintes materiais: ", audit: "A utilização foi auditada com o AI Curatorial Protocol (AICP; Costa et al., 2026), incluindo o registo de proveniência",
            claims: (n, a, b) => ", a verificação de " + n + " afirmações e referências (" + a + " confirmadas na fonte; " + b + " com conteúdo confirmado)", claimsTodo: ", a verificação das referências [indicar quantas]",
            els: (n, a) => ", a verificação de " + n + " elementos representados (" + a + " corretos)", elsTodo: ", a verificação do que a imagem ou o vídeo representa [indicar]",
            bias: ", uma auditoria de enviesamentos", cross: ", a validação cruzada por ", crossTodo: ", a validação cruzada por [composição do grupo independente]", dec: " e uma decisão documentada",
            lab: "O conteúdo visual está identificado como gerado por IA.", rec: (c) => "Registo AICP: " + c + ", disponível em [local do depósito].",
            endT: "O conteúdo e as referências foram verificados e são da responsabilidade de quem assina.", endV: "O conteúdo foi verificado e é da responsabilidade de quem assina.", todo: "[Concluir as condições da Fase 6 antes de afirmar:] " },
      en: { dest: "Intended use: ", pdNo: "No personal or confidential data were entered into the tool.", pdYes: "Personal or confidential data were entered, protected as follows: ", pdPh: "safeguards",
            wm: "The watermark and origin metadata were preserved.", lim: "Limitations: ",
            notUsed: "[Decision: do not use. If the content is not used, no statement is needed.]",
            wRefs: (k) => "[Warning: " + k + " claim(s) or reference(s) not confirmed; resolve before use.]",
            wEls: (k) => "[Warning: " + k + " element(s) of the image or video incorrect or unchecked.]",
            wRights: "[Warning: rights not yet checked (Phase 4).]", wReal: "[Warning: the content could be taken as real and needs revising (Phase 4).]",
            wLabel: "[Warning: the visible “AI-generated” label is missing (Phase 6).]", wExpert: "[Warning: an opinion from someone who knows the topic is missing (Phase 4).]",
            obj: ["this text", "this image", "this video", "this content"], tp: "type", tool: "tool and version", date: "date",
            open: (o, ty, tl, dt) => "In preparing " + o + " (" + ty + "), " + tl + " was used on " + dt + ".",
            part: "Part generated by AI: ", purpose: "The tool was used to [purposes: e.g. drafting a first version, language editing, translation, creating an illustration].",
            docs: "The following materials were provided to the tool: ", audit: "Its use was audited with the AI Curatorial Protocol (AICP; Costa et al., 2026), including a provenance record",
            claims: (n, a, b) => ", the checking of " + n + " claims and references (" + a + " confirmed at source; " + b + " with content confirmed)", claimsTodo: ", reference checking [state how many]",
            els: (n, a) => ", the checking of " + n + " depicted elements (" + a + " correct)", elsTodo: ", checking of what the image or video depicts [state]",
            bias: ", a bias audit", cross: ", cross-validation by ", crossTodo: ", cross-validation by [composition of the independent group]", dec: " and a documented decision",
            lab: "The visual content is labelled as AI-generated.", rec: (c) => "AICP record: " + c + ", available at [repository location].",
            endT: "The content and references were checked and are the responsibility of the signatories.", endV: "The content was checked and is the responsibility of the signatories.", todo: "[Complete the Phase 6 conditions before stating:] " },
      es: { dest: "Uso previsto: ", pdNo: "No se introdujeron datos personales o confidenciales en la herramienta.", pdYes: "Se introdujeron datos personales o confidenciales, protegidos de la siguiente forma: ", pdPh: "salvaguardas",
            wm: "Se preservaron la marca de agua y los metadatos de origen.", lim: "Limitaciones: ",
            notUsed: "[Decisión: no utilizar. Si el contenido no se usa, no hace falta declaración.]",
            wRefs: (k) => "[Atención: " + k + " afirmación(es) o referencia(s) sin confirmar; resolver antes de usar.]",
            wEls: (k) => "[Atención: " + k + " elemento(s) de la imagen o el vídeo incorrecto(s) o sin verificar.]",
            wRights: "[Atención: derechos aún sin verificar (Fase 4).]", wReal: "[Atención: el contenido puede tomarse como real y necesita revisión (Fase 4).]",
            wLabel: "[Atención: falta la identificación visible “generado con IA” (Fase 6).]", wExpert: "[Atención: falta el parecer de alguien que domine el tema (Fase 4).]",
            obj: ["del texto", "de la imagen", "del vídeo", "del contenido"], tp: "tipo", tool: "herramienta y versión", date: "fecha",
            open: (o, ty, tl, dt) => "En la preparación " + o + " (" + ty + ") se utilizó " + tl + ", en " + dt + ".",
            part: "Parte generada por la IA: ", purpose: "La herramienta se utilizó para [finalidades: por ejemplo, redacción de una primera versión, revisión lingüística, traducción, creación de una ilustración].",
            docs: "Se proporcionaron a la herramienta los siguientes materiales: ", audit: "El uso fue auditado con el AI Curatorial Protocol (AICP; Costa et al., 2026), incluyendo el registro de procedencia",
            claims: (n, a, b) => ", la verificación de " + n + " afirmaciones y referencias (" + a + " confirmadas en la fuente; " + b + " con contenido confirmado)", claimsTodo: ", la verificación de las referencias [indicar cuántas]",
            els: (n, a) => ", la verificación de " + n + " elementos representados (" + a + " correctos)", elsTodo: ", la verificación de lo que representa la imagen o el vídeo [indicar]",
            bias: ", una auditoría de sesgos", cross: ", la validación cruzada por ", crossTodo: ", la validación cruzada por [composición del grupo independiente]", dec: " y una decisión documentada",
            lab: "El contenido visual está identificado como generado por IA.", rec: (c) => "Registro AICP: " + c + ", disponible en [lugar del depósito].",
            endT: "El contenido y las referencias fueron verificados y son responsabilidad de quienes firman.", endV: "El contenido fue verificado y es responsabilidad de quienes firman.", todo: "[Completar las condiciones de la Fase 6 antes de afirmar:] " },
      it: { dest: "Uso previsto: ", pdNo: "Nello strumento non sono stati inseriti dati personali o riservati.", pdYes: "Sono stati inseriti dati personali o riservati, protetti nel modo seguente: ", pdPh: "garanzie",
            wm: "La filigrana e i metadati di origine sono stati conservati.", lim: "Limiti: ",
            notUsed: "[Decisione: non utilizzare. Se il contenuto non viene usato, non serve alcuna dichiarazione.]",
            wRefs: (k) => "[Attenzione: " + k + " affermazione/i o riferimento/i non confermato/i; risolvere prima dell'uso.]",
            wEls: (k) => "[Attenzione: " + k + " elemento/i dell'immagine o del video errato/i o non verificato/i.]",
            wRights: "[Attenzione: diritti non ancora verificati (Fase 4).]", wReal: "[Attenzione: il contenuto può essere scambiato per reale e va rivisto (Fase 4).]",
            wLabel: "[Attenzione: manca l'indicazione visibile “generato con IA” (Fase 6).]", wExpert: "[Attenzione: manca il parere di qualcuno che conosca il tema (Fase 4).]",
            obj: ["del testo", "dell'immagine", "del video", "del contenuto"], tp: "tipo", tool: "strumento e versione", date: "data",
            open: (o, ty, tl, dt) => "Nella preparazione " + o + " (" + ty + ") è stato utilizzato " + tl + ", in data " + dt + ".",
            part: "Parte generata dall'IA: ", purpose: "Lo strumento è stato utilizzato per [finalità: per esempio, stesura di una prima versione, revisione linguistica, traduzione, creazione di un'illustrazione].",
            docs: "Allo strumento sono stati forniti i seguenti materiali: ", audit: "L'uso è stato sottoposto ad audit con l'AI Curatorial Protocol (AICP; Costa et al., 2026), comprendente il registro di provenienza",
            claims: (n, a, b) => ", la verifica di " + n + " affermazioni e riferimenti (" + a + " confermati alla fonte; " + b + " con contenuto confermato)", claimsTodo: ", la verifica dei riferimenti [indicare quanti]",
            els: (n, a) => ", la verifica di " + n + " elementi rappresentati (" + a + " corretti)", elsTodo: ", la verifica di ciò che rappresenta l'immagine o il video [indicare]",
            bias: ", un audit dei bias", cross: ", la validazione incrociata da parte di ", crossTodo: ", la validazione incrociata da parte di [composizione del gruppo indipendente]", dec: " e una decisione documentata",
            lab: "Il contenuto visivo è indicato come generato dall'IA.", rec: (c) => "Registro AICP: " + c + ", disponibile in [luogo del deposito].",
            endT: "Il contenuto e i riferimenti sono stati verificati e sono sotto la responsabilità di chi firma.", endV: "Il contenuto è stato verificato ed è sotto la responsabilità di chi firma.", todo: "[Completare le condizioni della Fase 6 prima di affermare:] " },
      ko: { dest: "사용 목적: ", pdNo: "도구에 개인정보나 기밀 정보를 입력하지 않았습니다.", pdYes: "개인정보나 기밀 정보를 입력했으며, 다음과 같이 보호했습니다: ", pdPh: "보호 조치",
            wm: "워터마크와 출처 메타데이터를 보존했습니다.", lim: "한계: ",
            notUsed: "[결정: 사용하지 않음. 콘텐츠를 사용하지 않으면 고지문이 필요하지 않습니다.]",
            wRefs: (k) => "[주의: 확인되지 않은 주장 또는 참고문헌 " + k + "건; 사용 전에 해결하십시오.]",
            wEls: (k) => "[주의: 이미지나 영상의 요소 " + k + "건이 부정확하거나 확인되지 않았습니다.]",
            wRights: "[주의: 권리 확인이 아직 끝나지 않았습니다(4단계).]", wReal: "[주의: 콘텐츠가 실제로 오인될 수 있어 수정이 필요합니다(4단계).]",
            wLabel: "[주의: 눈에 보이는 “AI 생성” 표시가 없습니다(6단계).]", wExpert: "[주의: 주제를 잘 아는 사람의 의견이 없습니다(4단계).]",
            obj: ["본 텍스트", "본 이미지", "본 영상", "본 콘텐츠"], tp: "유형", tool: "도구와 버전", date: "날짜",
            open: (o, ty, tl, dt) => o + "(" + ty + ")의 제작에는 " + dt + "에 " + tl + "을(를) 사용하였습니다.",
            part: "AI가 생성한 부분: ", purpose: "도구는 [목적: 예를 들어 초안 작성, 문장 교정, 번역, 삽화 제작]에 사용되었습니다.",
            docs: "도구에 제공한 자료: ", audit: "AI 사용은 AI Curatorial Protocol(AICP; Costa et al., 2026)에 따라 점검하였으며, 여기에는 출처 기록",
            claims: (n, a, b) => ", 주장과 참고문헌 " + n + "건의 확인(" + a + "건 원문 실재 확인, " + b + "건 내용 일치 확인)", claimsTodo: ", 참고문헌 확인[건수 기재]",
            els: (n, a) => ", 표현된 요소 " + n + "건의 확인(" + a + "건 정확)", elsTodo: ", 이미지나 영상이 표현한 내용의 확인[기재]",
            bias: ", 편향 점검", cross: ", 다음 검토자에 의한 교차 검증: ", crossTodo: ", 교차 검증[독립 검토자 구성 기재]", dec: ", 그리고 문서화된 결정",
            lab: "시각 콘텐츠에는 AI 생성물임을 표시하였습니다.", rec: (c) => "AICP 기록: " + c + ", [보관 위치]에서 열람 가능.",
            endT: "내용과 참고문헌은 확인을 거쳤으며 이에 대한 책임은 서명자에게 있습니다.", endV: "내용은 확인을 거쳤으며 이에 대한 책임은 서명자에게 있습니다.", todo: "[6단계 확인 사항을 마친 뒤 기재:] " }
    }[L] || null;
    const w = W || {};
    const s = [];
    const dot = (x) => { x = String(x).trim(); return /[.!?。»"”]$/.test(x) ? x : x + "."; };
    // Warnings first: they disappear as the problems are resolved in the forms.
    if (decV === 3) s.push(w.notUsed);
    if (nBad) s.push(w.wRefs(nBad));
    if (nEl - nElOk > 0) s.push(w.wEls(nEl - nElOk));
    if ((hasText() && [1, 2].includes(get("p4.b.plagiarism", null))) || (hasVisual() && [1, 2].includes(get("p4.b.vrights", null)))) s.push(w.wRights);
    if (hasVisual() && get("p4.b.real", null) === 2) s.push(w.wReal);
    if (hasVisual() && !labelled && (get("p4.b.real", null) === 1 || get("id.id.vtype", null) === 1)) s.push(w.wLabel);
    if (get("p4.b.expertise", null) === 2) s.push(w.wExpert);
    s.push(w.open(w.obj[kind], blank(typeTxt, w.tp), blank(tool, w.tool), blank(when, w.date)));
    if (degV != null) s.push(w.part + degTxt + ".");
    s.push(w.purpose);
    const dest = String(get("id.id.purpose", "") || "").trim();
    if (dest) s.push(dot(w.dest + dest));
    if (docs) s.push(w.docs + docs + ".");
    const pd = get("p1.a.personal", null);
    if (pd === 0) s.push(w.pdNo);
    else if (pd === 1) s.push(w.pdYes + blank(get("p1.a.personal.detail", ""), w.pdPh) + ".");
    let a = w.audit;
    if (hasText()) a += nClaims ? w.claims(nClaims, nExists, nSays) : w.claimsTodo;
    if (hasVisual()) a += nEl ? w.els(nEl, nElOk) : w.elsTodo;
    a += w.bias + (p5.ok && group.length ? w.cross + group.join(", ") : w.crossTodo) + w.dec + (decTxt ? " (" + decTxt + ")" : "");
    s.push(a + (L === "ko" ? "이 포함됩니다." : "."));
    if (labelled) s.push(w.lab);
    if (hasVisual() && get("p6.b.vconditions", []).includes(1)) s.push(w.wm);
    const lim = String(get("p4.c.curatorial", "") || "").trim();
    if (lim) s.push(dot(w.lim + lim.replace(/^[«"“]|[»"”]$/g, "")));
    if (code) s.push(w.rec(code));
    const end = hasText() ? w.endT : w.endV;
    s.push(allConds ? end : w.todo + end);
    return s.join(" ");
  }

  function showStatement() {
    const ta = el("textarea", { rows: 12, class: "stmt", "aria-label": t(UI.statement) });
    ta.value = buildStatement();
    const info = el("p", { class: "hint" }, t(UI.stmtHint));
    const copyBtn = el("button", { type: "button", onclick: () => {
      const done = () => { copyBtn.textContent = t(UI.copied); };
      if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(done, () => { ta.select(); document.execCommand("copy"); done(); });
      else { ta.select(); document.execCommand("copy"); done(); }
    } }, t(UI.copy));
    const insBtn = el("button", { type: "button", onclick: () => {
      state.v[STMT + ".auto"] = ta.value === buildStatement(); set(STMT, ta.value); dlg.close(); render();
      const target = document.getElementById("p6-c-statement"); if (target) target.scrollIntoView({ block: "center" });
    } }, t(UI.insert));
    const dlg = openDialog(t(UI.statement), el("div", {}, info, ta), [copyBtn, insBtn]);
  }

  /* ---------- 3. Word (.docx) export, no dependencies ---------- */
  const xmlEsc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const PHASE_HEX = { 1: "2F4858", 2: "33658A", 3: "55828B", 4: "6B5B95", 5: "3D405B", 6: "C8553D" };
  function wRun(text, o) {
    o = o || {};
    const pr = (o.b ? "<w:b/>" : "") + (o.i ? "<w:i/>" : "") + (o.color ? '<w:color w:val="' + o.color + '"/>' : "") + (o.sz ? '<w:sz w:val="' + o.sz + '"/><w:szCs w:val="' + o.sz + '"/>' : "");
    return String(text).split("\n").map((line, i) => (i ? "<w:r><w:br/></w:r>" : "") + "<w:r>" + (pr ? "<w:rPr>" + pr + "</w:rPr>" : "") + '<w:t xml:space="preserve">' + xmlEsc(line) + "</w:t></w:r>").join("");
  }
  function wP(runs, o) {
    o = o || {};
    const ppr = (o.style ? '<w:pStyle w:val="' + o.style + '"/>' : "") + (o.pageBreak ? "<w:pageBreakBefore/>" : "")
      + (o.shade ? '<w:shd w:val="clear" w:color="auto" w:fill="' + o.shade + '"/>' : "")
      + '<w:spacing w:before="' + (o.before || 0) + '" w:after="' + (o.after == null ? 80 : o.after) + '"/>';
    return "<w:p><w:pPr>" + ppr + "</w:pPr>" + runs + "</w:p>";
  }
  function wTable(header, rows, widths) {
    const total = 9360, w = widths || header.map(() => Math.floor(total / header.length));
    const cell = (txt, i, head) => '<w:tc><w:tcPr><w:tcW w:w="' + w[i] + '" w:type="dxa"/>' + (head ? '<w:shd w:val="clear" w:color="auto" w:fill="E8EEF6"/>' : "") + "</w:tcPr>" + wP(wRun(txt || "", { b: head, sz: 18 }), { after: 0 }) + "</w:tc>";
    const row = (cells, head) => "<w:tr>" + cells.map((c, i) => cell(c, i, head)).join("") + "</w:tr>";
    const borders = ["top", "left", "bottom", "right", "insideH", "insideV"].map((b) => "<w:" + b + ' w:val="single" w:sz="4" w:space="0" w:color="999999"/>').join("");
    return '<w:tbl><w:tblPr><w:tblW w:w="' + total + '" w:type="dxa"/><w:tblBorders>' + borders + '</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>'
      + w.map((x) => '<w:gridCol w:w="' + x + '"/>').join("") + "</w:tblGrid>" + row(header, true) + rows.map((r) => row(r, false)).join("") + "</w:tbl>" + wP("", { after: 120 });
  }
  function buildDocumentXml() {
    const b = [];
    b.push(wP(wRun(t(S.meta.title).toUpperCase(), { b: true, color: "1F3A5F", sz: 18 }), { after: 40 }));
    b.push(wP(wRun(t(S.meta.subtitle), { b: true, sz: 36 }), { after: 120 }));
    b.push(wP(wRun(t(S.meta.intro), { i: true, color: "5B6470", sz: 20 }), { after: 200 }));
    S.sections.forEach((sec, si) => {
      const hex = sec.phase ? PHASE_HEX[sec.phase] : "1F3A5F";
      b.push(wP(wRun(t(sec.title).toUpperCase(), { b: true, color: "FFFFFF", sz: 28 }), { shade: hex, pageBreak: si > 0, after: 0, before: 0 }));
      if (sec.subtitle) b.push(wP(wRun(t(sec.subtitle), { color: "FFFFFF", sz: 20 }), { shade: hex, after: 120 }));
      if (sec.prompt) b.push(wP(wRun(t(sec.prompt), { i: true, color: "5B6470", sz: 20 }), { after: 120 }));
      if (sec.phase) b.push(wP(wRun(t(UI.articleCode) + ": ", { sz: 18, color: "5B6470" }) + wRun(get("id.id.code", "") || "—", { b: true, sz: 18 }) + wRun("    " + t(UI.curator) + ": ", { sz: 18, color: "5B6470" }) + wRun(get("id.id.curator", "") || "—", { b: true, sz: 18 }), { after: 120 }));
      sec.blocks.filter(shown).forEach((blk) => {
        if (blk.title) b.push(wP(wRun(t(blk.title).toUpperCase(), { b: true, color: hex, sz: 20 }), { before: 160, after: 80 }));
        if (blk.note) b.push(wP(wRun(t(blk.note), { i: true, color: "5B6470", sz: 18 }), { after: 120 }));
        blk.fields.filter(shown).forEach((f) => {
          const k = key(sec.id, blk.id, f.id);
          if (["text", "date", "textarea"].includes(f.type)) {
            b.push(wP(wRun(t(f.label), { b: true, sz: 20 }) + (helpText(f) ? wRun("  " + helpText(f), { i: true, color: "5B6470", sz: 17 }) : ""), { after: 20 }));
            b.push(wP(wRun(get(k, "") || " ", { sz: 20 }), { after: 140 }));
          } else if (f.type === "radio" || f.type === "check") {
            const cur = get(k, f.type === "check" ? [] : null);
            const det = get(key(k, "detail"), "");
            const opts = f.options.map((o, i) => ((f.type === "check" ? cur.includes(i) : cur === i) ? "☒ " : "☐ ") + optText(f, i)).join(f.optionHints ? "\n" : "     ");
            b.push(wP(wRun(t(f.label), { b: true, sz: 20 }), { after: 20 }));
            b.push(wP(wRun(opts + (det ? "  (" + det + ")" : ""), { sz: 20 }), { after: 140 }));
          } else {
            const n = rowsOf(f, k), rows = [];
            for (let r = 0; r < n; r++) {
              const cells = f.columns.map((c, ci) => (f.type === "radioTable" && ci === 1)
                ? f.options.map((o, oi) => (get(key(k, r, 1), null) === oi ? "☒ " : "☐ ") + t(o)).join("  ")
                : cellText(f, k, r, ci));
              const fixed = f.fixedRows || f.type === "radioTable";
              if (fixed || cells.some((c) => String(c).trim()) || r < (f.rows || 3)) rows.push(cells);
            }
            b.push(wTable(f.columns.map(t), rows));
          }
        });
      });
    });
    b.push(wP(wRun(t(UI.refs), { b: true, sz: 20 }), { pageBreak: true }));
    b.push(wP(wRun(t(S.meta.references), { sz: 18 })));
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'
      + b.join("") + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>';
  }
  const DOCX_STATIC = {
    "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>',
    "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    "word/_rels/document.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    "word/styles.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:lang w:val="pt-PT"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>'
  };
  // Minimal ZIP writer (stored, no compression) with CRC-32.
  const CRC_TABLE = (() => { const tb = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k2 = 0; k2 < 8; k2++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; tb[n] = c >>> 0; } return tb; })();
  function crc32(bytes) { let c = 0xffffffff; for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  function zip(files) {
    const enc = new TextEncoder(), parts = [], central = [];
    let offset = 0;
    const u16 = (v) => [v & 0xff, (v >>> 8) & 0xff], u32 = (v) => [v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff];
    for (const [name, content] of Object.entries(files)) {
      const nameB = enc.encode(name), data = enc.encode(content), crc = crc32(data);
      const local = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(nameB.length), ...u16(0)]);
      parts.push(local, nameB, data);
      central.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(nameB.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset)]), nameB);
      offset += local.length + nameB.length + data.length;
    }
    const cdSize = central.reduce((a, p) => a + p.length, 0);
    const count = Object.keys(files).length;
    const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(count), ...u16(count), ...u32(cdSize), ...u32(offset), ...u16(0)]);
    return new Blob([...parts, ...central, end], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  }
  function exportDocx() {
    const files = Object.assign({}, DOCX_STATIC, { "word/document.xml": buildDocumentXml() });
    const docLang = { en: "en-GB", es: "es-ES", it: "it-IT", ko: "ko-KR" }[state.lang];
    if (docLang) files["word/styles.xml"] = files["word/styles.xml"].replace('w:val="pt-PT"', 'w:val="' + docLang + '"' + (state.lang === "ko" ? ' w:eastAsia="ko-KR"' : ""));
    if (state.lang === "ko") files["word/styles.xml"] = files["word/styles.xml"].replace('w:eastAsia="Calibri"', 'w:eastAsia="Malgun Gothic"');
    const a = el("a", { href: URL.createObjectURL(zip(files)), download: fileBase() + ".docx" });
    document.body.append(a); a.click(); a.remove();
  }

  function grow(ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 2 + "px"; }
  document.addEventListener("input", (e) => { if (e.target.tagName === "TEXTAREA") grow(e.target); });
  window.addEventListener("beforeprint", () => document.querySelectorAll("textarea").forEach(grow));
  document.addEventListener("DOMContentLoaded", () => { render(); document.querySelectorAll("textarea").forEach((ta) => ta.value && grow(ta)); });
})();
