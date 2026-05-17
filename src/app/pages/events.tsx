import { Calendar, Download, Mail } from "lucide-react";

export function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "CSP Spring Market",
      date: "April 12, 2026",
      time: "10am - 4pm",
      location: "University Center",
      description: "Join us for a celebration of local vendors, food, and community. Live music, activities, and more!",
      rsvpLink: "#",
    },
    {
      id: 2,
      title: "Community Food Tour: Squirrel Hill",
      date: "April 25, 2026",
      time: "2pm - 5pm",
      location: "Starts at Forbes & Murray",
      description: "A guided walking tour featuring tastings from 5 local restaurants in Squirrel Hill.",
      rsvpLink: "#",
    },
  ];

  const pastEvents = [
    "Winter Food Festival - January 2026",
    "Cookbook Swap & Potluck - December 2025",
    "Restaurant Week Kickoff - November 2025",
  ];

  const zines = [
    {
      id: 1,
      title: "GoLocal Guide: Winter Warmers",
      issue: "Issue #3",
      date: "Winter 2026",
      coverColor: "var(--coral)",
      description: "Our favorite cozy spots for cold Pittsburgh days",
    },
    {
      id: 2,
      title: "GoLocal Guide: Coffee & Study Spots",
      issue: "Issue #2",
      date: "Fall 2025",
      coverColor: "var(--sky)",
      description: "The best cafés for getting work done",
    },
    {
      id: 3,
      title: "GoLocal Guide: Late Night Eats",
      issue: "Issue #1",
      date: "Summer 2025",
      coverColor: "var(--lime)",
      description: "Where to eat after midnight in Pittsburgh",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Extras
        </h1>
        <p className="text-xl text-[var(--ink)] max-w-2xl mx-auto">
          Community events, food tours, and our quarterly zine featuring the best of Pittsburgh's local food scene.
        </p>
      </div>

      {/* Upcoming Events */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          📅 Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-[var(--coral)] text-white rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">
                    {event.date.split(" ")[1].replace(",", "")}
                  </div>
                  <div className="text-xs uppercase">
                    {event.date.split(" ")[0]}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-[var(--ink)]">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date} · {event.time}
                    </p>
                    <p>📍 {event.location}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm mb-4">{event.description}</p>
              <a
                href={event.rsvpLink}
                className="inline-block px-6 py-3 bg-[var(--coral)] text-white rounded-lg hover:bg-[var(--coral)]/90 transition-colors font-medium"
              >
                RSVP Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Past Events
        </h2>
        <div className="bg-[var(--stone)]/50 border border-[var(--ink)] rounded-xl p-6">
          <ul className="space-y-2">
            {pastEvents.map((event, i) => (
              <li key={i} className="text-[var(--ink)]" style={{ fontFamily: "var(--font-mono)" }}>
                • {event}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Zines Section */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold uppercase tracking-wide mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          📖 GoLocal Zines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zines.map(zine => (
            <div
              key={zine.id}
              className="group"
              style={{
                transform: `rotate(${Math.random() * 4 - 2}deg)`,
              }}
            >
              <div className="bg-white border-2 border-[var(--ink)] rounded-xl overflow-hidden hover:shadow-xl transition-all hover:rotate-0">
                {/* Cover */}
                <div
                  className="h-64 flex items-center justify-center p-6 text-center relative overflow-hidden"
                  style={{ backgroundColor: zine.coverColor }}
                >
                  <div className="relative z-10">
                    <h3
                      className="text-3xl font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {zine.title}
                    </h3>
                    <p className="text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                      {zine.issue}
                    </p>
                  </div>
                  {/* Texture */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                </div>
                {/* Info */}
                <div className="p-4 space-y-3">
                  <div className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-mono)" }}>
                    {zine.date}
                  </div>
                  <p className="text-sm">{zine.description}</p>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--ink)] text-white rounded-lg hover:bg-[var(--ink)]/90 transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--lime)] border-2 border-[var(--ink)] rounded-xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get GoLocal updates
          </h2>
          <p className="text-lg mb-6">
            New restaurants, events, and zines in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border-2 border-[var(--ink)] rounded-lg bg-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[var(--ink)] text-white rounded-lg font-medium hover:bg-[var(--ink)]/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-[var(--ink)] mt-4" style={{ fontFamily: "var(--font-mono)" }}>
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}