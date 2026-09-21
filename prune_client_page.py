import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

# 1. Remove Testimonials section
testimonials_regex = re.compile(r'\{\/\* 6\. TESTIMONIALS \*\/}.*?<\/section>', re.DOTALL)
content = testimonials_regex.sub('', content)

# 2. Re-format Final CTA to ONLY keep the form centered
old_final_cta_regex = re.compile(r'\{\/\* 8\. FINAL CTA \*\/}.*?<\/section>', re.DOTALL)

new_final_cta = '''        {/* FINAL CTA (FORM ONLY) */}
        <section className="pt-20 pb-40 md:pt-28 md:pb-64 px-6 relative z-10 overflow-hidden" id="final-cta">
          <FadeIn>
            <div id="final-cta-card-box" className="max-w-2xl mx-auto bg-gradient-to-r from-[#060c19] via-[#0f192e] to-[#060c19] border-2 border-cyan-500/40 rounded-3xl p-9 md:p-14 relative shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
              <div id="bottom-cta-card">
                <h3 className="text-2xl font-extrabold text-white mb-6 text-center border-b border-white/10 pb-4">Get Thesis Guidance</h3>
                <SharedForm 
                  formId="bottom-cta" 
                  buttonText={content.hero?.button1?.value || "Get Thesis Guidance"} 
                  initialMessage={selectedModuleMessage}
                />
              </div>
            </div>
          </FadeIn>
        </section>'''

content = old_final_cta_regex.sub(new_final_cta, content)

# 3. Remove hero tag, trust badges, and floating icons from Hero
# Remove tag:
content = re.sub(r'\{\/\* Tag \*\/}.*?<\/div>\s*<\/div>\s*<\/div>', '', content, flags=re.DOTALL)

# Remove trust badges:
content = re.sub(r'\{\/\* Trust Badges \*\/}.*?<\/div>\s*<\/div>', '', content, flags=re.DOTALL)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
