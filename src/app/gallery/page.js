import GalleryStack from "@/components/GallerySection";

export const metadata = {
  title: "Gallery"
};

const galleries = [
  {
    title: "Sports Innovation Summit",
    body: "Las Vegas, Nevada. A sports, hospitality, and innovation event connected to the wider ecosystem around gaming, venues, and experiential business.",
    images: [
      "/assets/photos/sports2.jpg"
    ]
  },
  {
    title: "RIMS Gala",
    body: "Las Vegas, Nevada. A hospitality and student community event from the UNLV orbit, part of the teaching and mentorship side of the archive.",
    images: [
      "/assets/photos/RIMSgala1.jpg"
    ]
  },
  {
    title: "Menus",
    body: "Hospitality, food, and beverage notes from the places where teaching, travel, and professional curiosity overlap.",
    images: [
      "/assets/photos/menus22_3.jpg"
    ]
  },
  {
    title: "Teaching Statistics in Hospitality",
    body: "Las Vegas, Nevada. A Graduate & Professional Student Research Forum presentation on teaching statistics in hospitality.",
    images: [
      "/assets/photos/gradforum1.jpg"
    ]
  },
  {
    title: "Conference on Statistical Practice",
    body: "Sacramento, California. A statistics practice conference focused on applied methods, communication, and professional statistical work.",
    images: [
      "/assets/photos/csp_2020.jpeg"
    ]
  },
  {
    title: "GLI Regulator Roundtable",
    body: "Las Vegas, Nevada. A gaming regulation and responsible innovation forum connected to casino analytics, public policy, and industry practice.",
    images: [
      "/assets/photos/gli_regulator_roundtable.JPG"
    ]
  },
  {
    title: "Club de Convergentes",
    body: "Madrid, Spain. A gaming and AI governance presentation connected to translating research into industry conversation.",
    images: [
      "/assets/photos/CEOE_2025.jpg"
    ]
  },
  {
    title: "Cultural Diversity Foundation Educational Taste of Excellence",
    body: "Las Vegas, Nevada. A community and education event highlighting hospitality, culture, mentorship, and local connection.",
    images: [
      "/assets/photos/CDF23-2.jpg"
    ]
  },
  {
    title: "West Federation CHRIE",
    body: "A hospitality education and research conference connected to teaching, scholarship, and the CHRIE community.",
    images: [
      "/assets/photos/wfchrie_2023.jpeg"
    ]
  }
];

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Gallery</p>
      <h1>Gallery</h1>
      <p className="lede">
        A visual archive from research presentations, teaching, student leadership, travel, wine, hospitality, and community work.
      </p>

      <GalleryStack galleries={galleries} />
    </main>
  );
}
