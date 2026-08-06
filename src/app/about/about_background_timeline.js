"use client";

import { useEffect, useState } from "react";

const timelineItems = [
  {
    image: "/assets/images/grad_pic.webp",
    alt: "Mana Azizsoltani in graduation regalia holding a mathematics diploma",
    caption: "I finished a BS in mathematics and MS in statistics to become a data scientist..."
  },
  {
    image: "/assets/images/phd_pic.webp",
    imageClass: "crop-left",
    alt: "Mana Azizsoltani speaking at UNLV commencement",
    caption: "... to later complete my PhD in hospitality and become a university professor..."
  },
  {
    image: "/assets/images/consultant_pic.webp",
    alt: "Mana Azizsoltani in Macau near integrated resort properties",
    caption: "... to become a consultant and help casinos better leverage data and AI."
  }
];

export default function AboutBackgroundTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const activeItem = timelineItems[activeIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % timelineItems.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [timerResetKey]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % timelineItems.length);
    setTimerResetKey((currentKey) => currentKey + 1);
  };

  return (
    <section className="about-background" aria-labelledby="about-background-title">
      <p className="eyebrow">Background</p>
      <h1 id="about-background-title">I am a trained data scientist and researcher-turned-consultant.</h1>

      <div className="background-timeline" style={{ "--timeline-active-offset": `${activeIndex * -100}%` }}>
        <div className="timeline-mobile-frame">
          <div className="timeline-photos">
            {timelineItems.map((item) => (
              <figure className="timeline-photo" key={item.caption}>
                <img className={item.imageClass || undefined} src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>

        <div className="timeline-arrow" aria-hidden="true">
          <svg className="timeline-arrow-piece" viewBox="0 0 1000 64" preserveAspectRatio="none" focusable="false">
            <polygon points="0,22 970,22 970,7 1000,32 970,57 970,42 0,42" />
          </svg>
        </div>

        <div className="timeline-mobile-caption-frame">
          <div className="timeline-captions">
            {timelineItems.map((item) => (
              <p key={item.caption}>{item.caption}</p>
            ))}
          </div>
        </div>

        <div className="timeline-mobile-controls" aria-label="About background slides">
          <div className="timeline-mobile-dots" aria-label="Choose a background slide">
            {timelineItems.map((item, index) => (
              <button
                aria-label={`Show slide ${index + 1}: ${item.caption}`}
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? "is-active" : ""}
                key={item.caption}
                onClick={() => goToSlide(index)}
                type="button"
              />
            ))}
          </div>
          <button className="timeline-mobile-next mobile-icon-button" onClick={goToNextSlide} type="button">
            <span>Next</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 12h13" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </button>
          <p className="sr-only" aria-live="polite">
            Showing {activeItem.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
