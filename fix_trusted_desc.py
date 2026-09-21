import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

old_heading_block = '''              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.trustedPartner?.heading?.value || "What Is Thesis Guidance?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
              </div>
            </FadeIn>'''

new_heading_block = '''              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.trustedPartner?.heading?.value || "What Is Thesis Guidance?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
                {content.trustedPartner?.description && (
                  <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed mt-6">
                    {Array.isArray(content.trustedPartner.description) ? content.trustedPartner.description.map((p: { value: string }) => p.value).join(' ') : content.trustedPartner.description.value}
                  </p>
                )}
              </div>
            </FadeIn>'''

content = content.replace(old_heading_block, new_heading_block)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)
