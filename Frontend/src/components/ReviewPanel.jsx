import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { FaRobot } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";

import CodeBlock from "./CodeBlock";

import "./ReviewPanel.css";

function ReviewPanel({ review, loading }) {

    const copyReview = () => {
        navigator.clipboard.writeText(review);
        alert("Review copied successfully!");
    };

    if (loading) {

        return (

            <div className="review-panel">

                <div className="review-header">

                    <div className="review-title">

                        <FaRobot />

                        <span>Gemini AI Reviewer</span>

                    </div>

                </div>

                <div className="loading-container">

                    <div className="spinner"></div>

                    <h2>Analyzing your code...</h2>

                    <p>

                        Checking bugs, security,
                        performance, readability
                        and best practices.

                    </p>

                </div>

            </div>

        );

    }

    if (!review) {

        return (

            <div className="review-panel">

                <div className="review-header">

                    <div className="review-title">

                        <FaRobot />

                        <span>Gemini AI Reviewer</span>

                    </div>

                </div>

                <div className="empty-review">

                    <FaRobot className="robot-icon"/>

                    <h2>

                        AI Code Reviewer

                    </h2>

                    <p>

                        Paste your code into the editor.

                    </p>

                    <p>

                        Click

                        <strong>

                            {" "}Review Code{" "}

                        </strong>

                        to generate an AI review.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="review-panel">

            <div className="review-header">

                <div className="review-title">

                    <FaRobot />

                    <span>

                        Gemini AI Review

                    </span>

                </div>

                <button
                    className="copy-btn"
                    onClick={copyReview}
                >

                    <MdContentCopy />

                    Copy Review

                </button>

            </div>

            <div className="review-success">

                <FiCheckCircle />

                Review generated successfully.

            </div>

            <div className="review-body">

                <ReactMarkdown

                    remarkPlugins={[remarkGfm]}

                    components={{

                        code({

                            inline,

                            className,

                            children

                        }) {

                            const match = /language-(\w+)/.exec(
                                className || ""
                            );

                            if (inline) {

                                return (

                                    <code>

                                        {children}

                                    </code>

                                );

                            }

                            return (

                                <CodeBlock

                                    language={
                                        match
                                            ? match[1]
                                            : "javascript"
                                    }

                                    code={String(children).replace(/\n$/, "")}

                                />

                            );

                        },

                        h1: ({ children }) => (

                            <h1 className="review-h1">

                                {children}

                            </h1>

                        ),

                        h2: ({ children }) => (

                            <h2 className="review-h2">

                                {children}

                            </h2>

                        ),

                        h3: ({ children }) => (

                            <h3 className="review-h3">

                                {children}

                            </h3>

                        ),

                        p: ({ children }) => (

                            <p className="review-p">

                                {children}

                            </p>

                        ),

                        ul: ({ children }) => (

                            <ul className="review-ul">

                                {children}

                            </ul>

                        ),

                        ol: ({ children }) => (

                            <ol className="review-ol">

                                {children}

                            </ol>

                        ),

                        li: ({ children }) => (

                            <li className="review-li">

                                {children}

                            </li>

                        ),

                        blockquote: ({ children }) => (

                            <blockquote className="review-quote">

                                {children}

                            </blockquote>

                        ),

                        table: ({ children }) => (

                            <table className="review-table">

                                {children}

                            </table>

                        )

                    }}

                >

                    {review}

                </ReactMarkdown>

            </div>

        </div>

    );

}

export default ReviewPanel;