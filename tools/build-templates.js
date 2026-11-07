// Generates blank Markdown templates (PT, EN, ES, IT and KO) from assets/schema.js.
// Usage: node tools/build-templates.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../assets/schema.js"), "utf8"), ctx);
const S = ctx.window.AICP_SCHEMA;
const TXT = {
  howto: { pt: "Como usar", en: "How to use", es: "Cómo usar", it: "Come usare", ko: "사용 방법" },
  record: { pt: "Conteúdo / código do registo: ____  Curador(a): ____  Data: ____", en: "Content / record code: ____  Curator: ____  Date: ____", es: "Contenido / código del registro: ____  Curador(a): ____  Fecha: ____", it: "Contenuto / codice del registro: ____  Curatore/curatrice: ____  Data: ____", ko: "콘텐츠 / 기록 코드: ____  큐레이터: ____  날짜: ____" },
  ex: { pt: "Ex.:", en: "E.g.", es: "P. ej.:", it: "Es.:", ko: "예:" },
  text: { pt: "Só texto", en: "Text only", es: "Solo texto", it: "Solo testo", ko: "텍스트만" },
  visual: { pt: "Só imagem e vídeo", en: "Image and video only", es: "Solo imagen y vídeo", it: "Solo immagine e video", ko: "이미지·영상만" },
  video: { pt: "Só vídeo", en: "Video only", es: "Solo vídeo", it: "Solo video", ko: "영상만" }
};
for (const lang of ["pt", "en", "es", "it", "ko"]) {
  const t = (o) => (o ? o[lang] : "");
  const tag = (x) => (x ? "[" + TXT[x][lang] + "] " : "");
  const out = ["# " + t(S.meta.title), "", "**" + t(S.meta.subtitle) + "**", "", t(S.meta.intro), ""];
  out.push("## " + TXT.howto[lang], "");
  S.meta.howto.forEach((h, i) => out.push(i + 1 + ". " + t(h)));
  out.push("");
  for (const sec of S.sections) {
    out.push("## " + t(sec.title) + (sec.subtitle ? ": " + t(sec.subtitle) : ""), "");
    if (sec.prompt) out.push("_" + t(sec.prompt) + "_", "");
    if (sec.phase) out.push(TXT.record[lang], "");
    for (const blk of sec.blocks) {
      if (blk.title) out.push("### " + tag(blk.show) + t(blk.title), "");
      if (blk.note) out.push("> " + t(blk.note), "");
      for (const f of blk.fields) {
        const ft = f.show && f.show !== blk.show ? tag(f.show) : "";
        const hint = (f.hint ? " _" + t(f.hint) + "_" : "") + (f.ex ? " _" + TXT.ex[lang] + " " + t(f.ex) + "_" : "");
        const label = "**" + ft + t(f.label) + "**";
        if (["text", "date", "textarea"].includes(f.type)) out.push(label + hint, "", "> ", "");
        else if (f.type === "radio" || f.type === "check") {
          if (f.optionHints) { out.push(label + hint, ""); f.options.forEach((o, i) => out.push("- ☐ **" + t(o) + "**: " + t(f.optionHints[i]))); out.push(""); }
          else out.push(label + hint + ": " + f.options.map((o) => "☐ " + t(o)).join("  ") + (f.detailOn != null || f.other ? "  ____" : ""), "");
        } else {
          const fixed = f.fixedRows || f.type === "radioTable";
          if (ft) out.push("**" + ft.trim() + "**", "");
          out.push("| " + f.columns.map(t).join(" | ") + " |", "|" + f.columns.map(() => " --- |").join(""));
          const n = fixed ? f.rowLabels.length : f.rows || 3;
          for (let r = 0; r < n; r++) out.push("| " + f.columns.map((c, ci) => {
            if (fixed && ci === 0) return "**" + t(f.rowLabels[r]) + "**" + (f.rowHints ? ": " + t(f.rowHints[r]) : "");
            if (f.type === "radioTable" && ci === 1) return f.options.map((o) => "☐ " + t(o)).join(" ");
            if (r === 0 && f.colExamples && f.colExamples[ci]) return "_" + t(f.colExamples[ci]) + "_";
            return " ";
          }).join(" | ") + " |");
          out.push("");
        }
      }
    }
  }
  out.push("---", "", t(S.meta.references), "");
  fs.writeFileSync(path.join(__dirname, "../docs/AICP_forms_" + lang.toUpperCase() + ".md"), out.join("\n"));
}
console.log("ok");
