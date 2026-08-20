const fs = require('fs');

const pathJson = 'src/data/content.json';
let jsonContent = JSON.parse(fs.readFileSync(pathJson, 'utf8'));

if (jsonContent.faqs && jsonContent.faqs.items && jsonContent.faqs.items.length > 0) {
  jsonContent.faqs.items[0].a = "WRIRK does not provide research writing services. We believe that every research work should remain the original intellectual contribution of its author.\\nWe provide Publication Assistance and Research Collaboration & Co-Authorship Support. Our experts help researchers identify suitable journals, assist with manuscript formatting according to journal guidelines, support journal communication, and guide them throughout the publication process.";
}

fs.writeFileSync(pathJson, JSON.stringify(jsonContent, null, 2));

console.log('Successfully updated the first FAQ answer');
