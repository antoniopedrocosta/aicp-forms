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
    curator: { pt: "Curador(a)", en: "Curator" }
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

  function grow(ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 2 + "px"; }
  document.addEventListener("input", (e) => { if (e.target.tagName === "TEXTAREA") grow(e.target); });
  window.addEventListener("beforeprint", () => document.querySelectorAll("textarea").forEach(grow));
  document.addEventListener("DOMContentLoaded", () => { render(); document.querySelectorAll("textarea").forEach((ta) => ta.value && grow(ta)); });
})();
