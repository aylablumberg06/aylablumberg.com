"use client";

import { useState } from "react";

const experience = [
  {
    company: "Club Studio",
    role: "Gym Front Desk & Cryotherapy Technician",
    location: "Dallas, TX",
    period: "January 2026 – Present",
    bullets: [
      "Supported high-touch front desk operations and client experience in a boutique fitness and recovery studio",
      "Assisted with cryotherapy sessions, member onboarding, and class logistics to ensure smooth daily operations",
    ],
  },
  {
    company: "Fortifying U",
    role: "Branding & Communications Intern",
    location: "Dallas, TX",
    period: "Summer 2025",
    bullets: [
      "Designed and developed a professional website translating the founder's leadership coaching vision into a clear, engaging platform",
      "Applied brand identity, strategic communication, and UX principles to strengthen the organization's reach and impact",
      "Provided constructive feedback on presentations and marketing ideas from a Gen Z perspective",
    ],
  },
  {
    company: "Strong Fitness",
    role: "Front Desk Manager & Party Host",
    location: "Dallas, TX",
    period: "March 2022 – December 2024",
    bullets: [
      "Greeted guests, provided high-level telephone and in-person customer service, managed event bookings, and sold memberships",
      "Coordinated and supervised all activities, classes, event food service, and setup",
    ],
  },
  {
    company: "Camp Young Judea",
    role: "Counselor Leadership Training",
    location: "Wimberley, TX",
    period: "Summer 2024",
    bullets: [
      "Engaged and supported children ages 7–14, fostering a positive and cooperative environment",
      "Collaborated with co-counselors to plan and execute daily activities, promoting teamwork",
    ],
  },
  {
    company: "Favor the Kind",
    role: "Retail Store Leadership & Operations Intern",
    location: "Crested Butte, CO",
    period: "Summer 2022",
    bullets: [
      "Managed shipments, inventory, and merchandising, optimizing store organization and retail displays",
      "Developed a keen interest in luxury retail and brand storytelling, focused on elevating customer experience",
    ],
  },
];

const certifications = [
  {
    title: "CPR Certification",
    org: "American College of Emergency Physicians",
    period: "June 2024",
    detail: "Trained in life-saving procedures for adults, children, and infants",
  },
  {
    title: "200-Hour Certified Yoga Instructor",
    org: "Dallas Yoga Center",
    period: "January – May 2023",
    detail: "Studied yoga philosophy, history, anatomy, breathing, and poses; practiced planning and teaching sequences",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch("https://formspree.io/f/xzdjayyl", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setSending(false);
    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-base tracking-tight">Ayla Blumberg</span>
          <div className="hidden sm:flex gap-8 text-sm font-medium text-gray-500">
            <a href="#about" className="hover:text-pink-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-pink-400 transition-colors">Experience</a>
            <a href="#portfolio" className="hover:text-pink-400 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-pink-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen bg-pink-50 flex items-center justify-center text-center px-6 pt-20">
        <div>
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Portfolio &amp; Résumé
          </p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-black mb-6 leading-none">
            Ayla Blumberg
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-10 tracking-wide">
            Creative &nbsp;·&nbsp; Editor &nbsp;·&nbsp; Published Author &nbsp;·&nbsp; Real Estate
          </p>
          <a
            href="#about"
            className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-pink-400 transition-colors"
          >
            Explore
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-3">About</p>
          <h2 className="text-4xl font-bold mb-8">Hi, I&apos;m Ayla.</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-5">
            I&apos;m a Dallas-based creative passionate about storytelling, branding, and building
            meaningful connections. I graduated as salutatorian from Akiba Yavneh Academy of Dallas
            with a 100.45 GPA, spent my gap semester studying in Jerusalem, and I&apos;m heading to
            the University of Texas in Fall 2026.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Whether it&apos;s designing a brand identity, editing content, writing a YA novel, or
            guiding someone through a yoga class — I love using creativity to make things look and
            feel exactly right.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Published Author", sub: "YA Novel" },
              { label: "Yoga Instructor", sub: "200-hr Certified" },
              { label: "Graphic Designer", sub: "Clubs & Events" },
              { label: "Real Estate", sub: "License in Progress" },
            ].map((item) => (
              <div key={item.label} className="bg-pink-50 rounded-2xl p-5 text-center">
                <p className="font-semibold text-sm text-black">{item.label}</p>
                <p className="text-xs text-pink-400 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-16">
            <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-6">Education</p>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <p className="font-semibold text-black">University of Texas</p>
                  <p className="text-sm text-gray-400">Attending Fall 2026</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <p className="font-semibold text-black">Texas Real Estate License</p>
                  <p className="text-sm text-gray-400">In Progress · Expected Spring 2026</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <p className="font-semibold text-black">Young Judea Year Course</p>
                  <p className="text-sm text-gray-400">Gap Semester · Jerusalem · Fall 2025</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4">
                <div>
                  <p className="font-semibold text-black">Akiba Yavneh Academy of Dallas</p>
                  <p className="text-sm text-gray-400">
                    Salutatorian · GPA 100.45 · AP Scholar with Distinction · Graduated May 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-pink-50 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-3">Work</p>
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experience.map((job) => (
              <div key={job.company} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-1">
                  <div>
                    <p className="font-bold text-black text-lg">{job.company}</p>
                    <p className="text-pink-400 text-sm font-medium">{job.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400 font-medium">{job.period}</p>
                    <p className="text-xs text-gray-300">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-pink-300 mt-1 shrink-0">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16">
            <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-6">Certifications</p>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1 gap-1">
                    <p className="font-bold text-black">{cert.title}</p>
                    <p className="text-xs text-gray-400 shrink-0">{cert.period}</p>
                  </div>
                  <p className="text-pink-400 text-sm font-medium mb-2">{cert.org}</p>
                  <p className="text-sm text-gray-600">{cert.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl font-bold mb-4">My Work</h2>
          <p className="text-gray-400 mb-12">A look at my editing and content creation.</p>
          <div className="flex justify-center">
            <iframe
              src="https://www.tiktok.com/embed/v2/7613482868961987870"
              className="rounded-2xl border-0"
              width="325"
              height="580"
              allowFullScreen
              allow="encrypted-media"
              title="TikTok video"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-pink-50 py-24 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-3 text-center">Contact</p>
          <h2 className="text-4xl font-bold mb-4 text-center">Get in Touch</h2>
          <p className="text-gray-400 mb-10 text-center">I&apos;d love to connect — send me a message.</p>

          {submitted ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <p className="text-2xl font-bold text-black mb-2">Thanks!</p>
              <p className="text-gray-400">I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-pink-400 transition-colors disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}

          <div className="flex justify-center mt-8">
            <a
              href="https://linkedin.com/in/ayla-blumberg-95a719337"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black text-black px-8 py-3 rounded-full text-sm font-medium hover:border-pink-400 hover:text-pink-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-6 text-center">
        <p className="text-xs text-gray-300">© 2026 Ayla Blumberg</p>
      </footer>
    </div>
  );
}
