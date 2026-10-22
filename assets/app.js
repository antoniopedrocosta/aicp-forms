/* AICP forms: rendering, autosave, import/export. No dependencies. */
(function () {
  "use strict";
  const S = window.AICP_SCHEMA;
  const STORE = "aicp-forms-v1";
  const UI = {
    lang: { pt: "PT", en: "EN" },
    exportMd: { pt: "Exportar Markdown", en: "Export Markdown" },
    exportJson: { pt: "Guardar ficheiro (JSON)", en: "Save file (JSON)" },
    importJson: { pt: "Abrir ficheiro (JSON)", en: "Open file (JSON)" },
    print: { pt: "Imprimir / PDF", en: "Print / PDF" },
    reset: { pt: "Limpar tudo", en: "Clear all" },
    resetConfirm: { pt: "Apagar todos os campos preenchidos neste navegador?", en: "Delete all filled-in fields in this browser?" },
    addRow: { pt: "+ linha", en: "+ row" },
    saved: { pt: "Guardado neste navegador", en: "Saved in this browser" },
    notSaved: { pt: "Não foi possível guardar neste navegador; exporte o ficheiro para não perder dados.", en: "Could not save in this browser; export the file to avoid losing data." },
    howto: { pt: "Como usar", en: "How to use" },
    privacy: { pt: "Os dados ficam apenas neste navegador. Nada é enviado para servidores.", en: "Data stays in this browser only. Nothing is sent to any server." },
    refs: { pt: "Referências", en: "References" },
    words: { pt: "palavras", en: "words" },
    detail: { pt: "Especificar", en: "Specify" },
    badFile: { pt: "Ficheiro inválido.", en: "Invalid file." },
    phases: { pt: "Fases", en: "Phases" },
    articleCode: { pt: "Artigo / código", en: "Article / code" },
    curator: { pt: "Curador(a)", en: "Curator" },
    exportDocx: { pt: "Exportar Word", en: "Export Word" },
    statusBtn: { pt: "Estado do processo", en: "Process status" },
    statementBtn: { pt: "Gerar declaração", en: "Generate statement" },
    status: { pt: "Estado do processo", en: "Process status" },
    statement: { pt: "Declaração de uso de IA", en: "AI use statement" },
    stmtHint: { pt: "Rascunho gerado a partir das respostas. O que está entre parênteses retos tem de ser completado ou confirmado. Reveja antes de usar.", en: "Draft generated from the answers. Text in square brackets must be completed or confirmed. Review before use." },
    copy: { pt: "Copiar", en: "Copy" },
    copied: { pt: "Copiado", en: "Copied" },
    insert: { pt: "Colocar na Fase 6", en: "Insert in Phase 6" },
    close: { pt: "Fechar", en: "Close" },
    emptyFields: { pt: "Campos por preencher", en: "Empty fields" },
    p5ok: { pt: "há pelo menos um revisor independente e o grupo reviu o artigo e pelo menos uma das Fases 1 a 4.", en: "there is at least one independent reviewer and the group reviewed the article and at least one of Phases 1 to 4." },
    p5notok: { pt: "ainda não cumpre o requisito.", en: "requirement not yet met." },
    p5noIndep: { pt: "Falta um revisor identificado e independente da produção.", en: "An identified reviewer independent of production is missing." },
    p5noArticle: { pt: "O grupo ainda não reviu o artigo.", en: "The group has not yet reviewed the article." },
    p5noPhases: { pt: "O grupo ainda não reviu nenhuma das Fases 1 a 4.", en: "The group has not yet reviewed any of Phases 1 to 4." },
    conditions: { pt: "Condições da Fase 6 cumpridas", en: "Phase 6 conditions met" },
    decision: { pt: "Decisão", en: "Decision" },
    noDecision: { pt: "por tomar", en: "not yet taken" }
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
  const set = (k, val) => { state.v[k] = val; save(); };

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
    return el("label", { for: id, class: "flabel" }, t(f.label), f.hint ? el("span", { class: "hint" }, t(f.hint)) : null);
  }

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
      const ta = el("textarea", { id, rows: f.rows || 3, oninput: (e) => { set(k, e.target.value); upd(e.target.value); } });
      ta.value = get(k, ""); upd(ta.value);
      wrap.append(fieldLabel(f, id), ta); if (counter) wrap.append(counter);
    } else if (f.type === "radio" || f.type === "check") {
      const fs = el("fieldset", {}, el("legend", { class: "flabel" }, t(f.label), f.hint ? el("span", { class: "hint" }, t(f.hint)) : null));
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
          }
        });
        opts.append(el("span", { class: "opt" }, inp, el("label", { for: oid }, t(o))));
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
        if (fixed && ci === 0) { tr.append(el("th", { scope: "row" }, t(f.rowLabels[r]))); return; }
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
        const ph = f.placeholders && ci === 0 && f.placeholders[r] ? t(f.placeholders[r]) : "";
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
    document.documentElement.lang = state.lang === "pt" ? "pt-PT" : "en";
    document.title = t(S.meta.title) + " · " + t(S.meta.subtitle);
    const app = document.getElementById("app");
    app.innerHTML = "";

    const head = el("header", { class: "top" },
      el("div", { class: "brand" }, el("p", { class: "kicker" }, t(S.meta.title)), el("h1", {}, t(S.meta.subtitle)), el("p", { class: "lede" }, t(S.meta.intro))),
      el("div", { class: "toolbar no-print" },
        el("div", { class: "langs", role: "group", "aria-label": "Language" },
          ["pt", "en"].map((l) => el("button", { type: "button", class: l === state.lang ? "on" : "", "aria-pressed": l === state.lang, onclick: () => { state.lang = l; save(); render(); } }, UI.lang[l]))),
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
      sec.blocks.forEach((blk) => {
        const b = el("div", { class: "block" });
        if (blk.title) b.append(el("h3", {}, t(blk.title)));
        blk.fields.forEach((f) => b.append(renderField(sec, blk, f)));
        if (blk.note) b.append(el("p", { class: "note" }, t(blk.note)));
        sh.append(b);
      });
      main.append(sh);
    });

    const foot = el("footer", {}, el("h2", {}, t(UI.refs)), el("p", {}, t(S.meta.references)));
    app.append(head, nav, howto, main, foot);
  }

  /* ---------- export / import ---------- */
  function download(name, text, type) {
    const a = el("a", { href: URL.createObjectURL(new Blob([text], { type })), download: name });
    document.body.append(a); a.click(); a.remove();
  }
  const fileBase = () => (get("id.id.code", "") || "AICP").replace(/[^\w.-]+/g, "_");

  function exportJson() {
    download(fileBase() + ".json", JSON.stringify({ schema: "aicp-forms-v1", lang: state.lang, exported: new Date().toISOString(), values: state.v }, null, 2), "application/json");
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
      sec.blocks.forEach((blk) => {
        if (blk.title) out.push("### " + t(blk.title), "");
        blk.fields.forEach((f) => {
          const k = key(sec.id, blk.id, f.id);
          if (f.type === "text" || f.type === "date" || f.type === "textarea") {
            out.push("**" + t(f.label) + "**", "", (get(k, "") || "_" + "(vazio / empty)" + "_"), "");
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
                if (fixed && ci === 0) return t(f.rowLabels[r]);
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
        if (blk.note) out.push("> " + t(blk.note), "");
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
    if (fixed && ci === 0) return t(f.rowLabels[r]);
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
    const reviewed = get("p5.a.reviewed", []);
    const article = reviewed.includes(0), phases = reviewed.filter((i) => i > 0).length;
    return { indep, article, phases, ok: indep > 0 && article && phases > 0 };
  }

  function showStatus() {
    const body = el("div", { class: "status-body" });
    const list = el("ul", { class: "status-list" });
    S.sections.forEach((sec) => {
      let total = 0, done = 0; const missing = [];
      sec.blocks.forEach((blk) => blk.fields.forEach((f) => {
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
      + (p5.indep ? "" : " " + t(UI.p5noIndep))
      + (p5.article ? "" : " " + t(UI.p5noArticle))
      + (p5.phases ? "" : " " + t(UI.p5noPhases));
    const conds = get("p6.b.conditions", []).length;
    const decision = get("p6.a.decision", null);
    body.append(list,
      el("p", { class: p5.ok ? "flag ok" : "flag warn" }, el("strong", {}, "Reconciling: "), p5msg),
      el("p", { class: conds === 5 ? "flag ok" : "flag warn" }, el("strong", {}, t(UI.conditions) + ": "), conds + " / 5"),
      el("p", { class: decision != null ? "flag ok" : "flag warn" }, el("strong", {}, t(UI.decision) + ": "),
        decision != null ? t(S.sections.find((s) => s.id === "p6").blocks[0].fields[0].options[decision]) : t(UI.noDecision)));
    openDialog(t(UI.status), body);
  }

  /* ---------- 2. AI use statement ---------- */
  function buildStatement() {
    const blank = (v, ph) => (v && String(v).trim() ? String(v).trim() : "[" + ph + "]");
    const pt = state.lang === "pt";
    const p1 = S.sections.find((s) => s.id === "p1");
    const typeF = p1.blocks[0].fields[0], degF = p1.blocks[0].fields[1];
    const typeV = get("p1.a.type", null);
    const typeTxt = typeV == null ? null : (typeV === typeF.options.length - 1 ? get("p1.a.type.detail", "") : t(typeF.options[typeV]));
    const degV = get("p1.a.degree", null);
    const tool = get("p1.b.tool", ""), model = get("p1.b.model", ""), when = get("p1.b.when", "");
    const docs = get("p1.c.docs", null) === 1 ? get("p1.c.docs.detail", "") : null;
    // Phase 2 verification
    const cf = S.sections.find((s) => s.id === "p2").blocks[1].fields[0];
    let nClaims = 0, nExists = 0, nSays = 0;
    for (let r = 0; r < rowsOf(cf, "p2.b.claims"); r++) {
      if (!String(get(key("p2.b.claims", r, 0), "") || "").trim()) continue;
      nClaims++;
      if (get(key("p2.b.claims", r, 1), null) === 0) nExists++;
      if (get(key("p2.b.claims", r, 2), null) === 0) nSays++;
    }
    // Phase 5 group
    const gf = S.sections.find((s) => s.id === "p5").blocks[0].fields[0];
    const group = [];
    for (let r = 0; r < rowsOf(gf, "p5.a.group"); r++) {
      const role = String(get(key("p5.a.group", r, 1), "") || "").trim();
      const name = String(get(key("p5.a.group", r, 0), "") || "").trim();
      if (role || name) group.push(role || name);
    }
    const p5 = phase5Check();
    const decV = get("p6.a.decision", null);
    const decF = S.sections.find((s) => s.id === "p6").blocks[0].fields[0];
    const allConds = get("p6.b.conditions", []).length === 5;
    const code = get("id.id.code", "");

    const s = [];
    if (pt) {
      s.push("Na preparação deste " + blank(typeTxt && typeTxt.toLowerCase(), "tipo de texto") + ", foi utilizado o " + blank(tool, "ferramenta e fornecedor") + " (modelo " + blank(model, "modelo e versão") + "), em " + blank(when, "data") + ".");
      if (degV != null) s.push("Grau de produção por IA: " + t(degF.options[degV]).toLowerCase() + ".");
      s.push("A ferramenta foi usada para " + "[finalidades: por exemplo, redação de uma primeira versão, revisão de linguagem, tradução, pesquisa bibliográfica]" + ".");
      if (docs) s.push("Foram fornecidos à ferramenta os seguintes documentos: " + docs + ".");
      s.push("A utilização foi auditada com o AI Curatorial Protocol (AICP; Costa et al., 2026), incluindo o registo de proveniência"
        + (nClaims ? ", a verificação de " + nClaims + " afirmações e referências (" + nExists + " confirmadas na fonte; " + nSays + " com conteúdo confirmado)" : ", a verificação das referências [indicar quantas]")
        + ", uma auditoria de enviesamentos"
        + (p5.ok && group.length ? ", a validação cruzada por " + group.join(", ") : ", a validação cruzada por [composição do grupo independente]")
        + " e uma decisão documentada" + (decV != null ? " (" + t(decF.options[decV]).toLowerCase() + ")" : "") + ".");
      if (code) s.push("Registo AICP: " + code + ", disponível em [local do depósito].");
      s.push(allConds ? "O conteúdo e as referências foram verificados e são da responsabilidade de quem assina."
                      : "[Concluir as condições da Fase 6 antes de afirmar:] O conteúdo e as referências foram verificados e são da responsabilidade de quem assina.");
    } else {
      s.push("In preparing this " + blank(typeTxt && typeTxt.toLowerCase(), "type of text") + ", " + blank(tool, "tool and provider") + " (model " + blank(model, "model and version") + ") was used on " + blank(when, "date") + ".");
      if (degV != null) s.push("Degree of AI production: " + t(degF.options[degV]).toLowerCase() + ".");
      s.push("The tool was used to " + "[purposes: e.g. drafting a first version, language editing, translation, literature search]" + ".");
      if (docs) s.push("The following documents were provided to the tool: " + docs + ".");
      s.push("Its use was audited with the AI Curatorial Protocol (AICP; Costa et al., 2026), including a provenance record"
        + (nClaims ? ", the checking of " + nClaims + " claims and references (" + nExists + " confirmed at source; " + nSays + " with content confirmed)" : ", reference checking [state how many]")
        + ", a bias audit"
        + (p5.ok && group.length ? ", cross-validation by " + group.join(", ") : ", cross-validation by [composition of the independent group]")
        + " and a documented decision" + (decV != null ? " (" + t(decF.options[decV]).toLowerCase() + ")" : "") + ".");
      if (code) s.push("AICP record: " + code + ", available at [repository location].");
      s.push(allConds ? "The content and references were checked and are the responsibility of the signatories."
                      : "[Complete the Phase 6 conditions before stating:] The content and references were checked and are the responsibility of the signatories.");
    }
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
      set("p6.c.statement", ta.value); dlg.close(); render();
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
      sec.blocks.forEach((blk) => {
        if (blk.title) b.push(wP(wRun(t(blk.title).toUpperCase(), { b: true, color: hex, sz: 20 }), { before: 160, after: 80 }));
        blk.fields.forEach((f) => {
          const k = key(sec.id, blk.id, f.id);
          if (["text", "date", "textarea"].includes(f.type)) {
            b.push(wP(wRun(t(f.label), { b: true, sz: 20 }) + (f.hint ? wRun("  " + t(f.hint), { i: true, color: "5B6470", sz: 17 }) : ""), { after: 20 }));
            b.push(wP(wRun(get(k, "") || " ", { sz: 20 }), { after: 140 }));
          } else if (f.type === "radio" || f.type === "check") {
            const cur = get(k, f.type === "check" ? [] : null);
            const det = get(key(k, "detail"), "");
            const opts = f.options.map((o, i) => ((f.type === "check" ? cur.includes(i) : cur === i) ? "☒ " : "☐ ") + t(o)).join("     ");
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
        if (blk.note) b.push(wP(wRun(t(blk.note), { i: true, color: "5B6470", sz: 18 }), { after: 120 }));
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
    if (state.lang === "en") files["word/styles.xml"] = files["word/styles.xml"].replace('w:val="pt-PT"', 'w:val="en-GB"');
    const a = el("a", { href: URL.createObjectURL(zip(files)), download: fileBase() + ".docx" });
    document.body.append(a); a.click(); a.remove();
  }

  function grow(ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 2 + "px"; }
  document.addEventListener("input", (e) => { if (e.target.tagName === "TEXTAREA") grow(e.target); });
  window.addEventListener("beforeprint", () => document.querySelectorAll("textarea").forEach(grow));
  document.addEventListener("DOMContentLoaded", () => { render(); document.querySelectorAll("textarea").forEach((ta) => ta.value && grow(ta)); });
})();
