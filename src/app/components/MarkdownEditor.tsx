"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as markDownLang } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import MarkdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";
import prism from "markdown-it-prism";
import markdownItToc from "markdown-it-table-of-contents";
import { full as emoji } from 'markdown-it-emoji';
import markdownItFootnote from "markdown-it-footnote";
import "github-markdown-css"; 

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# Hello, Markdown! 👋

\`Inline Code\`, **Bold**, _Italic_, ~~Strikethrough~~

\`\`\`js
console.log("Hello, World!");
\`\`\`

| Table | Example |
|-------|---------|
| Row 1 | Data 1  |
| Row 2 | Data 2  |

🔗 [GitHub](https://github.com/haxneeraj)
`);

  const [html, setHtml] = useState("");

  useEffect(() => {
    import("prismjs/themes/prism-tomorrow.css");
  }, []);

  // Markdown parser with GitHub-like features
  const md = new MarkdownIt({ html: true })
    .use(mila, { attrs: { target: "_blank", rel: "noopener noreferrer" } })
    .use(prism)
    .use(markdownItToc)
    .use(emoji)
    .use(markdownItFootnote);

  useEffect(() => {
    setHtml(md.render(markdown)); // Render Markdown only on client-side
  }, [markdown]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Markdown Editor */}
      <div className="w-1/2 p-4 border-r bg-[#282c34]">
        <h2 className="text-xl font-bold mb-2 text-gray-100">Editor</h2>
        <CodeMirror
          value={markdown}
          height="auto"
          width="auto"
          theme={oneDark}
          extensions={[markDownLang()]}
          onChange={(value) => setMarkdown(value)}
          style={{
            minHeight: "100px",
            lineHeight: "1.5",
          }}
        />
      </div>

      {/* Markdown Preview */}
      <div className="w-1/2 p-4 overflow-auto bg-white">
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        <div className="prose max-w-none markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
