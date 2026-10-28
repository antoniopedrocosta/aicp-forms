// Generates blank Markdown templates (PT, EN, ES and IT) from assets/schema.js.
// Usage: node tools/build-templates.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../assets/schema.js"), "utf8"), ctx);
const S = ctx.window.AICP_SCHEMA;
for (const lang of ["pt", "en", "es", "it"]) {
  const t = (o) => (o ? o[lang] : "");
  const out = ["# " + t(S.meta.title), "", "**" + t(S.meta.subtitle) + "**", "", t(S.meta.intro), ""];
  out.push("## " + ({ pt: "Como usar", en: "How to use", es: "Cómo usar", it: "Come usare" })[lang], "");
  S.meta.howto.forEach((h, i) => out.push(i + 1 + ". " + t(h)));
  out.push("");
  for (const sec of S.sections) {
    out.push("## " + t(sec.title) + (sec.subtitle ? ": " + t(sec.subtitle) : ""), "");
    if (sec.prompt) out.push("_" + t(sec.prompt) + "_", "");
    if (sec.phase) out.push(({ pt: "Artigo / código do registo: ____  Curador(a): ____  Data: ____", en: "Article / record code: ____  Curator: ____  Date: ____", es: "Artículo / código del registro: ____  Curador(a): ____  Fecha: ____", it: "Articolo / codice del registro: ____  Curatore/curatrice: ____  Data: ____" })[lang], "");
    for (const blk of sec.blocks) {
      if (blk.title) out.push("### " + t(blk.title), "");
      for (const f of blk.fields) {
        const hint = f.hint ? " _(" + t(f.hint) + ")_" : "";
        if (["text", "date", "textarea"].includes(f.type)) out.push("**" + t(f.label) + "**" + hint, "", "> ", "");
        else if (f.type === "radio" || f.type === "check") out.push("**" + t(f.label) + "**" + hint + ": " + f.options.map((o) => "☐ " + t(o)).join("  ") + (f.detailOn != null || f.other ? "  ____" : ""), "");
        else {
          const fixed = f.fixedRows || f.type === "radioTable";
          out.push("| " + f.columns.map(t).join(" | ") + " |", "|" + f.columns.map(() => " --- |").join(""));
          const n = fixed ? f.rowLabels.length : f.rows || 3;
          for (let r = 0; r < n; r++) out.push("| " + f.columns.map((c, ci) => {
            if (fixed && ci === 0) return t(f.rowLabels[r]);
            if (f.type === "radioTable" && ci === 1) return f.options.map((o) => "☐ " + t(o)).join(" ");
            if (f.placeholders && ci === 0 && f.placeholders[r]) return "_" + t(f.placeholders[r]) + "_";
            return " ";
          }).join(" | ") + " |");
          out.push("");
        }
      }
      if (blk.note) out.push("> " + t(blk.note), "");
    }
  }
  out.push("---", "", t(S.meta.references), "");
  fs.writeFileSync(path.join(__dirname, "../docs/AICP_forms_" + lang.toUpperCase() + ".md"), out.join("\n"));
}
console.log("ok");
