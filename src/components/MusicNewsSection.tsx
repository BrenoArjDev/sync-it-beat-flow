import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, Heart, MessageSquare, Filter } from "lucide-react";
import { newsItems } from "@/utils/newsMock";

const countries = ["All", "BR", "PT", "US", "CA", "CN", "JP"];

const countryLangMap: Record<string, string> = {
  BR: "pt",
  PT: "pt",
  US: "en",
  CA: "en",
  CN: "zh",
  JP: "ja",
  All: "en",
};

const categories = [
  "All",
  "Rock",
  "Pop",
  "K-Pop",
  "Latin",
  "Electronic",
  "Hip-Hop",
];

export interface NewsApiResponse {
  totalArticles: number;
  articles: NewsArticle[];
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string; // ISO string format
  source: NewsSource;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
}

export const MusicNewsSection = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const API_KEY = "d7262b70de56f32c36177287eed8325a";

  const fetchNews = async (country: string, category: string) => {
    setLoading(true);
    const lang = countryLangMap[country] || "en";
    const query =
      category === "All" ? "music" : `${category.toLowerCase()} music`;
    const params = new URLSearchParams({
      token: API_KEY,
      q: query,
      lang: lang,
    });
    if (country !== "All") params.set("country", country.toLowerCase());

    try {
      const res = await fetch(`https://gnews.io/api/v4/search?${params}`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error(err);
      setNews(newsItems); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchNews(selectedCountry, selectedCategory);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedCountry, selectedCategory]);

  return (
    <section id="news" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest music news from around the world, all
            in one place
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setFiltersOpen((prev) => !prev)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              filtersOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {countries.map((country) => (
                <Badge
                  key={country}
                  variant={
                    selectedCountry === country ? "default" : "secondary"
                  }
                  className="cursor-pointer hover:bg-primary transition-smooth"
                  onClick={() => setSelectedCountry(country)}
                >
                  <Globe className="w-3 h-3 mr-1" />
                  {country}
                </Badge>
              ))}
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className="cursor-pointer hover:bg-primary hover:text-white transition-smooth"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-muted-foreground my-8">
            Loading news…
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer"
              onClick={() => window.open(item.url, "_blank")}
            >
              <div className="relative">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  {new Date(item.publishedAt).toLocaleString()}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-primary transition-smooth">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.description || item.content || ""}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div 
                      className="flex items-center gap-1 hover:text-music-pink transition-smooth cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle like functionality here if needed
                      }}
                    >
                      <Heart className="w-4 h-4" />0
                    </div>
                    <div 
                      className="flex items-center gap-1 hover:text-music-blue transition-smooth cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle comment functionality here if needed
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />0
                    </div>
                  </div>
                  <div className="text-sm text-primary font-medium group-hover:text-white transition-smooth">
                    Read More →
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
