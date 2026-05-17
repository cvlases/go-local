import { ExternalLink, Mail, Heart } from "lucide-react";

export function PartnersPage() {
  const featuredPartners = [
    {
      name: "Casa San Jose",
      description: "Supporting Latino families and communities in Pittsburgh through education, advocacy, and community building.",
      website: "https://casasanjose.org",
      logo: "🏠",
    },
    {
      name: "Hispanic Development Council",
      description: "Empowering the Hispanic community through education, employment services, and community programs.",
      website: "https://hdc-pa.org",
      logo: "🌟",
    },
  ];

  const communityPartners = [
    { name: "Pittsburgh Food Bank", logo: "🍎" },
    { name: "Local First Pittsburgh", logo: "🏪" },
    { name: "Pittsburgh Public Market", logo: "🛒" },
    { name: "Grow Pittsburgh", logo: "🌱" },
    { name: "Just Harvest", logo: "🌾" },
    { name: "412 Food Rescue", logo: "🚚" },
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

      {/* Featured Partners */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ⭐ Featured Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPartners.map(partner => (
            <div
              key={partner.name}
              className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-6xl mb-4">{partner.logo}</div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {partner.name}
              </h3>
              <p className="text-[var(--ink)] mb-6">{partner.description}</p>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#bacce7] text-[var(--ink)] rounded-lg hover:opacity-80 transition-opacity font-medium"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Community Partners Grid */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          🤝 Community Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {communityPartners.map(partner => (
            <div
              key={partner.name}
              className="bg-white border-2 border-[var(--ink)] rounded-xl p-6 text-center hover:bg-[var(--stone)] transition-colors"
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <h4 className="text-sm font-medium">{partner.name}</h4>
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partners@golocal.org"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--sky)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-[var(--sky)] transition-colors"
            >
              Learn More
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
