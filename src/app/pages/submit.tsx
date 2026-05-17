import { useState } from "react";
import { Check } from "lucide-react";
import { SITE_CONFIG, NEIGHBORHOODS, CUISINE_TYPES, DIETARY_OPTIONS } from "../config";

export function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to a backend or Google Forms
    setSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--lime)] border-2 border-[var(--ink)] rounded-xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <Check className="w-12 h-12 text-[var(--lime)]" />
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Thanks for the recommendation!
          </h1>
          <p className="text-lg mb-8">
            Your submission has been received and will be reviewed by the GoLocal community team.
          </p>
          <a
            href="/directory"
            className="inline-block px-8 py-4 bg-[var(--ink)] text-white rounded-lg font-medium hover:bg-[var(--ink)]/90 transition-colors"
          >
            See the directory →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Know a spot we're missing? Add it to the table.
        </h1>
        <p className="text-lg text-[var(--ink)]">
          Help grow our community directory by submitting your favorite local restaurants.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Restaurant Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
            placeholder="Primanti Brothers"
          />
        </div>

        {/* Neighborhood */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Neighborhood *
          </label>
          <select
            required
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
          >
            <option value="">Select neighborhood</option>
            {NEIGHBORHOODS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Cuisine Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Cuisine Type * (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {CUISINE_TYPES.map(cuisine => (
              <label key={cuisine} className="flex items-center gap-2 p-3 border border-[var(--ink)] rounded-lg hover:bg-[var(--stone)] cursor-pointer">
                <input type="checkbox" value={cuisine} />
                <span className="text-sm">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Website/Order Link */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Website or Order Link *
          </label>
          <input
            type="url"
            required
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
            placeholder="https://example.com"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description (in your own words — max 150 chars) *
          </label>
          <textarea
            required
            maxLength={150}
            rows={3}
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white resize-none"
            placeholder="Tell us what makes this place special..."
          />
          <p className="text-xs text-[var(--ink)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
            Be authentic! Share your personal experience.
          </p>
        </div>

        {/* Dietary Options */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Dietary Options (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {DIETARY_OPTIONS.map(option => (
              <label key={option.id} className="flex items-center gap-2 p-3 border border-[var(--ink)] rounded-lg hover:bg-[var(--stone)] cursor-pointer">
                <input type="checkbox" value={option.id} />
                <span className="text-sm">{option.emoji} {option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Catering */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Catering Available?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="catering" value="yes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="catering" value="no" defaultChecked />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Group Size Capacity */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Group Size Capacity (optional)
          </label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
            placeholder="e.g., 50"
          />
          <p className="text-xs text-[var(--ink)] mt-1">
            If they offer catering, how many people can they accommodate?
          </p>
        </div>

        {/* Your Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Name (optional)
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
            placeholder="Leave blank to submit anonymously"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Photo URL (optional)
          </label>
          <input
            type="url"
            className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Note */}
        <div className="p-4 bg-[var(--stone)] border border-[var(--ink)] rounded-lg">
          <p className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-mono)" }}>
            📝 Note: Submissions are reviewed by the GoLocal community team before going live.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-[var(--coral)] text-white rounded-lg font-medium hover:bg-[var(--coral)]/90 transition-colors text-lg"
          >
            Submit Restaurant
          </button>
          <button
            type="reset"
            className="px-8 py-4 bg-[var(--stone)] border-2 border-[var(--ink)] rounded-lg font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
          >
            Clear Form
          </button>
        </div>
      </form>

      {/* Alternative: Google Form */}
      <div className="mt-8 p-6 bg-[var(--sky)]/20 border-2 border-[var(--sky)] rounded-xl">
        <h3 className="font-bold mb-2">Prefer Google Forms?</h3>
        <p className="text-sm text-[var(--ink)] mb-4">
          You can also submit restaurants using our Google Form.
        </p>
        <a
          href={SITE_CONFIG.submitFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[var(--sky)] text-white rounded-lg hover:bg-[var(--sky)]/90 transition-colors"
        >
          Open Google Form →
        </a>
      </div>
    </div>
  );
}
