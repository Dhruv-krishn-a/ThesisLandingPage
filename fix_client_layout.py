import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

# 1. Remove the Callout Box in Hero
hero_callout = '''              {/* Callout Box */}
              <div className="bg-[#081226]/90 border-l-4 border-cyan-400 rounded-xl p-6 md:p-7 border-t border-r border-b border-cyan-500/20 shadow-xl backdrop-blur-md space-y-3">
                <p className="text-cyan-400 font-bold text-lg md:text-xl">
                  {content.hero?.integrityBold?.value || "You Write. We Guide."}
                </p>
                <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
                  {content.hero?.integrityText?.map((p: { value: string }) => p.value).join(' ')}
                </p>
              </div>'''
content = content.replace(hero_callout, "")

# 2. Replace whyTrustUs section with strugglingSection
old_why_trust_us = '''        {/* 2. WHY TRUST US / FINDING YOUR THESIS DIFFICULT TO MANAGE? */}
        <section className="py-20 md:py-28 px-6 relative z-10" id="why-trust-us">
          <div className="max-w-6xl mx-auto">
            
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight [text-wrap:balance]">
                  {content.whyTrustUs?.heading?.value || "Finding Your Thesis Difficult to Manage?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
              </div>
            </FadeIn>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
              {content.whyTrustUs?.features?.map((feat: ContentItem, idx: number) => {
                const IconComponent = getIcon(feat.icon, BookOpen);
                return (
                  <FadeIn key={idx} delay={idx * 40}>
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-6 md:p-7 rounded-2xl flex items-start gap-5 hover:bg-[#0a152d] transition-all duration-300 group shadow-md">
                      <div className="shrink-0 p-3.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {feat.title}
                        </h3>
                        <p className="text-slate-200 text-base md:text-lg font-normal leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Section Quote / Conclusion */}
            {content.whyTrustUs?.quote?.value && (
              <FadeIn delay={300}>
                <div className="bg-gradient-to-r from-[#081226] via-[#0c1a38] to-[#081226] border border-cyan-500/40 rounded-2xl p-7 md:p-9 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <p className="text-cyan-200 text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-line">
                    &quot;{content.whyTrustUs.quote.value}&quot;
                  </p>
                </div>
              </FadeIn>
            )}

          </div>
        </section>'''

new_struggling_section = '''        {/* 2. STRUGGLING SECTION */}
        <section className="py-20 md:py-28 px-6 relative z-10" id="struggling">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.strugglingSection?.heading || "Struggling to Navigate Your Thesis?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-8"></div>
                {content.strugglingSection?.intro && (
                  <p className="text-slate-200 text-xl md:text-2xl font-normal">
                    {content.strugglingSection.intro}
                  </p>
                )}
              </div>
            </FadeIn>

            <div className="space-y-4">
              {content.strugglingSection?.points?.map((point: string, idx: number) => (
                <FadeIn key={idx} delay={idx * 50}>
                  <div className="flex items-center gap-4 bg-[#070e1e]/80 border border-[#1e293b] p-5 rounded-2xl shadow-sm hover:border-cyan-500/30 transition-colors">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-950/50 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed">
                      {point}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {content.strugglingSection?.conclusion && (
              <FadeIn delay={300}>
                <div className="mt-12 text-center">
                  <p className="text-cyan-200 text-xl md:text-2xl font-medium [text-wrap:balance]">
                    {content.strugglingSection.conclusion}
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </section>'''

content = content.replace(old_why_trust_us, new_struggling_section)

# Update SiteContent Interface to replace whyTrustUs with strugglingSection
content = content.replace(
    '  whyTrustUs?: ContentSection;',
    '  strugglingSection?: {\n    heading?: string;\n    intro?: string;\n    points?: string[];\n    conclusion?: string;\n  };'
)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
