import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

old_paragraphs = '''            <FadeIn delay={200}>
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

new_designed_block = '''            <FadeIn delay={200}>
              <div className="max-w-4xl mx-auto mt-16 mb-10 p-8 md:p-12 bg-gradient-to-br from-[#0a152e] to-[#040a17] border border-cyan-500/20 rounded-3xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none"></div>
                
                {content.trustedPartner?.outro && (
                  <p className="text-slate-200 text-lg md:text-xl font-medium mb-6 relative z-10">
                    {content.trustedPartner.outro}
                  </p>
                )}
                
                {content.trustedPartner?.ctaText1?.value && (
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight relative z-10 [text-wrap:balance]">
                    {content.trustedPartner.ctaText1.value}
                  </h3>
                )}
                
                {content.trustedPartner?.ctaText2?.value && (
                  <p className="text-cyan-100/80 text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-3xl mx-auto relative z-10">
                    {content.trustedPartner.ctaText2.value}
                  </p>
                )}
                
                {content.trustedPartner?.ctaHeading?.value && (
                  <div className="inline-block px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold text-lg tracking-wide relative z-10 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    {content.trustedPartner.ctaHeading.value}
                  </div>
                )}
              </div>
            </FadeIn>'''

content = content.replace(old_paragraphs, new_designed_block)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
