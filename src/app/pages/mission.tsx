import { ExternalLink } from "lucide-react";
import cspLogo from "../../assets/partners/csp-logo.webp";
import createLabLogo from "../../assets/partners/create_lab_logo.avif";
import phdcLogo from "../../assets/partners/PHDC-logo.png";
import beamLogo from "../../assets/partners/BEAM_logo.svg";

export function MissionPage() {
  const madeBy = [
    {
      name: "Center for Shared Prosperity",
      logo: cspLogo,
      url: "https://www.centerforsharedprosperity.org/",
      role: "Created by",
    },
    {
      name: "CREATE Lab",
      logo: createLabLogo,
      url: "https://www.cmucreatelab.org/",
      role: "Hosted by",
    },
  ];

  const communityPartners = [
    {
      name: "Pittsburgh Hispanic Development Corporation",
      logo: phdcLogo,
      url: "https://phdcincubator.org/en/home/",
    },
    {
      name: "BEAM Collaborative",
      logo: beamLogo,
      url: "https://beamcollaborative.org",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* About Us */}
      <section className="mb-16">
        <h1
          className="text-5xl font-bold mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About Us
        </h1>

        <div className="prose max-w-none space-y-6 text-lg text-[var(--ink)] leading-relaxed">
          <p>
            Where we spend our money matters. Each purchase that we make is an opportunity to invest in local businesses. GoLocal was created to make it easier for university purchasers to find and buy food from local small businesses. We do this because buying local supports our neighbors and their businesses, ensuring that we always have a variety of new flavors near campus. The university attracts people from all over the world, and we are happy to play a small part in helping people find a taste of home or perhaps experience Pittsburgh's own quirky cuisine derived from its history as a cultural melting pot.
          </p>
          <p>
            There is nothing more powerful than coming together over a meal, and this project was inspired by the countless administrative assistants who build community on campus every time they order catering for meetings and events. Cornelia Moore, long time Purchasing Manager in Civil &amp; Environmental Engineering and now retired, created the first known campus directory of local businesses that was widely circulated and used at Carnegie Mellon. With gratitude for her wisdom and initiative, we offer GoLocal as a resource to university staff, faculty, and students who want to buy local.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-16">
        <div className="flex-1 h-0.5 bg-[var(--ink)]" />
        <span className="text-sm uppercase tracking-wide font-bold" style={{ fontFamily: "var(--font-mono)" }}>
          Our Organizations
        </span>
        <div className="flex-1 h-0.5 bg-[var(--ink)]" />
      </div>

      {/* Made By */}
      <section className="mb-12">
        <h2
          className="text-xs uppercase tracking-wide font-bold mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Made &amp; Hosted By
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {madeBy.map(org => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="h-16 flex items-center justify-center">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="max-h-16 max-w-[180px] w-auto object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide text-[var(--ink)]/60 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  {org.role}
                </p>
                <p className="font-semibold text-[var(--ink)]">{org.name}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--ink)]/40 group-hover:text-[var(--ink)] transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* Community Partners */}
      <section>
        <h2
          className="text-xs uppercase tracking-wide font-bold mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Community Partners
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {communityPartners.map(org => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="h-16 flex items-center justify-center">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="max-h-16 max-w-[180px] w-auto object-contain"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-[var(--ink)]">{org.name}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--ink)]/40 group-hover:text-[var(--ink)] transition-colors" />
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
