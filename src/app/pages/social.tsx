import { Instagram, ExternalLink, Download } from "lucide-react";
import { SITE_CONFIG } from "../config";

const INSTAGRAM_HANDLE = "centerforsharedprosperity";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

const FEATURED_POSTS: string[] = [
  "DDGFgq9N8Q8",
  "DYXw_AfH28J",
  "DU-3jZFDSLX",
  "DUs8xKbDchz",
];

export function SocialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Social
        </h1>
        <p className="text-lg text-[var(--ink)]">
          Community events, zines, and what we're sharing on Instagram.
        </p>
      </div>

      {/* Zines */}
      <section className="mb-12">
        <h2
          className="text-sm font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          GoLocal Zines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "GoLocal Guide: Winter Warmers", issue: "Issue #3", date: "Winter 2026", color: "var(--coral)", description: "Our favorite cozy spots for cold Pittsburgh days" },
            { title: "GoLocal Guide: Coffee & Study Spots", issue: "Issue #2", date: "Fall 2025", color: "var(--sky)", description: "The best cafés for getting work done" },
            { title: "GoLocal Guide: Late Night Eats", issue: "Issue #1", date: "Summer 2025", color: "var(--lime)", description: "Where to eat after midnight in Pittsburgh" },
          ].map((zine, i) => (
            <div key={i} className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl overflow-hidden">
              <div
                className="h-40 flex items-center justify-center p-4 text-center"
                style={{ backgroundColor: zine.color }}
              >
                <div>
                  <h4 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{zine.title}</h4>
                  <p className="text-white/80 text-sm" style={{ fontFamily: "var(--font-mono)" }}>{zine.issue}</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs text-[var(--ink)]" style={{ fontFamily: "var(--font-mono)" }}>{zine.date}</p>
                <p className="text-sm">{zine.description}</p>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--ink)] text-white rounded-lg hover:bg-[var(--ink)]/90 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm font-bold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Instagram
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--sky)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            {SITE_CONFIG.instagramHandle}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 gap-2 border-2 border-[var(--ink)] rounded-xl overflow-hidden">
          {FEATURED_POSTS.map(shortcode => (
            <a
              key={shortcode}
              href={`https://www.instagram.com/p/${shortcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block bg-[var(--stone)] overflow-hidden group"
              style={{ aspectRatio: "1 / 1" }}
            >
              <iframe
                src={`https://www.instagram.com/p/${shortcode}/embed/`}
                style={{
                  width: "100%",
                  height: "420px",
                  border: "none",
                  pointerEvents: "none",
                  marginTop: "-4px",
                }}
                scrolling="no"
                title={`Instagram post ${shortcode}`}
              />
              <div className="absolute inset-0 bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/20 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <div className="bg-[var(--gold)] border-2 border-[var(--ink)] rounded-xl p-8 text-center">
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tag a local spot
        </h3>
        <p className="text-[var(--ink)] mb-4">
          Eaten somewhere great? Tag us at {SITE_CONFIG.instagramHandle} and we might feature it.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-white rounded-lg font-medium hover:bg-[var(--ink)]/90 transition-colors"
        >
          Open Instagram
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
