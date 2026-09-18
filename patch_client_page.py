import re

with open("src/app/ClientPage.tsx", "r") as f:
    content = f.read()

# 1. Fix whyTrustUs Grid Layout (6 items)
content = content.replace(
    'className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-12"',
    'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12"'
)

# 2. Fix trustedPartner (What is Thesis Guidance?) Layout (5 items symmetry)
old_trusted_partner_grid = '''            {/* 6 Feature Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.trustedPartner?.features?.map((feat: ContentItem, idx: number) => {
                const IconComponent = getIcon(feat.icon, ShieldCheck);
                return (
                  <FadeIn key={idx} delay={idx * 40}>
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-6 md:p-7 rounded-2xl hover:bg-[#0c1834] transition-all duration-300 group shadow-lg">
                      <div className="w-12 h-12 rounded-xl bg-[#09152a] border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 stroke-[1.75]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors [text-wrap:balance]">
                        {feat.title}
                      </h3>
                      <p className="text-slate-300 text-sm font-normal leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>'''

new_trusted_partner_grid = '''            {/* 5 Guidance Pillars */}
            {content.trustedPartner?.features && (
              <div className="flex flex-wrap justify-center gap-6 mb-14">
                {content.trustedPartner.features.map((pillar: ContentItem, idx: number) => (
                  <FadeIn 
                    key={idx} 
                    delay={idx * 50}
                    className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm flex"
                  >
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-6 sm:p-7 rounded-2xl flex flex-col justify-between w-full h-full shadow-md group hover:bg-[#0c1834] transition-all duration-300">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-sm mb-4 group-hover:scale-110 transition-transform">
                          0{pillar.step || idx + 1}
                        </div>
                        <h3 className="text-xl font-extrabold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-300 text-sm font-normal leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
            
            <FadeIn delay={200}>
              <div className="text-center mt-10 mb-14">
                <p className="text-slate-200 text-xl font-medium">
                  {content.trustedPartner?.outro || "You work on your thesis. We provide the guidance to help you understand how."}
                </p>
              </div>
            </FadeIn>'''

content = content.replace(old_trusted_partner_grid, new_trusted_partner_grid)

# Add missing sections: whyChoose and whoCanBenefit
missing_sections = '''        {/* WHY CHOOSE WRIRK? */}
        <section className="py-20 md:py-28 px-6 relative z-10" id="why-choose">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight [text-wrap:balance]">
                  {content.whyChoose?.heading || "Why Choose WRIRK?"}
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-6"></div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.whyChoose?.reasons?.map((reason: ContentItem, idx: number) => {
                const IconComponent = getIcon(reason.icon, CheckCircle);
                return (
                  <FadeIn key={idx} delay={idx * 50}>
                    <div className="bg-[#070e1e]/80 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-7 rounded-2xl hover:bg-[#0c1834] transition-all duration-300 h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-extrabold text-white [text-wrap:balance]">
                          {reason.title}
                        </h3>
                      </div>
                      <p className="text-slate-300 text-base font-normal leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHO CAN BENEFIT? */}
        <section className="py-20 md:py-28 px-6 relative z-10 bg-[#02050e] border-y border-[#1e293b]" id="who-can-benefit">
          <div className="max-w-6xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                {content.whoCanBenefit?.heading || "Who Can Benefit?"}
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.9)] mb-8"></div>
              <p className="text-slate-200 text-xl font-normal mb-12">
                {content.whoCanBenefit?.intro || "Thesis Guidance can help:"}
              </p>
            </FadeIn>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {content.whoCanBenefit?.audiences?.map((audience: string, idx: number) => (
                <FadeIn key={idx} delay={idx * 40}>
                  <div className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-[#081226] border border-[#1e293b] text-white font-bold text-lg shadow-md hover:border-cyan-400 hover:text-cyan-300 transition-colors">
                    {audience}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}'''

content = content.replace('{/* 6. TESTIMONIALS */}', missing_sections)

# Also need to add interfaces to SiteContent in ClientPage.tsx if needed
interface_patch_str = '''
  whyChoose?: {
    heading?: string;
    reasons?: ContentItem[];
  };
  whoCanBenefit?: {
    heading?: string;
    intro?: string;
    audiences?: string[];
  };
'''

# Find the SiteContent interface end (or add before reviews?: ContentItem[])
content = content.replace(
    '  reviews?: ContentItem[];',
    f'{interface_patch_str}\n  reviews?: ContentItem[];'
)

# And add `outro?: string;` to trustedPartner
content = content.replace(
    '  trustedPartner?: {',
    '  trustedPartner?: {\n    outro?: string;'
)

with open("src/app/ClientPage.tsx", "w") as f:
    f.write(content)

