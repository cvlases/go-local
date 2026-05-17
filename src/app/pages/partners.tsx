import { ExternalLink, Heart } from "lucide-react";
import cspLogo from "../../assets/partners/csp-logo.webp";
import createLabLogo from "../../assets/partners/create_lab_logo.avif";
import phdcLogo from "../../assets/partners/PHDC-logo.png";
import beamLogo from "../../assets/partners/BEAM_logo.svg";

export function PartnersPage() {
  const featuredPartners = [
    {
      name: "Pittsburgh Hispanic Development Corporation",
      description: "Empowering Pittsburgh's Hispanic community through business incubation, workforce development, and economic opportunity.",
      website: "https://phdcincubator.org/en/home/",
      logo: phdcLogo,
    },
    {
      name: "BEAM Collaborative",
      description: "A design-forward nonprofit building community through creative placemaking, economic inclusion, and equitable development.",
      website: "https://beamcollaborative.org",
      logo: beamLogo,
    },
  ];

  const madeBy = [
    {
      name: "Center for Shared Prosperity",
      description: "Created by",
      website: "https://www.centerforsharedprosperity.org/",
      logo: cspLogo,
    },
    {
      name: "CREATE Lab",
      description: "Hosted by",
      website: "https://www.cmucreatelab.org/",
      logo: createLabLogo,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Community Partners
        </h1>
        <p className="text-lg text-[var(--ink)]">
          GoLocal is made possible by our community partners who share our commitment to supporting local businesses and building strong neighborhoods.
        </p>
      </div>

      {/* Community Partners */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Community Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPartners.map(partner => (
            <div
              key={partner.name}
              className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl p-8 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="h-16 flex items-start mb-6">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-[200px] w-auto object-contain"
                />
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {partner.name}
              </h3>
              <p className="text-[var(--ink)] mb-6 flex-1">{partner.description}</p>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#bacce7] text-[var(--ink)] rounded-lg hover:opacity-80 transition-opacity font-medium w-fit"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Made By */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Made &amp; Hosted By
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {madeBy.map(org => (
            <a
              key={org.name}
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 p-8 bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="h-14 flex items-center">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="max-h-14 max-w-[180px] w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--ink)]/50 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  {org.description}
                </p>
                <p className="font-semibold text-[var(--ink)] flex items-center gap-2">
                  {org.name}
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="bg-[var(--sky)] border-2 border-[var(--ink)] rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Become a Partner
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Interested in partnering with GoLocal? We're always looking to collaborate with organizations that share our mission of supporting local businesses and strengthening communities.
          </p>
          <a
            href="mailto:partners@golocal.org"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--sky)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
