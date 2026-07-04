import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdContentCopy, MdCheckCircle } from "react-icons/md";

import "./CodeBlock.css";

function CodeBlock({ language = "javascript", code }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="code-container">

      <div className="code-header">

        <div className="language-badge">

          {language.toUpperCase()}

        </div>

        <button
          className="copy-code-btn"
          onClick={copyCode}
        >
          {copied ? (
            <>
              <MdCheckCircle />
              Copied
            </>
          ) : (
            <>
              <MdContentCopy />
              Copy
            </>
          )}
        </button>

      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          borderRadius: "0 0 14px 14px",
          fontSize: "15px",
          padding: "20px"
        }}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  );
}

export default CodeBlock;