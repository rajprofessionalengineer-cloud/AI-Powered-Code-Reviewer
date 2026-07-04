import "./Navbar.css";

function Navbar({ loading, reviewCode }) {
  return (
    <nav className="navbar">

      <div className="navbar-left">

        <div className="logo">
          ⚡
        </div>

        <div className="title">

          <h2>AI Code Reviewer</h2>

          <p>Powered by Google Gemini</p>

        </div>

      </div>

      <div className="navbar-right">

        <div className="status">

          <span className="status-dot"></span>

          Connected

        </div>

        <button className="theme-btn">
          🌙
        </button>

        <button
          className="review-btn"
          onClick={reviewCode}
        >

          {loading ? (
            <>
              <span className="loader-mini"></span>
              Reviewing...
            </>
          ) : (
            <>
              🚀 Review Code
            </>
          )}

        </button>

      </div>

    </nav>
  );
}

export default Navbar;