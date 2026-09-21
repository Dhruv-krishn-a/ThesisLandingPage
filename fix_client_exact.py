import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

# Remove faqs description
content = content.replace('''                {content.faqs?.description && (
                  <p className="text-slate-300 text-base md:text-lg">
                    {Array.isArray(content.faqs.description) ? content.faqs.description.map((p: { value: string }) => p.value).join(' ') : content.faqs.description.value}
                  </p>
                )}''', "")

# Add ourPhilosophy below FAQs and above FINAL CTA
our_philosophy_block = '''        </section>

        {/* OUR PHILOSOPHY */}
        {content.ourPhilosophy?.tagline && (
          <section className="py-20 px-6 relative z-10 bg-[#02050e] border-y border-[#1e293b]" id="our-philosophy">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-cyan-200 leading-relaxed [text-wrap:balance]">
                  {content.ourPhilosophy.tagline}
                </p>
              </FadeIn>
            </div>
          </section>
        )}

        {/* 8. FINAL CTA */}'''

content = content.replace('        </section>\n\n        {/* 8. FINAL CTA */}', our_philosophy_block)

# Add ourPhilosophy to SiteContent Interface
if 'ourPhilosophy?: {' not in content:
    content = content.replace(
        '  reviews?: GoogleReview[];',
        '  ourPhilosophy?: { tagline?: string; };\n  reviews?: GoogleReview[];'
    )

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
