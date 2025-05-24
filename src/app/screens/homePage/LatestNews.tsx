import { Box, Container } from "@mui/material";

export function LatestNews() {
  const articles = [
    {
      img: "/img/Aline_Zanette_A_bottle_of_lavender_perfume_on_the_water_at_dusk_91fa4d71-345e-4861-a119-16cabf95b3e1 1.png",
      title:
        "The Soothing Symphony of Lavender Perfumes: Unlocking the Secrets of a Fragrant Elixir",
      content:
        "Lavender, with its enchanting aroma and rich history, has been cherished for centuries as a symbol of relaxation, healing, and timeless beauty. In the world of perfumery, lavender plays a key role in creating captivating fragrances loved by many.",
    },
    {
      img: "/img/dartistana_create_a_professional_product_shoot_of_3_perfume_bot_3e6bf181-e7e3-410a-96fa-977eb5e88c24 1.png",
      title:
        "The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories",
      content:
        "A luxury perfume collection is not just an assortment of fragrances; it is a reflection of one's taste, personality, and experiences. Each bottle holds a unique olfactory journey, crafted with the finest ingredients and artistic mastery.",
    },
    {
      img: "/img/doobedoobedoob_small_perfume_bottle_on_the_seabed_seabed_with_o_45d934f2-1dfe-497d-8737-1408ac546cd2 1.png",
      title:
        "The Timeless Elegance of Rose Perfumes: Unveiling the Queen of Flowers in Fragrance",
      content:
        "Rose, often referred to as the 'Queen of Flowers,' has held a special place in human culture and history for centuries. Beyond its captivating beauty, this iconic bloom has also inspired perfumers to create some of the most timeless and exquisite fragrances in the world.",
    },
  ];

  return (
    <Container className="news-container homepage">
      <Box className="news-title">Latest News</Box>
      <Box className="articles-grid">
        {articles.map((article, idx) => (
          <Box className="article" key={idx}>
            <img src={article.img} alt={article.title} />
            <Box className="article-header">{article.title}</Box>
            <Box className="article-content">{article.content}</Box>
            <Box className="read-more">
              <p>Read more</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default LatestNews;
