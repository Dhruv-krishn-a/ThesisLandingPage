import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

# 1. Simplify Highlight Banner
old_banner = '''            {/* Highlight Banner */}
            <FadeIn delay={150}>
              <div className="bg-gradient-to-br from-[#081226] via-[#050b18] to-[#0c1a38] border-2 border-cyan-500/50 rounded-3xl p-9 md:p-14 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group mb-14">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none"></div>
                
                <Quote className="h-12 w-12 text-cyan-400 mx-auto mb-5 opacity-80" />

                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.trustedPartner?.ctaText1?.value || "We Don't Write Your Thesis for You."}
                </h3>

                <p className="text-slate-100 text-lg md:text-2xl font-normal leading-relaxed max-w-3xl mx-auto mb-7">
                  {content.trustedPartner?.ctaText2?.value || "We help you understand, develop, review, and improve your own research work."}
                </p>

                {content.trustedPartner?.ctaHeading?.value && (
                  <div className="inline-block px-7 py-3 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold text-base md:text-lg tracking-wide">
                    {content.trustedPartner.ctaHeading.value}
                  </div>
                )}
              </div>
            </FadeIn>'''

new_paragraphs = '''            <FadeIn delay={200}>
              <div className="text-center mt-10 mb-14">
                {content.trustedPartner?.outro && (
                  <p className="text-slate-200 text-xl md:text-2xl font-normal mb-4">
                    {content.trustedPartner.outro}
                  </p>
                )}
                {content.trustedPartner?.ctaText1?.value && (
                  <p className="text-slate-200 text-xl md:text-2xl font-normal mb-4">
                    {content.trustedPartner.ctaText1.value}
                  </p>
                )}
                {content.trustedPartner?.ctaText2?.value && (
                  <p className="text-slate-200 text-xl md:text-2xl font-normal mb-4">
                    {content.trustedPartner.ctaText2.value}
                  </p>
                )}
                {content.trustedPartner?.ctaHeading?.value && (
                  <p className="text-slate-200 text-xl md:text-2xl font-normal mb-4">
                    {content.trustedPartner.ctaHeading.value}
                  </p>
                )}
              </div>
            </FadeIn>'''

content = content.replace(old_banner, "")
# Find where the old outro was (which we want to replace entirely with the new paragraphs)
old_outro = '''            <FadeIn delay={200}>
              <div className="text-center mt-10 mb-14">
                <p className="text-slate-200 text-xl font-medium">
                  {content.trustedPartner?.outro || "You work on your thesis. We provide the guidance to help you understand how."}
                </p>
              </div>
            </FadeIn>'''
content = content.replace(old_outro, new_paragraphs)


# 2. Add Testimonials back in
testimonials_block = '''        {/* 6. TESTIMONIALS */}
        <section className="py-20 md:py-28 relative z-10 w-full overflow-hidden bg-[#02050e] border-y border-[#1e293b]" id="testimonials">
          <div className="w-full">
            <FadeIn>
              <div className="text-center mb-12 px-6">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                   Testimonials
                 </h2>
                 <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-5"></div>
                 <p className="text-slate-200 text-lg md:text-xl font-normal">
                   What Researchers Say About Our Guidance
                 </p>
              </div>
            </FadeIn>
            <div className="w-full relative mt-4">
               <ReviewCarousel reviews={content.reviews} />
            </div>
          </div>
        </section>

        {/* 7. FAQS */}'''

content = content.replace('        {/* 7. FAQS */}', testimonials_block)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
