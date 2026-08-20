const fs = require('fs');

let content = fs.readFileSync('src/app/ClientPage.tsx', 'utf8');

// Replace function signature
content = content.replace(
  "export default function Home() {",
  `export default function ClientPage({ initialContent }: { initialContent: any }) {
  const content = initialContent;
`
);

// Delete old hardcoded arrays and replace with mapped arrays
const startMarker = "// --- DATA ARRAYS ---";
const endMarker = "export default function ClientPage";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const mappedArrays = `// --- DYNAMIC DATA ARRAYS ---
  const faqs = content.faqs.items;
  const processSteps = content.process.steps;
  const googleReviews = content.reviews;

  const whyPublicationsMatter = [
    { title: content.whyTrustUs.features[0].title, desc: content.whyTrustUs.features[0].description, icon: TrendingUp },
    { title: content.whyTrustUs.features[1].title, desc: content.whyTrustUs.features[1].description, icon: Globe },
    { title: content.whyTrustUs.features[2].title, desc: content.whyTrustUs.features[2].description, icon: Award },
    { title: content.whyTrustUs.features[3].title, desc: content.whyTrustUs.features[3].description, icon: BookOpen },
  ];

  const trustCards = [
    { title: content.trustedPartner.features[0].title, desc: content.trustedPartner.features[0].description, icon: ShieldCheck },
    { title: content.trustedPartner.features[1].title, desc: content.trustedPartner.features[1].description, icon: Users },
    { title: content.trustedPartner.features[2].title, desc: content.trustedPartner.features[2].description, icon: FileCheck2 },
    { title: content.trustedPartner.features[3].title, desc: content.trustedPartner.features[3].description, icon: Activity },
    { title: content.trustedPartner.features[4].title, desc: content.trustedPartner.features[4].description, icon: BookOpen },
    { title: content.trustedPartner.features[5].title, desc: content.trustedPartner.features[5].description, icon: ArrowRight },
  ];

  const services = [
    {
      id: 'writing-pub',
      title: content.services.cards[0].title,
      desc: content.services.cards[0].desc,
      icon: PenTool,
      glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:border-cyan-400',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'publication',
      title: content.services.cards[1].title,
      desc: content.services.cards[1].desc,
      icon: Send,
      glow: 'hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] active:shadow-[0_0_15px_rgba(129,140,248,0.6)] hover:border-indigo-400',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'co-authorship',
      title: content.services.cards[2].title,
      desc: content.services.cards[2].desc,
      icon: Users,
      glow: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] active:shadow-[0_0_15px_rgba(52,211,153,0.6)] hover:border-emerald-400',
      iconColor: 'text-emerald-400',
    },
  ];

`;
  
  // However, I need to insert these INSIDE the component because they depend on `content` prop!
  // Wait, if I put them inside the component, they get recreated every render. That's fine.
  
  // So I'll delete the hardcoded arrays outside the component
  content = content.substring(0, startIndex) + content.substring(endIndex);
  
  // And inject them inside the component right after `const content = initialContent;`
  content = content.replace(
    "const content = initialContent;",
    "const content = initialContent;\n" + mappedArrays
  );
}

fs.writeFileSync('src/app/ClientPage.tsx', content);
