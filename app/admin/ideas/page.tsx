import { getIdeas } from "@/lib/admin-data";

export default async function IdeasPage() {
  const ideas = await getIdeas();

  return (
    <main>
      <section
        className="px-6 pt-20 pb-16 relative overflow-hidden"
        style={{
          background: "#fdf2f8",
          backgroundImage: "radial-gradient(circle, #f9a8d4 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f9a8d4 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4 text-center">
            What&apos;s Next
          </p>
          <h1
            className="text-center text-6xl md:text-7xl font-bold text-black leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            New <span className="italic text-pink-400">ideas.</span>
          </h1>
          <p
            className="text-center text-gray-500 text-lg italic max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Each one builds on something already shipped. Compound, don&apos;t scatter.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {ideas.map((idea, i) => (
            <article
              key={idea.title}
              className="bg-white border border-pink-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="grid md:grid-cols-[120px_1fr]">
                <div className="bg-pink-50 px-6 py-8 md:py-10 flex md:flex-col items-center md:items-start justify-between md:justify-center gap-3 border-b md:border-b-0 md:border-r border-pink-100">
                  <span
                    className="text-5xl md:text-6xl font-bold text-pink-300 leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-pink-400 font-bold">
                    Idea
                  </span>
                </div>
                <div className="p-7">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-pink-400 font-semibold mb-2">
                    Builds on · {idea.buildsOn}
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-black leading-tight mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {idea.title}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-gray-300 font-semibold mb-1.5">
                        Why
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">{idea.why}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-gray-300 font-semibold mb-1.5">
                        Next move
                      </p>
                      <p className="text-sm text-pink-500 leading-relaxed italic"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        {idea.next}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <p className="text-center text-xs text-gray-400 italic mt-12"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Add or edit ideas in <span className="text-pink-400">data/admin/ideas.json</span>
          </p>
        </div>
      </section>
    </main>
  );
}
