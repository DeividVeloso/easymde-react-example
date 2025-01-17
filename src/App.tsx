import DOMPurify from "dompurify"; // For sanitizing HTML output
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css"; // EasyMDE styles
import * as marked from "marked"; // For Markdown-to-HTML conversion
import { useEffect, useRef, useState } from "react";
import TurndownService from "turndown";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const htmlFromApi =
  "<p>Sample paragraph</p><h2>Sample header</h2><ul><li>Item 1</li><li>Item 2</li></ul>";

function App() {
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);
  const easyMDE = useRef<EasyMDE | null>(null);
  const [htmlOutput, setHtmlOutput] = useState<string>("");

  useEffect(() => {
    const turndownService = new TurndownService();
    const markdownFromHtml = turndownService.turndown(htmlFromApi);

    console.log("Markdown Output:", markdownFromHtml);

    if (inputAreaRef.current) {
      // Initialize EasyMDE
      easyMDE.current = new EasyMDE({
        initialValue: markdownFromHtml,
        element: inputAreaRef.current,
        toolbar: [
          "bold", // Bold
          "italic", // Italic
          "heading", // Headings
          "|", // Separator
          "unordered-list", // Bulleted list
          "ordered-list", // Numbered list
          "|",
          "link", // Hyperlinks
          "preview", // Preview Markdown
          "|",
          "guide", // Markdown guide
        ],
        placeholder: "Write your Markdown here...",
        spellChecker: false,
      });

      // Listen for changes in the editor
      easyMDE.current.codemirror.on("change", () => {
        const markdown = easyMDE.current?.value() || "";
        const rawHtml = marked.marked(markdown); // Convert Markdown to raw HTML
        if (rawHtml instanceof Promise) {
          rawHtml.then((html) => {
            const sanitizedHtml = DOMPurify.sanitize(html); // Sanitize HTML
            setHtmlOutput(sanitizedHtml); // Set sanitized HTML
          });
        } else {
          const sanitizedHtml = DOMPurify.sanitize(rawHtml); // Sanitize HTML
          setHtmlOutput(sanitizedHtml); // Set sanitized HTML
        }
      });
    }

    // Cleanup on unmount
    return () => {
      easyMDE.current?.toTextArea();
      easyMDE.current = null;
    };
  }, []);

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <textarea
        ref={inputAreaRef}
        style={{
          display: "none", // Hide native textarea since EasyMDE renders over it
        }}
      />
      <h3>HTML Output</h3>
      <div
        dangerouslySetInnerHTML={{ __html: htmlOutput }}
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          marginTop: "20px",
        }}
      />
      <pre style={{ background: "#f5f5f5", padding: "10px" }}>{htmlOutput}</pre>
    </div>
  );
}

export default App;
