const timelineItems = [
  {
    image: "/assets/images/grad_pic.jpeg",
    alt: "Mana Azizsoltani in graduation regalia holding a mathematics diploma",
    caption: "I finished a BS in mathematics and MS in statistics to become a data scientist..."
  },
  {
    image: "/assets/images/phd_pic.jpg",
    imageClass: "crop-left",
    alt: "Mana Azizsoltani speaking at UNLV commencement",
    caption: "... to later complete doctoral work in hospitality and teach at the university level..."
  },
  {
    image: "/assets/images/consultant_pic.jpeg",
    alt: "Mana Azizsoltani in Macau near integrated resort properties",
    caption: "... to become a consultant helping casinos turn data and AI into better decisions."
  }
];

export default function AboutBackgroundTimeline() {
  return (
    <section className="about-background" aria-labelledby="about-background-title">
      <p className="eyebrow">Background</p>
      <h1 id="about-background-title">I am a trained data scientist and researcher-turned-consultant.</h1>

      <div className="background-timeline">
        <div className="timeline-photos">
          {timelineItems.map((item) => (
            <figure className="timeline-photo" key={item.caption}>
              <img className={item.imageClass || undefined} src={item.image} alt={item.alt} />
            </figure>
          ))}
        </div>

        <div className="timeline-arrow" aria-hidden="true">
          <span />
        </div>

        <div className="timeline-captions">
          {timelineItems.map((item) => (
            <p key={item.caption}>{item.caption}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
