// Server/client safe markdown loader that fetches from /public/docs
// Avoids Node-only imports like fs/promises so this module can be referenced in any bundle.

type MarkdownDocProps = {
  filePath: string;
};

function renderInline(md: string) {
  // very small inline renderer for **bold**, *italic*, [text](url)
  const parts: Array<string | JSX.Element> = [];
  let rest = md;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(md))) {
    if (m.index > lastIndex) parts.push(md.slice(lastIndex, m.index));
    parts.push(<a key={`${m.index}`} href={m[2]} target="_blank" rel="noreferrer" className="text-siso-orange underline-offset-2 hover:underline">{m[1]}</a>);
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < md.length) parts.push(md.slice(lastIndex));
  // simple bold/italic pass (non-nested)
  return parts.map((p, i) => {
    if (typeof p !== "string") return p;
    // bold
    p = p.replace(/\*\*([^*]+)\*\*/g, (_s, g1) => `§B§${g1}§/B§`);
    // italic
    p = p.replace(/\*([^*]+)\*/g, (_s, g1) => `§I§${g1}§/I§`);
    const out: Array<string | JSX.Element> = [];
    const tokens = p.split(/(§B§|§\/B§|§I§|§\/I§)/);
    let mode: "b" | "i" | null = null;
    for (const t of tokens) {
      if (t === "§B§") { mode = "b"; continue; }
      if (t === "§/B§") { mode = null; continue; }
      if (t === "§I§") { mode = "i"; continue; }
      if (t === "§/I§") { mode = null; continue; }
      if (!t) continue;
      if (mode === "b") out.push(<strong key={`b${i}-${out.length}`}>{t}</strong>);
      else if (mode === "i") out.push(<em key={`i${i}-${out.length}`}>{t}</em>);
      else out.push(t);
    }
    return <>{out}</>;
  });
}

function renderMarkdown(md: string) {
  const lines = md.split(/\r?\n/);
  const elements: JSX.Element[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^#\s+/.test(line)) {
      elements.push(<h2 key={`h2-${i}`} className="mt-4 text-lg font-semibold text-siso-text-primary">{line.replace(/^#\s+/, "")}</h2>);
      i++; continue;
    }
    if (/^##\s+/.test(line)) {
      elements.push(<h3 key={`h3-${i}`} className="mt-3 text-base font-semibold text-siso-text-primary">{line.replace(/^##\s+/, "")}</h3>);
      i++; continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items: JSX.Element[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(<li key={`li-${i}`} className="ml-4 list-disc text-sm text-siso-text-secondary">{renderInline(lines[i].replace(/^[-*]\s+/, ""))}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="my-2">{items}</ul>);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: JSX.Element[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(<li key={`ol-${i}`} className="ml-4 list-decimal text-sm text-siso-text-secondary">{renderInline(lines[i].replace(/^\d+\.\s+/, ""))}</li>);
        i++;
      }
      elements.push(<ol key={`olwrap-${i}`} className="my-2">{items}</ol>);
      continue;
    }
    // paragraph (gather until blank)
    const para: string[] = [];
    while (i < lines.length && lines[i].trim()) { para.push(lines[i]); i++; }
    elements.push(
      <p key={`p-${i}`} className="text-sm text-siso-text-secondary">{renderInline(para.join(" "))}</p>
    );
  }
  return elements;
}

export default async function MarkdownDoc({ filePath }: MarkdownDocProps) {
  // Derive a public URL from the provided path, e.g.
  // src/domains/.../docs/compliance-regulatory.md -> /docs/compliance-regulatory.md
  const baseName = filePath.split("/").pop() ?? "";
  const url = `/docs/${baseName}`;
  let content = "";
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      content = await res.text();
    }
  } catch {
    // ignore
  }
  if (!content) content = "Document content is not available yet.";
  return <div className="space-y-3">{renderMarkdown(content)}</div>;
}
