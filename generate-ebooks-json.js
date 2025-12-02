// Improved Node.js script to automate ebook JSON generation with smarter categorization
const fs = require('fs');
const path = require('path');

const EBOOKS_DIR = path.join(__dirname, 'ebooks');
const CONTENT_JSON = path.join(__dirname, 'data', 'content.json');

// Expanded and prioritized keyword/phrase lists for each category
const CATEGORY_RULES = [
  {
    category: 'digital-marketing',
    keywords: [
      'digital marketing', 'marketing', 'seo', 'content marketing', 'social media', 'advertising', 'campaign', 'analytics', 'branding', 'growth marketing', 'online marketing', 'web marketing', 'email marketing', 'ppc', 'conversion', 'lead generation', 'google ads', 'facebook ads', 'instagram', 'linkedin', 'twitter', 'automation', 'strategy', 'template', 'checklist', 'tools', 'web', 'website', 'ecommerce', 'store', 'sales', 'conversion', 'customer', 'client', 'advert', 'dashboard', 'data studio', 'data', 'studio', 'dashboard'
    ]
  },
  {
    category: 'business',
    keywords: [
      'business', 'entrepreneur', 'sales', 'management', 'finance', 'leadership', 'company', 'profit', 'startup', 'organization', 'team', 'client', 'consulting', 'plan', 'accounting', 'wealth', 'money', 'work', 'career', 'negotiation', 'network', 'networking', 'billionaire', 'import', 'export', 'store', 'cash', 'brand', 'consulting', 'plan', 'accounting', 'wealth', 'profit', 'success', 'money', 'work', 'career', 'negotiation', 'network', 'networking', 'billionaire', 'import', 'export', 'store', 'cash', 'profit'
    ]
  },
  {
    category: 'motivational',
    keywords: [
      'motivate', 'motivation', 'motivational', 'habits', 'success', 'achieve', 'achievement', 'mindset', 'discipline', 'power', 'confidence', 'resilience', 'unstoppable', 'winning', 'win', 'forward', 'drive', 'grit', 'overcome', 'goal', 'obsessed', 'average', 'giant', 'miracle', 'procrastination', 'self-discipline', 'self help', 'self-help', 'self improvement', 'personal growth', 'mental', 'emotional', 'life', 'change', 'happiness', 'growth', 'self control', 'self-control', 'self development', 'self-development'
    ]
  },
  {
    category: 'self-help',
    keywords: [
      'self help', 'self-help', 'self improvement', 'personal growth', 'happiness', 'mental', 'emotional', 'life', 'change', 'self control', 'self-control', 'self development', 'self-development', 'therapy', 'psychology', 'wellness', 'healing', 'confidence', 'mindfulness', 'meditation', 'emotional intelligence', 'positive', 'gratitude', 'belief', 'beliefs', 'purpose', 'soul', 'spiritual', 'wisdom', 'present', 'soulful', 'awakening', 'giant', 'discipline', 'self-help', 'gratitude', 'miracle', 'procrastination', 'motivation', 'motivating', 'motivational'
    ]
  },
  {
    category: 'inspirational',
    keywords: [
      'inspire', 'inspiration', 'greatness', 'purpose', 'dream', 'vision', 'giftsofimperfection', 'courage', 'meaning', 'awareness', 'perfect', 'gratitude', 'happiness', 'mindset', 'discipline', 'self', 'confidence', 'grit', 'remembrance', 'humility', 'meditation', 'spiritual', 'wisdom', 'life-changing', 'present', 'belief', 'beliefs', 'awakening', 'giant', 'power', 'success', 'discipline', 'self-help', 'gratitude', 'miracle', 'procrastination', 'motivation', 'motivating', 'motivational'
    ]
  }
];

// Priority order for categories
const CATEGORY_PRIORITY = [
  'digital-marketing',
  'business',
  'motivational',
  'self-help',
  'inspirational',
  'other'
];

// Guess category based on filename using improved logic
function guessCategory(filename) {
  const lower = filename.toLowerCase();
  let matchedCategories = [];
  for (const rule of CATEGORY_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        matchedCategories.push(rule.category);
        break;
      }
    }
  }
  if (matchedCategories.length === 0) return 'other';
  // Return the highest priority category
  for (const cat of CATEGORY_PRIORITY) {
    if (matchedCategories.includes(cat)) return cat;
  }
  return matchedCategories[0] || 'other';
}

function titleFromFilename(filename) {
  // Remove extension and replace dashes/underscores with spaces, capitalize words
  return path.basename(filename, path.extname(filename))
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generateEbookEntry(file) {
  const category = guessCategory(file);
  return {
    id: file.replace(/\.[^/.]+$/, ''),
    title: titleFromFilename(file),
    description: '', // You can manually fill this later
    category,
    pages: '', // Optional: can be filled manually
    downloads: '', // Optional: can be filled manually
    price: 'Free',
    badge: '',
    image: '',
    file: `ebooks/${file}`
  };
}

function main() {
  // Read all PDF files in ebooks folder
  const files = fs.readdirSync(EBOOKS_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));
  const newEbooks = files.map(generateEbookEntry);

  // Read and parse content.json
  const content = JSON.parse(fs.readFileSync(CONTENT_JSON, 'utf8'));
  // Filter out old ebook entries that reference the ebooks folder
  const existingEbooks = (content.ebooks || []).filter(e => !e.file || !e.file.startsWith('ebooks/'));
  // Merge
  content.ebooks = [...existingEbooks, ...newEbooks];

  // Write back
  fs.writeFileSync(CONTENT_JSON, JSON.stringify(content, null, 2));
  console.log(`Updated content.json with ${newEbooks.length} ebooks from folder.`);
}

main(); 