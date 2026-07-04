import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

import Navbar from "./components/Navbar";
import ReviewPanel from "./components/ReviewPanel";

import "./App.css";

function App() {
  const [code, setCode] = useState(`function hello() {
  console.log("Hello World");
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const reviewCode = async () => {
    if (!code.trim()) {
      alert("Please write some code.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:3000/ai/get-response",
        { code }
      );

      setReview(data.review || data);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <Navbar
        loading={loading}
        reviewCode={reviewCode}
      />

      <div className="workspace">

        <div className="editor-container">

          <div className="editor-header">

            <div>
              <h2>Code Editor</h2>
              <p>JavaScript</p>
            </div>

            <button
              className="clear-btn"
              onClick={() => {
                setCode("");
                setReview("");
              }}
            >
              Clear
            </button>

          </div>

          <div className="editor-wrapper">

            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 16,
                minimap: {
                  enabled: false,
                },
                automaticLayout: true,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                tabSize: 2,
              }}
            />

          </div>

        </div>

        <ReviewPanel
          review={review}
          loading={loading}
        />

      </div>

    </div>
  );
}

export default App;