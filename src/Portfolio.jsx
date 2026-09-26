import { useState, useEffect } from "react";

/*
  Ishwarya Gandamsetty — Data Analyst Portfolio
  Single-file React component, inline styles only (no Tailwind / CSS modules).
  Fonts: Poppins (headings / display), Nunito (body).
  Add these to your index.html <head>:

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">

  Photo: drop ishwarya-portrait.jpg into your project's /public/images/ folder
  so it resolves at /images/ishwarya-portrait.jpg.
*/

const COLORS = {
  bg: "#0a0e2b",
  surface: "#11163f",
  surfaceHover: "#161c4d",
  border: "#262c60",
  textPrimary: "#f5f6fa",
  textSecondary: "#b7bad6",
  textMuted: "#7d81a8",
  accent: "#f3b73c",
  accentDark: "#241a04",
};

const FONT_HEAD = "'Poppins', sans-serif";
const FONT_BODY = "'Nunito', sans-serif";

const CONTAINER_MAX = 1180;
const CONTAINER_PADDING = "clamp(20px, 5vw, 56px)";

// Sticky header is ~74px tall; this keeps anchored sections from
// landing partially hidden behind it.
const HEADER_OFFSET = 84;

const LINKS = {
  email: "mailto:gandamsettyishwarya@gmail.com",
  github: "https://github.com/IG-08",
  linkedin: "https://linkedin.com/in/ishwarya3",
  tableau: "https://public.tableau.com/app/profile/ishwarya.gandamsetty",
};

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About me" },
  { id: "skills", label: "Skills" },
  { id: "background", label: "Background" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SKILL_COLUMNS = [
  {
    title: ["Programming", "languages"],
    items: [
      { abbr: "Py", label: "Python" },
      { abbr: "SQL", label: "SQL" },
      { abbr: "J", label: "Java" },
      { abbr: "JS", label: "JavaScript" },
    ],
  },
  {
    title: ["Data analytic", "tools"],
    items: [
      { abbr: "Pd", label: "Pandas" },
      { abbr: "Np", label: "NumPy" },
      { abbr: "Sk", label: "Scikit-learn" },
      { abbr: "Xl", label: "Excel" },
    ],
  },
  {
    title: ["Data visualization", "tools"],
    items: [
      { abbr: "Tb", label: "Tableau" },
      { abbr: "Pb", label: "Power BI" },
      { abbr: "Mp", label: "Matplotlib" },
      { abbr: "Sb", label: "Seaborn" },
    ],
  },
];

const METHODS = ["Regression", "DBSCAN", "Neural networks", "HMM", "GridSearchCV", "EDA"];

const PROJECTS = [
  {
    number: "01",
    tag: "E-commerce analytics",
    title: "Olist e-commerce funnel & performance analytics",
    stack: ["PostgreSQL", "Python", "Tableau"],
    description:
      "Analyzed roughly 100K orders from Olist's Brazilian marketplace (2016–2018), answering five business questions with multi-table SQL joins across a 9-table relational schema.",
    points: [
      "Designed multi-table SQL joins across orders, payments, reviews, and logistics to answer five distinct business questions",
      "Traced a Southeast vs. North logistics divide driving higher freight cost, later deliveries, and lower review scores",
      "Linked delivery lateness directly to review-score damage, connecting operations to customer satisfaction",
      "Built on a real 9-table PostgreSQL schema with foreign-key constraints, not a flattened CSV",
    ],
    live: "https://public.tableau.com/views/OlistE-CommercePerformanceDashboard_17902921710220/OlistE-CommercePerformanceDashboard",
    github: "https://github.com/IG-08",
  },
  {
    number: "02",
    tag: "Public sector analytics",
    title: "NC State government budget analysis — FY2024",
    stack: ["Python", "Pandas", "Tableau"],
    description:
      "Cleaned and transformed 205,000+ rows of North Carolina government expenditure data into an interactive dashboard surfacing spending trends across 32 state agencies.",
    points: [
      "Cleaned and standardized 205,000+ rows of raw expenditure records, resolving inconsistent agency and committee naming",
      "Flagged a $14.87B budget variance in the Dept. of Transportation as a statistical outlier",
      "Totaled $73.5B in actual spend across 32 agencies and 6 committees",
      "Found Aid & Public Assistance accounts for roughly 70% of all state spending",
    ],
    live: "https://public.tableau.com/views/NCStateBudget-FY2024_17816826573970/NCStateBudgetDashboard",
    github: "https://github.com/IG-08/nc-budget-analysis",
  },
  {
    number: "03",
    tag: "Sports analytics",
    title: "IPL 2025 season analysis",
    stack: ["Excel", "Python", "Tableau"],
    description:
      "End-to-end Excel → Python → Tableau workflow analyzing the 2025 IPL season: player performance KPIs, team trends, and statistical anomalies across 264 players and 10 franchises.",
    points: [
      "Built the pipeline end to end: raw scorecards in Excel, cleaning and KPI calculation in Python, dashboarding in Tableau",
      "Sai Sudharsan led the season with 759 runs across 15 matches",
      "Flagged Vaibhav Suryavanshi's 206.55 strike rate as a statistical outlier",
      "Found Bumrah's 6.67 economy well below the 8.5 tournament average",
    ],
    live: "https://public.tableau.com/views/IPL2025SeasonAnalysis/Analysis",
    github: "https://github.com/IG-08/ipl-2025-analysis",
  },
  {
    number: "04",
    tag: "Full-stack application",
    title: "SafeBites — AI-powered food discovery",
    stack: ["React", "FastAPI", "MongoDB", "LangGraph"],
    description:
      "Full-stack platform using AI-driven semantic search to help users find menu items by dietary preference and allergen restriction. Built the React frontend and the Python analytics layer.",
    points: [
      "Built the React frontend and integrated it against a FastAPI backend with a MongoDB data layer",
      "Built semantic menu search with LangGraph and FAISS — natural-language queries return correct results",
      "Found allergen filtering used in over 60% of sessions, confirming it as the core user need",
      "Deployed live at se-wolfcafe.vercel.app",
    ],
    live: "https://se-wolfcafe.vercel.app",
    github: "https://github.com/IG-08/safebites",
  },
];

const EDUCATION = [
  {
    initials: "NC",
    school: "North Carolina State University",
    detail: "M.S. Computer Science (2025 — Present) · GPA 3.22",
    note: "Statistical Models for System Analytics · Trustworthy AI · Intro to Product Development",
  },
  {
    initials: "KL",
    school: "KL University",
    detail: "B.Tech Computer Science (2020 — 2024) · GPA 8.43/10.0",
    note: "Data Structures · Data Warehousing · Web Development",
  },
];

const CERTIFICATIONS = [
  { initials: "Az", name: "Microsoft Azure Developer Associate", note: "Certification" },
  { initials: "Ud", name: "Complete Data Analyst Bootcamp", note: "Udemy" },
];

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7.7" cy="8.3" r="1.35" />
      <rect x="6.5" y="10.8" width="2.4" height="7" />
      <path d="M11.2 10.8h2.4v1.2c.6-.85 1.5-1.4 2.7-1.4 2 0 3.4 1.3 3.4 3.9V17.8h-2.4v-2.9c0-1.2-.45-2-1.5-2-.8 0-1.3.55-1.5 1.1-.1.2-.1.45-.1.7v3.1h-2.4z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.51-3.5-.7-3.72-1.34-.13-.32-.68-1.34-1.16-1.61-.4-.22-.97-.75-.01-.77.9-.01 1.55.85 1.76 1.2 1.03 1.76 2.68 1.26 3.34.96.1-.75.4-1.26.72-1.55-2.5-.29-5.13-1.28-5.13-5.69 0-1.26.44-2.29 1.16-3.09-.12-.29-.5-1.47.11-3.06 0 0 .95-.31 3.12 1.18a10.5 10.5 0 0 1 5.68 0c2.17-1.49 3.12-1.18 3.12-1.18.61 1.59.23 2.77.11 3.06.72.8 1.16 1.82 1.16 3.09 0 4.42-2.64 5.4-5.15 5.68.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.21 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function TableauIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <rect x="10.5" y="2" width="3" height="6" rx="1" />
      <rect x="10.5" y="16" width="3" height="6" rx="1" />
      <rect x="2" y="10.5" width="6" height="3" rx="1" />
      <rect x="16" y="10.5" width="6" height="3" rx="1" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="1" />
    </svg>
  );
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function EyebrowPill({ gold, white }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: `2px solid ${COLORS.accent}`,
        borderRadius: 999,
        padding: "8px 20px",
        fontFamily: FONT_HEAD,
        fontWeight: 700,
        fontSize: 14,
        marginBottom: 24,
      }}
    >
      <span style={{ color: COLORS.accent }}>{gold}</span>
      {white && <span style={{ color: COLORS.textPrimary }}>{white}</span>}
    </span>
  );
}

function PillButton({ href, onClick, filled, children }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className="pf-pill-btn"
      style={{
        fontFamily: FONT_HEAD,
        fontWeight: 700,
        fontSize: 15,
        borderRadius: 999,
        padding: "13px 28px",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        border: `2px solid ${COLORS.accent}`,
        background: filled ? COLORS.accent : "transparent",
        color: filled ? COLORS.accentDark : COLORS.textPrimary,
        transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease",
      }}
    >
      {children}
    </Tag>
  );
}

function IconCircle({ label, icon, href, size = 44 }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="pf-icon-circle"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${COLORS.border}`,
        background: COLORS.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.textSecondary,
        textDecoration: "none",
        flexShrink: 0,
        transition: "transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, color 0.18s ease",
      }}
    >
      {icon || <span style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13 }}>{label}</span>}
    </a>
  );
}

export default function Portfolio() {
  const active = useScrollSpy(NAV_ITEMS.map((n) => n.id));
  const [navOpen, setNavOpen] = useState(false);

  const sectionAnchorStyle = { scrollMarginTop: HEADER_OFFSET };

  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.textPrimary,
        fontFamily: FONT_BODY,
        minHeight: "100vh",
        lineHeight: 1.7,
      }}
    >
      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(10,14,43,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          className="pf-header-grid"
          style={{
            maxWidth: CONTAINER_MAX,
            margin: "0 auto",
            padding: `16px ${CONTAINER_PADDING}`,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            columnGap: 16,
          }}
        >
          <span
            style={{
              justifySelf: "start",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 12,
              border: `2px solid ${COLORS.accent}`,
              fontFamily: FONT_HEAD,
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: 0.5,
              color: COLORS.textPrimary,
            }}
          >
            IG
          </span>

          <nav
            style={{
              display: "flex",
              gap: 26,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 999,
              padding: "10px 26px",
              justifySelf: "center",
            }}
            className="pf-nav-desktop"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className="pf-nav-link"
                onClick={() => scrollToId(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: FONT_HEAD,
                  fontWeight: 700,
                  fontSize: 14.5,
                  padding: 0,
                  whiteSpace: "nowrap",
                  color: active === item.id ? COLORS.accent : COLORS.textSecondary,
                  transition: "color 0.15s ease",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 12 }}>
            <div className="pf-nav-desktop">
              <PillButton href={LINKS.email} filled>
                Say hello
              </PillButton>
            </div>

            <button
              className="pf-nav-toggle-btn"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={navOpen}
              style={{
                display: "none",
                background: "none",
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 8,
                color: COLORS.textPrimary,
                width: 38,
                height: 38,
                cursor: "pointer",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {navOpen ? "×" : "≡"}
            </button>
          </div>
        </div>

        {navOpen && (
          <div
            className="pf-nav-mobile-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: `0 ${CONTAINER_PADDING} 18px`,
              gap: 16,
              borderTop: `1px solid ${COLORS.border}`,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className="pf-nav-link"
                onClick={() => {
                  scrollToId(item.id);
                  setNavOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  fontFamily: FONT_HEAD,
                  fontWeight: 700,
                  fontSize: 15,
                  color: active === item.id ? COLORS.accent : COLORS.textPrimary,
                  padding: "6px 0",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main style={{ maxWidth: CONTAINER_MAX, margin: "0 auto", padding: `0 ${CONTAINER_PADDING}` }}>
        {/* HERO */}
        <section
          id="home"
          className="pf-hero"
          style={{
            ...sectionAnchorStyle,
            padding: "80px 0 88px",
            display: "flex",
            gap: 56,
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* soft glow behind the hero content for depth, kept subtle and singular */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10%",
              right: "8%",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.accent}22 0%, transparent 70%)`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div style={{ flex: "1 1 460px", minWidth: 0, position: "relative", zIndex: 1 }}>
            {/* <EyebrowPill gold="DATA ANALYST" white="PORTFOLIO" /> */}
            <h1
              style={{
                fontFamily: FONT_HEAD,
                fontWeight: 800,
                fontSize: "clamp(40px, 6.5vw, 68px)",
                lineHeight: 1.05,
                margin: "0 0 24px",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: COLORS.textPrimary }}>Ishwarya</span>
              <br />
              <span style={{ color: COLORS.accent }}>Gandamsetty</span>
            </h1>
            <p style={{ fontSize: 20, color: COLORS.textSecondary, maxWidth: 480, margin: "0 0 36px" }}>
              I help turn raw data into{" "}
              <strong style={{ color: COLORS.accent }}>insights</strong> and{" "}
              <strong style={{ color: COLORS.accent }}>decisions</strong> that actually get used.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <PillButton onClick={() => scrollToId("projects")} filled>
                View projects
              </PillButton>
              <PillButton href={LINKS.github}>GitHub</PillButton>
            </div>
          </div>

          <div
            className="pf-hero-photo"
            style={{
              flex: "0 0 auto",
              position: "relative",
              width: "clamp(200px, 26vw, 320px)",
              aspectRatio: "1 / 1",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "84%",
                height: "84%",
                borderRadius: "50%",
                background: `linear-gradient(155deg, ${COLORS.accent} 0%, #d99a1f 100%)`,
                boxShadow: "0 24px 48px -20px rgba(243,183,60,0.45)",
              }}
            />
            <img
              src="/images/ishwarya-portrait.jpg"
              alt="Ishwarya Gandamsetty"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "84%",
                height: "84%",
                objectFit: "cover",
                borderRadius: "50%",
                border: `5px solid ${COLORS.bg}`,
                outline: `2px solid ${COLORS.textPrimary}`,
                boxShadow: "0 20px 40px -16px rgba(0,0,0,0.55)",
                display: "block",
              }}
            />
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          style={{ ...sectionAnchorStyle, padding: "56px 0", borderTop: `1px solid ${COLORS.border}` }}
        >
          <EyebrowPill gold="About" white="me" />
          <div className="pf-about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40 }}>
            <h2
              style={{
                fontFamily: FONT_HEAD,
                fontWeight: 800,
                fontSize: "clamp(30px, 4vw, 44px)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Hello,
              <br />
              I'm <span style={{ color: COLORS.accent }}>Ishwarya!</span>
            </h2>
            <div>
              <p style={{ fontSize: 17, color: COLORS.textSecondary, margin: "0 0 28px" }}>
                <strong style={{ color: COLORS.accent }}>Data analyst</strong> and{" "}
                <strong style={{ color: COLORS.accent }}>M.S. Computer Science candidate</strong> at NC
                State University, with hands-on experience across{" "}
                <strong style={{ color: COLORS.accent }}>
                  Python, SQL, Pandas, Scikit-learn, Tableau, and Power BI
                </strong>{" "}
                for end-to-end data analysis and visualization. Comfortable with data cleaning,
                statistical analysis, dashboard creation, and communicating insights clearly — from
                a multi-billion-dollar government budget anomaly to an entire cricket season's
                worth of player stats.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <PillButton onClick={() => scrollToId("projects")}>Projects</PillButton>
                <PillButton href={LINKS.email} filled>
                  Say hello
                </PillButton>
                <div style={{ display: "flex", gap: 10, marginLeft: 4 }}>
                  <IconCircle label="LinkedIn" icon={<LinkedInIcon />} href={LINKS.linkedin} />
                  <IconCircle label="GitHub" icon={<GitHubIcon />} href={LINKS.github} />
                  <IconCircle label="Tableau" icon={<TableauIcon />} href={LINKS.tableau} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          style={{ ...sectionAnchorStyle, padding: "56px 0", borderTop: `1px solid ${COLORS.border}` }}
        >
          <EyebrowPill gold="Technical" white="skills" />
          <div
            className="pf-skills-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}
          >
            {SKILL_COLUMNS.map((col) => (
              <div key={col.title.join(" ")}>
                <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 20, margin: "0 0 20px", lineHeight: 1.25 }}>
                  <span style={{ color: COLORS.accent }}>{col.title[0]}</span>
                  <br />
                  <span style={{ color: COLORS.textPrimary }}>{col.title[1]}</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {col.items.map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: COLORS.accent,
                          color: COLORS.accentDark,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: FONT_HEAD,
                          fontWeight: 800,
                          fontSize: 12,
                          flexShrink: 0,
                        }}
                      >
                        {item.abbr}
                      </span>
                      <span style={{ fontSize: 15.5, color: COLORS.textSecondary }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 20, margin: "0 0 20px", lineHeight: 1.25 }}>
                <span style={{ color: COLORS.accent }}>Data analytic</span>
                <br />
                <span style={{ color: COLORS.textPrimary }}>methods</span>
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {METHODS.map((method) => (
                  <li
                    key={method}
                    style={{
                      fontSize: 15.5,
                      color: COLORS.textSecondary,
                      marginBottom: 12,
                      paddingLeft: 18,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: COLORS.accent,
                      }}
                    />
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BACKGROUND: education + certifications */}
        <section
          id="background"
          style={{ ...sectionAnchorStyle, padding: "56px 0", borderTop: `1px solid ${COLORS.border}` }}
        >
          <EyebrowPill gold="Education &" white="background" />
          <div className="pf-background-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div>
              <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: COLORS.accent, margin: "0 0 20px" }}>
                Education
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.school}
                    className="pf-info-card"
                    style={{
                      display: "flex",
                      gap: 16,
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 16,
                      padding: 20,
                    }}
                  >
                    <span
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: COLORS.accent,
                        color: COLORS.accentDark,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT_HEAD,
                        fontWeight: 800,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {edu.initials}
                    </span>
                    <div>
                      <h4 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 16.5, margin: "0 0 6px" }}>
                        {edu.school}
                      </h4>
                      <p style={{ fontSize: 14.5, color: COLORS.accent, margin: "0 0 6px", fontWeight: 700 }}>
                        {edu.detail}
                      </p>
                      <p style={{ fontSize: 13.5, color: COLORS.textMuted, margin: 0 }}>{edu.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 22, color: COLORS.accent, margin: "0 0 20px" }}>
                Certifications
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="pf-info-card"
                    style={{
                      display: "flex",
                      gap: 16,
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 16,
                      padding: 20,
                    }}
                  >
                    <span
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: COLORS.accent,
                        color: COLORS.accentDark,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT_HEAD,
                        fontWeight: 800,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {cert.initials}
                    </span>
                    <div>
                      <h4 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 16.5, margin: "0 0 6px" }}>
                        {cert.name}
                      </h4>
                      <p style={{ fontSize: 13.5, color: COLORS.textMuted, margin: 0 }}>{cert.note}</p>
                    </div>
                  </div>
                ))}
                {/* spacer card removed on purpose — certifications list is intentionally shorter than education */}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          style={{ ...sectionAnchorStyle, padding: "56px 0", borderTop: `1px solid ${COLORS.border}` }}
        >
          <EyebrowPill gold="Notable" white="projects" />
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="pf-project-row pf-project-card"
                style={{
                  display: "flex",
                  gap: 28,
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 20,
                  padding: "32px clamp(20px, 4vw, 40px)",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_HEAD,
                    fontWeight: 800,
                    fontSize: 48,
                    color: "transparent",
                    WebkitTextStroke: `2px ${COLORS.accent}`,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {project.number}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: FONT_HEAD,
                      fontWeight: 700,
                      fontSize: 13,
                      color: COLORS.accent,
                      letterSpacing: 0.3,
                      margin: "0 0 8px",
                    }}
                  >
                    {project.tag}
                  </p>
                  <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 22, margin: "0 0 14px" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: 16, color: COLORS.textSecondary, margin: "0 0 16px" }}>
                    {project.description}
                  </p>
                  <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none" }}>
                    {project.points.map((point) => (
                      <li
                        key={point}
                        style={{
                          fontSize: 15,
                          color: COLORS.textSecondary,
                          marginBottom: 10,
                          paddingLeft: 20,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 8,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: COLORS.accent,
                          }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: FONT_HEAD,
                          fontWeight: 700,
                          fontSize: 12,
                          color: COLORS.accent,
                          border: `1px solid ${COLORS.accent}`,
                          borderRadius: 999,
                          padding: "5px 12px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <PillButton href={project.live}>Live dashboard</PillButton>
                    <PillButton href={project.github}>GitHub</PillButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          style={{ ...sectionAnchorStyle, padding: "56px 0 96px", borderTop: `1px solid ${COLORS.border}` }}
        >
          <EyebrowPill gold="Contact" white="info" />
          <h2
            style={{
              fontFamily: FONT_HEAD,
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)",
              margin: "0 0 40px",
              lineHeight: 1.2,
            }}
          >
            Let's <span style={{ color: COLORS.accent }}>connect</span> and{" "}
            <span style={{ color: COLORS.accent }}>work together!</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 460 }}>
            <ContactRow label="Email" value="gandamsettyishwarya@gmail.com" href={LINKS.email} icon={<MailIcon />} />
            <ContactRow label="LinkedIn" value="linkedin.com/in/ishwarya3" href={LINKS.linkedin} icon={<LinkedInIcon />} />
            <ContactRow label="GitHub" value="github.com/IG-08" href={LINKS.github} icon={<GitHubIcon />} />
            <ContactRow label="Tableau" value="public.tableau.com" href={LINKS.tableau} icon={<TableauIcon />} />
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          padding: "24px 24px",
          textAlign: "center",
          fontFamily: FONT_HEAD,
          fontWeight: 600,
          fontSize: 13,
          color: COLORS.textMuted,
        }}
      >
        Ishwarya Gandamsetty · Raleigh, NC
      </footer>

      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: ${COLORS.bg};
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .pf-nav-link:hover {
          color: ${COLORS.accent} !important;
        }
        .pf-pill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -10px rgba(243,183,60,0.5);
        }
        .pf-pill-btn:focus-visible,
        .pf-icon-circle:focus-visible,
        .pf-nav-link:focus-visible {
          outline: 2px solid ${COLORS.accent};
          outline-offset: 3px;
        }
        .pf-icon-circle:hover {
          background: ${COLORS.accent};
          border-color: ${COLORS.accent};
          color: ${COLORS.accentDark};
          transform: translateY(-2px);
          box-shadow: 0 8px 18px -8px rgba(243,183,60,0.5);
        }
        .pf-info-card, .pf-project-card {
          transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
        }
        .pf-info-card:hover, .pf-project-card:hover {
          border-color: ${COLORS.accent}55;
          background: ${COLORS.surfaceHover};
        }
        .pf-contact-row:hover .pf-contact-value {
          color: ${COLORS.accent};
        }
        .pf-nav-toggle-btn { display: none; }
        .pf-nav-mobile-menu { display: none; }

        @media (max-width: 900px) {
          .pf-hero { gap: 32px !important; }
          .pf-skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pf-about-grid { grid-template-columns: 1fr !important; }
          .pf-header-grid { grid-template-columns: auto 1fr auto !important; }
        }
        @media (max-width: 640px) {
          .pf-nav-desktop { display: none !important; }
          .pf-nav-toggle-btn { display: flex !important; align-items: center; justify-content: center; }
          .pf-nav-mobile-menu { display: flex !important; }
          .pf-header-grid { grid-template-columns: 1fr auto !important; }
          .pf-hero { flex-direction: column-reverse !important; }
          .pf-skills-grid { grid-template-columns: 1fr 1fr !important; }
          .pf-background-grid { grid-template-columns: 1fr !important; }
          .pf-project-row { flex-direction: column !important; gap: 12px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-pill-btn, .pf-icon-circle, .pf-info-card, .pf-project-card, .pf-nav-link {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ContactRow({ label, value, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pf-contact-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textDecoration: "none",
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "16px 20px",
        transition: "border-color 0.18s ease, background 0.18s ease",
      }}
    >
      <div>
        <p style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 13, color: COLORS.accent, margin: "0 0 4px" }}>
          {label}
        </p>
        <p
          className="pf-contact-value"
          style={{ fontSize: 15, color: COLORS.textPrimary, margin: 0, transition: "color 0.18s ease" }}
        >
          {value}
        </p>
      </div>
      <IconCircle label={label} icon={icon} href={href} size={44} />
    </a>
  );
}