export type ProductCategory =
  | "all"
  | "silver-idols"
  | "necklaces"
  | "artifacts"
  | "gemstone";

export interface Product {
  slug: string;
  name: string;
  category: Exclude<ProductCategory, "all">;
  categoryLabel: string;
  material: string;
  stones?: string;
  weight?: string;
  dimensions?: string;
  finish: string;
  image: string;
  images: string[];
  shortDesc: string;
  description: string;
  culturalNote: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "silver-ganesh-idol",
    name: "Auspicious Ganesha Idol",
    category: "silver-idols",
    categoryLabel: "Silver Idol",
    material: "92.5 Sterling Silver",
    stones: "Ruby eyes, Emerald accents",
    weight: "420g",
    dimensions: "15cm × 8cm × 7cm",
    finish: "High polish with oxidised detail",
    image: "/images/product-ganesh.jpg",
    images: ["/images/product-ganesh.jpg", "/images/category-statues.jpg"],
    shortDesc:
      "Hand-carved Ganesha idol in 92.5 sterling silver with ruby eyes and emerald accents.",
    description:
      "This magnificent Ganesha idol is meticulously hand-carved by master artisans in Patan, Nepal. Every curve of the deity's form — from the gentle curve of the trunk to the delicate lotus pedestal — is rendered with extraordinary precision using traditional repoussé techniques passed down across generations. The piece weighs 420 grams of 92.5 sterling silver and features ruby eyes that catch the light with a warm, devotional glow.",
    culturalNote:
      "Ganesha is revered as the remover of obstacles and the patron of arts, wisdom, and new beginnings. Placing a silver Ganesha at the entrance of a home or business is considered profoundly auspicious across South and Southeast Asia.",
    featured: true,
  },
  {
    slug: "lakshmi-devi-statue",
    name: "Goddess Lakshmi Statue",
    category: "silver-idols",
    categoryLabel: "Silver Idol",
    material: "Fine Silver (999)",
    stones: "Gold gilding, Coral accents",
    weight: "680g",
    dimensions: "22cm × 10cm × 9cm",
    finish: "Gold-gilded robes, polished face",
    image: "/images/product-lakshmi.jpg",
    images: ["/images/product-lakshmi.jpg", "/images/category-statues.jpg"],
    shortDesc:
      "Fine silver Lakshmi Devi in standing pose with gold-gilded robes and coral accents.",
    description:
      "Standing in the classic Abhaya mudra pose, this Lakshmi Devi statue is crafted from fine 999 silver with meticulous attention to every sacred iconographic detail. The four arms hold a lotus, a gold pot, and bestow blessings in the traditional manner. Her robes are rendered in gold gilding that contrasts beautifully with the luminous silver of her form. Coral accents adorn the crown and jewellery, adding warmth and devotional character.",
    culturalNote:
      "Lakshmi, the goddess of wealth, fortune, and prosperity, is among the most widely venerated deities in Hinduism. Silver Lakshmi idols are traditional gifts at weddings, housewarming ceremonies, and Diwali celebrations.",
    featured: true,
  },
  {
    slug: "lapis-lazuli-necklace",
    name: "Lapis Lazuli Royal Necklace",
    category: "necklaces",
    categoryLabel: "Necklace",
    material: "Gold-plated Sterling Silver",
    stones: "Natural Lapis Lazuli, Seed Pearls",
    weight: "85g",
    dimensions: "46cm length, pendant 4cm",
    finish: "22K gold plating",
    image: "/images/category-necklace.jpg",
    images: ["/images/category-necklace.jpg"],
    shortDesc:
      "22K gold-plated sterling silver necklace with deep blue lapis lazuli and seed pearls.",
    description:
      "A statement of timeless elegance, this necklace features hand-set natural lapis lazuli stones in a traditional Nepali filigree setting, plated in luxurious 22K gold. The deep celestial blue of the lapis contrasts magnificently against the warm gold metalwork. Seed pearls are interspersed along the chain, adding a soft, luminous counterpoint. Each stone is individually selected for depth of colour and minimal matrix.",
    culturalNote:
      "Lapis lazuli has been treasured since antiquity along the Silk Road and Himalayan trade routes. In Tibetan and Nepali tradition, it is associated with healing, truth, and the heavens.",
    featured: true,
  },
  {
    slug: "silver-repousse-bowl",
    name: "Repousse Silver Offering Bowl",
    category: "artifacts",
    categoryLabel: "Artifact",
    material: "92.5 Sterling Silver",
    weight: "310g",
    dimensions: "Ø 18cm × 7cm deep",
    finish: "Semi-polished with oxidised relief",
    image: "/images/category-artifacts.jpg",
    images: ["/images/category-artifacts.jpg"],
    shortDesc:
      "Hand-hammered sterling silver bowl with intricate repousse floral and deity motifs.",
    description:
      "Crafted using the ancient repoussé technique — hammering and shaping silver from the reverse side — this ceremonial offering bowl features a continuous frieze of lotus flowers, sacred geometry, and miniature deity portraits around its exterior. The interior is smooth and highly polished, while the exterior relief work is partially oxidised to throw the design into dramatic relief. A centrepiece of Himalayan metalwork tradition.",
    culturalNote:
      "Silver offering bowls (known as torma bowls in Tibetan tradition and offering dishes in Hindu practice) are used in daily puja rituals to present water, rice, flowers, or incense to the deities. This piece is equally at home as a collector's object or an active devotional item.",
    featured: false,
  },
  {
    slug: "silver-buddha-statue",
    name: "Meditating Buddha Statue",
    category: "silver-idols",
    categoryLabel: "Silver Idol",
    material: "92.5 Sterling Silver",
    stones: "Turquoise inlays",
    weight: "520g",
    dimensions: "18cm × 12cm × 10cm",
    finish: "Brushed silver with polished face",
    image: "/images/category-statues.jpg",
    images: ["/images/category-statues.jpg", "/images/product-ganesh.jpg"],
    shortDesc:
      "Sterling silver meditating Buddha in dhyana mudra with turquoise stone inlays.",
    description:
      "Seated in the dhyana mudra — hands resting in the lap in perfect meditative repose — this Buddha statue radiates serenity. Crafted from 92.5 sterling silver with a brushed finish that evokes the texture of stone, the figure's face is polished to a high shine, drawing the eye to its tranquil expression. Turquoise stones are inlaid into the elaborate crown and robe border, connecting the piece to the Himalayan heritage of the material.",
    culturalNote:
      "The meditating Buddha posture represents the state of deep contemplation in which the historical Buddha achieved enlightenment. Silver Buddha statues are prized across Buddhist communities in Nepal, Tibet, and internationally as objects of veneration and meditation.",
    featured: false,
  },
  {
    slug: "coral-silver-necklace",
    name: "Coral & Silver Heritage Necklace",
    category: "necklaces",
    categoryLabel: "Necklace",
    material: "Sterling Silver",
    stones: "Natural Red Coral, Turquoise",
    weight: "92g",
    dimensions: "50cm length",
    finish: "Antique oxidised silver",
    image: "/images/category-necklace.jpg",
    images: ["/images/category-necklace.jpg"],
    shortDesc:
      "Traditional Nepali necklace in oxidised silver with natural red coral and turquoise stones.",
    description:
      "Inspired by traditional Nepali jewellery worn during festivals and ceremonies, this bold necklace features natural red coral and turquoise stones set in oxidised sterling silver. The antique finish gives the piece an authentically aged character — as if it carries within it centuries of celebration. The central pendant features a goddess medallion surrounded by alternating coral and turquoise roundels.",
    culturalNote:
      "The combination of red coral and turquoise in Himalayan jewellery carries deep symbolic meaning — coral represents life force and protection, while turquoise is believed to bring good fortune and ward off negative energies.",
    featured: false,
  },
  {
    slug: "saraswati-idol",
    name: "Goddess Saraswati Idol",
    category: "silver-idols",
    categoryLabel: "Silver Idol",
    material: "92.5 Sterling Silver",
    stones: "Pearl accents",
    weight: "390g",
    dimensions: "17cm × 8cm × 7cm",
    finish: "High polish",
    image: "/images/category-statues.jpg",
    images: ["/images/category-statues.jpg"],
    shortDesc:
      "Sterling silver Saraswati idol with veena, seated on lotus, with pearl accents.",
    description:
      "The goddess of knowledge, music, and the arts is rendered here in gleaming sterling silver with remarkable iconographic faithfulness. Saraswati is shown holding the veena (a classical stringed instrument), a manuscript, and a lotus, while a swan — her vehicle — is depicted at her feet. Pearl accents are placed along her crown and jewellery, symbolising purity and wisdom. Every element is hand-finished by master artisans.",
    culturalNote:
      "Saraswati is invoked at the start of educational journeys, artistic endeavours, and academic examinations. Silver Saraswati idols are particularly valued by students, scholars, musicians, and writers worldwide.",
    featured: true,
  },
  {
    slug: "silver-incense-holder",
    name: "Lotus Incense Holder Set",
    category: "artifacts",
    categoryLabel: "Artifact",
    material: "92.5 Sterling Silver",
    weight: "180g (set of 3)",
    dimensions: "8cm × 3cm each",
    finish: "Polished with engraved detail",
    image: "/images/category-artifacts.jpg",
    images: ["/images/category-artifacts.jpg"],
    shortDesc:
      "Set of three sterling silver lotus incense holders with engraved mandala base.",
    description:
      "This set of three incense holders is fashioned in the form of opening lotus blossoms, each petal delicately shaped and the base engraved with a concentric mandala pattern. The silver surface is highly polished to reflect the glowing ember of incense sticks, creating a meditative visual effect. Sold as a set, they are designed to be arranged in a triangular formation for ritual use.",
    culturalNote:
      "Incense is burned in temples and homes throughout South Asia as an offering to the divine and a purifier of sacred space. Silver incense holders elevate this daily ritual into an act of devotion through beauty.",
    featured: false,
  },
  {
    slug: "turquoise-silver-pendant",
    name: "Turquoise Silver Pendant",
    category: "gemstone",
    categoryLabel: "Gemstone",
    material: "Sterling Silver",
    stones: "Natural Turquoise (Tibetan)",
    weight: "28g",
    dimensions: "Pendant 5cm × 3cm",
    finish: "Antique oxidised",
    image: "/images/category-necklace.jpg",
    images: ["/images/category-necklace.jpg"],
    shortDesc:
      "Oxidised silver pendant with large natural Tibetan turquoise stone and filigree border.",
    description:
      "A large piece of natural Tibetan turquoise — with its characteristic matrix of brown veining — is framed in an elaborate oxidised silver setting with hand-crafted filigree border work. The pendant hangs on an adjustable sterling silver chain. Each stone is entirely unique, making every piece one-of-a-kind. The turquoise used in this piece is sourced directly from traditional Tibetan mining regions.",
    culturalNote:
      "Tibetan turquoise is among the most prized varieties of turquoise in the world, distinguished by its rich sky-blue hue and characteristic brown matrix. It has been used in Himalayan jewellery and ritual objects for over 1,000 years.",
    featured: false,
  },
  {
    slug: "shiva-nataraja-statue",
    name: "Shiva Nataraja Dancing Lord",
    category: "silver-idols",
    categoryLabel: "Silver Idol",
    material: "Fine Silver (999)",
    stones: "Sapphire accents",
    weight: "850g",
    dimensions: "28cm × 22cm × 8cm",
    finish: "High polish with flame ring",
    image: "/images/product-ganesh.jpg",
    images: ["/images/product-ganesh.jpg", "/images/category-statues.jpg"],
    shortDesc:
      "Large fine silver Nataraja with cosmic dance pose, flame ring, and sapphire accents.",
    description:
      "The largest and most elaborate piece in our collection, this Nataraja captures Lord Shiva in his cosmic dance of creation and destruction. The intricate flame ring (prabhamandala) encircles the dancing form with exquisite individual flames, each separately shaped and attached by hand. Four arms hold the drum of creation, fire of destruction, the gesture of protection, and point to the lifted foot of liberation. Sapphire accents are set into the crown and earrings.",
    culturalNote:
      "The Nataraja is one of the most recognised and cosmologically profound images in world art. It represents the five cosmic acts of Shiva: creation, sustenance, dissolution, concealment, and liberation. It has been collected by major museums worldwide as a masterpiece of Hindu iconography.",
    featured: true,
  },
  {
    slug: "silver-ceremonial-box",
    name: "Filigree Ceremonial Silver Box",
    category: "artifacts",
    categoryLabel: "Artifact",
    material: "Sterling Silver",
    stones: "Turquoise cabochon lid",
    weight: "240g",
    dimensions: "12cm × 8cm × 5cm",
    finish: "Filigree wirework, polished",
    image: "/images/category-artifacts.jpg",
    images: ["/images/category-artifacts.jpg"],
    shortDesc:
      "Sterling silver keepsake box with intricate filigree wirework and turquoise lid cabochon.",
    description:
      "This exquisite keepsake box showcases the ancient Nepali art of silver filigree — twisted fine silver wire soldered into intricate open-work patterns over a solid silver base. The lid features a large turquoise cabochon at its centre, framed by concentric filigree rings. Interior is lined with gold-leaf paper. Used traditionally to store sacred items, precious jewellery, or as a wedding gift.",
    culturalNote:
      "Silver filigree boxes from Patan and Kathmandu Valley are among the most sophisticated expressions of Himalayan metalwork. The craft requires years of apprenticeship and represents an unbroken artistic tradition stretching back to the Licchavi period.",
    featured: false,
  },
  {
    slug: "gold-plated-durga-idol",
    name: "Goddess Durga Mahishasura Mardini",
    category: "silver-idols",
    categoryLabel: "Silver Idol",
    material: "92.5 Sterling Silver",
    stones: "Ruby, Coral, Turquoise",
    weight: "720g",
    dimensions: "24cm × 14cm × 10cm",
    finish: "Gold-gilded armour, polished face",
    image: "/images/product-lakshmi.jpg",
    images: ["/images/product-lakshmi.jpg", "/images/category-statues.jpg"],
    shortDesc:
      "Majestic gold-gilded Durga Mahishasura Mardini with ten arms, ruby, coral and turquoise stones.",
    description:
      "Depicted in her fierce warrior aspect as Mahishasura Mardini — slayer of the buffalo demon — this Durga idol stands as the most dramatic statement piece in our collection. Ten arms fan out bearing traditional weapons and sacred objects, each hand gesture (mudra) rendered with precise iconographic accuracy. The armour and crown are gold-gilded; the face, arms and lotus base remain in polished silver. A ruby sits at the third eye, coral adorns the crown, and turquoise stones line the weapon handles.",
    culturalNote:
      "Durga as Mahishasura Mardini is the principal image of Navratri, the nine-night festival celebrating the triumph of divine feminine power. This idol form is particularly revered in Nepal, West Bengal, and throughout the Hindu diaspora worldwide.",
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(
  slug: string,
  category: ProductCategory,
  limit = 3
): Product[] {
  return products
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export const categoryLabels: Record<Exclude<ProductCategory, "all">, string> = {
  "silver-idols": "Silver Idols",
  necklaces: "Necklaces",
  artifacts: "Cultural Artifacts",
  gemstone: "Gemstone Pieces",
};
