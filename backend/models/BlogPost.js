class BlogPost {
  constructor({ id, title, slug, excerpt, content, category, funnel_stage, author, authorBio, date, image, featured, tags, readTime, views, comments, cta }) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.excerpt = excerpt;
    this.content = content;
    this.category = category;
    this.funnel_stage = funnel_stage;
    this.author = author;
    this.authorBio = authorBio;
    this.date = date;
    this.image = image;
    this.featured = featured;
    this.tags = tags;
    this.readTime = readTime;
    this.views = views;
    this.comments = comments;
    this.cta = cta;
  }
}

module.exports = BlogPost; 