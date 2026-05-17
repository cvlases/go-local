import { useEffect } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "../config";

const INSTAGRAM_HANDLE = "centerforsharedprosperity";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// To add individual post embeds, paste the post's shortcode (the part after /p/ in the URL)
// e.g. for https://www.instagram.com/p/ABC123/ the shortcode is ABC123
const FEATURED_POSTS: string[] = [
  // "ABC123",
  // "DEF456",
];

export function SocialPage() {
  useEffect(() => {
    if (FEATURED_POSTS.length === 0) return;
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Find Us on Instagram
        </h1>
        <p className="text-lg text-[var(--ink)] max-w-xl mx-auto">
          Follow along for new restaurant spotlights, community updates, and Pittsburgh food finds.
        </p>
      </div>

      {/* Instagram profile card */}
      <div className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl p-10 text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--sky)] rounded-2xl mb-6">
          <Instagram className="w-10 h-10 text-white" />
        </div>
        <h2
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {SITE_CONFIG.instagramHandle}
        </h2>
        <p className="text-[var(--ink)] mb-8 text-lg">
          New spots, community stories, and local flavor — all in one place.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--sky)] text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          <Instagram className="w-5 h-5" />
          Follow on Instagram
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Embedded posts — populated when FEATURED_POSTS has entries */}
      {FEATURED_POSTS.length > 0 ? (
        <div className="mb-10">
          <h3
            className="text-sm font-bold uppercase tracking-wide mb-6 text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Recent Posts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
            {FEATURED_POSTS.map(shortcode => (
              <blockquote
                key={shortcode}
                className="instagram-media w-full"
                data-instgrm-permalink={`https://www.instagram.com/p/${shortcode}/`}
                data-instgrm-version="14"
                style={{ maxWidth: "540px", minWidth: "326px", margin: "0 auto" }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-10 border-2 border-dashed border-[var(--ink)]/20 rounded-xl p-8 text-center">
          <Instagram className="w-8 h-8 mx-auto mb-3 text-[var(--ink)]/30" />
          <p className="text-sm text-[var(--ink)]/50" style={{ fontFamily: "var(--font-mono)" }}>
            Add post shortcodes to <code>FEATURED_POSTS</code> in social.tsx to embed recent posts here.
          </p>
        </div>
      )}

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
