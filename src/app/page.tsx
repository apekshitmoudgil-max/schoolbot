import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Target,
  Trophy,
  Sprout,
  MapPin,
  Mail,
  Clock,
  Bus,
  Users,
  Award,
  Globe,
  Palette,
  Music,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import ChatWidget from "@/components/chat-widget";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const programs = [
  {
    title: "Early Years",
    grades: "Pre-N to UKG",
    icon: Sprout,
    color: "bg-mint",
    iconColor: "text-forest",
    description:
      "Play-based learning in nurturing, safe spaces designed for little explorers.",
  },
  {
    title: "Primary School",
    grades: "Class 1-5",
    icon: BookOpen,
    color: "bg-mint",
    iconColor: "text-forest",
    description:
      "Building strong foundations in literacy, numeracy, and creative thinking.",
  },
  {
    title: "Middle School",
    grades: "Class 6-8",
    icon: FlaskConical,
    color: "bg-mint",
    iconColor: "text-forest",
    description:
      "Exploring the world through science, arts, and critical inquiry.",
  },
  {
    title: "Secondary",
    grades: "Class 9-10",
    icon: Target,
    color: "bg-mint",
    iconColor: "text-forest",
    description:
      "Focused academic preparation with board exam excellence as the goal.",
  },
  {
    title: "Senior Secondary",
    grades: "Class 11-12",
    icon: GraduationCap,
    color: "bg-mint",
    iconColor: "text-forest",
    description:
      "Science, Commerce, and Humanities streams with JEE/NEET prep.",
  },
  {
    title: "Beyond Academics",
    grades: "All Classes",
    icon: Trophy,
    color: "bg-mint",
    iconColor: "text-forest",
    description:
      "30+ clubs, sports, arts, and international exchange programs.",
  },
];

const whyLeft = [
  {
    icon: Award,
    title: "NEP 2020 Aligned",
    description: "Modern curriculum with coding from Class 3",
  },
  {
    icon: FlaskConical,
    title: "STEM Excellence",
    description: "State-of-the-art lab with robotics kits",
  },
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Exchange programs with schools in Singapore & UK",
  },
  {
    icon: Users,
    title: "Personal Attention",
    description: "1:20 student-teacher ratio",
  },
];

const whyRight = [
  {
    icon: Music,
    title: "Performing Arts",
    description: "Dedicated music, dance, and drama studios",
  },
  {
    icon: Palette,
    title: "Creative Expression",
    description: "Art and pottery studio for every student",
  },
  {
    icon: Bus,
    title: "Safe Transport",
    description: "6 routes covering major Bangalore areas",
  },
  {
    icon: Sparkles,
    title: "Smart Campus",
    description: "100% smart classrooms with digital infrastructure",
  },
];

const testimonials = [
  {
    quote:
      "The teachers at Greenwood truly care about each child\u2019s growth. My daughter has blossomed here.",
    name: "Priya Sharma",
    context: "Parent of Class 5 student",
  },
  {
    quote:
      "The STEM program is outstanding. My son built his first robot in Class 4!",
    name: "Rajesh Kumar",
    context: "Parent of Class 7 student",
  },
  {
    quote:
      "We looked at 12 schools before choosing Greenwood. The campus, faculty, and values made the difference.",
    name: "Anita Desai",
    context: "Parent of Class 3 student",
  },
];

const stats = [
  { value: "1,800+", label: "Students" },
  { value: "15+", label: "Years of Excellence" },
  { value: "98.5%", label: "Board Results" },
  { value: "12-Acre", label: "Green Campus" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. DEMO BANNER                                              */}
      {/* ============================================================ */}
      <div className="demo-banner fixed top-0 left-0 right-0 z-50 py-2 px-4 text-center">
        <p className="text-white text-xs sm:text-sm font-medium tracking-wide">
          <span className="mr-1.5">&#x1F916;</span>
          SchoolBot Demo &mdash; Click the chat bubble in the bottom-right to
          try the AI admission assistant{" "}
          <span className="inline-block ml-1">&rarr;</span>
        </p>
      </div>

      {/* ============================================================ */}
      {/*  2. NAVIGATION                                               */}
      {/* ============================================================ */}
      <nav className="sticky top-8 z-40 bg-cream/80 backdrop-blur-md border-b border-leaf/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-forest"
          >
            <span className="text-2xl">&#x1F333;</span>
            Greenwood International Academy
          </a>

          <div className="hidden md:flex items-center gap-8">
            {["Programs", "Campus", "Admissions", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sage hover:text-forest transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {item}
              </a>
            ))}
            <a
              href="#admissions"
              className="bg-terracotta text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-terracotta/90 transition-colors duration-200"
            >
              Apply Now
            </a>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  3. HERO SECTION                                             */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest via-forest-light to-forest">
        {/* Decorative shapes */}
        <div className="absolute top-20 -left-24 w-[300px] h-[300px] rounded-full bg-leaf/10 blur-3xl" />
        <div className="absolute bottom-32 -right-16 w-[200px] h-[200px] rounded-full bg-mint/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-[150px] h-[150px] rounded-full bg-amber/5 blur-2xl" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-32">
          <h1
            className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 animate-fade-in-up"
          >
            Where Curiosity
            <br />
            Meets{" "}
            <span className="text-amber italic">Excellence</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-mint/90 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            A CBSE school in Bangalore nurturing future leaders since 2008.
            12-acre campus. 1,800+ students. 98.5% board results.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#admissions"
              className="bg-amber text-charcoal px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber/90 hover:shadow-lg hover:shadow-amber/20 transition-all duration-300 flex items-center gap-2"
            >
              Apply for 2026-27
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#programs"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-2"
            >
              Explore Programs
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-terracotta/20 to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  4. STATS BAR                                                */}
      {/* ============================================================ */}
      <section className="relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-terracotta via-terracotta to-amber rounded-2xl px-8 py-10 shadow-2xl shadow-terracotta/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. PROGRAMS SECTION                                         */}
      {/* ============================================================ */}
      <section id="programs" className="bg-cream py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Our Programs
            </h2>
            <div className="w-16 h-1 bg-sage rounded-full mx-auto mb-6" />
            <p className="text-sage text-lg max-w-xl mx-auto">
              From early years to senior secondary, we nurture every stage of
              growth
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.title}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-leaf/10 transition-all duration-300 border border-leaf/5 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-mint/50 flex items-center justify-center mb-6 group-hover:bg-mint transition-colors duration-300">
                    <Icon className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-charcoal mb-1">
                    {program.title}
                  </h3>
                  <p className="text-sm text-terracotta font-medium mb-3">
                    {program.grades}
                  </p>
                  <p className="text-sage leading-relaxed">
                    {program.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. WHY GREENWOOD                                            */}
      {/* ============================================================ */}
      <section id="campus" className="bg-ivory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Why Families Choose Greenwood
            </h2>
            <div className="w-16 h-1 bg-leaf rounded-full mx-auto mb-6" />
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
            {/* Left column */}
            <div className="space-y-8">
              {whyLeft.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-sage" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-charcoal mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sage leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {whyRight.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-leaf/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-forest-light" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-charcoal mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sage leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. TESTIMONIALS                                             */}
      {/* ============================================================ */}
      <section className="bg-cream py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-charcoal mb-4">
              What Parents Say
            </h2>
            <div className="w-16 h-1 bg-amber rounded-full mx-auto" />
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-leaf/10 transition-all duration-300 border border-leaf/5"
              >
                {/* Quote mark */}
                <div className="font-[family-name:var(--font-display)] text-6xl text-leaf/40 leading-none mb-2">
                  &ldquo;
                </div>
                <p className="text-charcoal/80 italic leading-relaxed mb-6 text-[15px]">
                  {testimonial.quote}
                </p>
                <div className="border-t border-leaf/10 pt-4">
                  <p className="font-semibold text-charcoal text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-sage text-sm">{testimonial.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. CTA SECTION                                              */}
      {/* ============================================================ */}
      <section
        id="admissions"
        className="relative bg-gradient-to-br from-forest via-forest-light to-forest py-24 md:py-32 overflow-hidden"
      >
        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full bg-leaf/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[150px] h-[150px] rounded-full bg-amber/5 blur-2xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Begin Your Child&apos;s Journey
          </h2>
          <p className="text-mint/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Admissions open for 2026-27. Limited seats available. Apply now or
            chat with our AI assistant for instant answers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="bg-amber text-charcoal px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber/90 hover:shadow-lg hover:shadow-amber/20 transition-all duration-300 flex items-center gap-2"
            >
              Start Application
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              type="button"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Chat with Us
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer id="contact" className="bg-charcoal py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1 — About */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-cream mb-4">
                <span className="mr-1.5">&#x1F333;</span> Greenwood International Academy
              </h3>
              <p className="text-sage/70 text-sm leading-relaxed mb-4">
                Nurturing young minds since 2008 with a commitment to academic
                excellence, character building, and holistic development.
              </p>
              <p className="text-sage/50 text-xs font-medium">
                CBSE Affiliation No: 830456
              </p>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-cream mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  "Programs",
                  "Admissions",
                  "Campus Tour",
                  "Fee Structure",
                  "Transport",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sage/60 hover:text-mint text-sm transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Contact */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-cream mb-4">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-leaf mt-0.5 flex-shrink-0" />
                  <span className="text-sage/60 text-sm leading-relaxed">
                    42, Sarjapur Road,
                    <br />
                    Bangalore 560035
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-leaf flex-shrink-0" />
                  <a
                    href="mailto:admissions@greenwoodacademy.edu.in"
                    className="text-sage/60 hover:text-mint text-sm transition-colors duration-200 break-all"
                  >
                    admissions@greenwoodacademy.edu.in
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 — School Hours */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-cream mb-4">
                School Hours
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-leaf mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream/80 text-sm font-medium">
                      Pre-N &amp; UKG
                    </p>
                    <p className="text-sage/50 text-sm">8:30 AM &ndash; 12:30 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-leaf mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream/80 text-sm font-medium">
                      Primary (1-5)
                    </p>
                    <p className="text-sage/50 text-sm">8:00 AM &ndash; 2:30 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-leaf mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream/80 text-sm font-medium">
                      Secondary (6-12)
                    </p>
                    <p className="text-sage/50 text-sm">7:45 AM &ndash; 3:15 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-sage/10 pt-8 text-center">
            <p className="text-sage/40 text-sm">
              &copy; 2026 Greenwood International Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/*  10. CHAT WIDGET                                             */}
      {/* ============================================================ */}
      <ChatWidget />
    </>
  );
}
