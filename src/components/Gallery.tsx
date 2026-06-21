"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface GalleryProps {
  title?: string;
  description?: string;
  items?: GalleryItem[];
}

// Brand case-study carousel. Images are placeholders — swap with real ones.
const defaultItems: GalleryItem[] = [
  {
    id: "logistics",
    title: "Logistics: 340 hours saved per month",
    description:
      "Automated dispatch, status updates, and data entry across a 40-person operations team.",
    href: "#",
    image: "https://placehold.co/720x405/4F7CFF/FFFFFF/png?text=Logistics",
  },
  {
    id: "healthcare",
    title: "Healthcare: 94% faster lead response",
    description:
      "Voice agent qualifies and books patients in under 90 seconds, day or night.",
    href: "#",
    image: "https://placehold.co/720x405/6E97FF/FFFFFF/png?text=Healthcare",
  },
  {
    id: "realestate",
    title: "Real Estate: $218k revenue recovered",
    description:
      "Plugged three revenue leaks across follow-ups, intake, and scheduling.",
    href: "#",
    image: "https://placehold.co/720x405/3F6BF0/FFFFFF/png?text=Real+Estate",
  },
  {
    id: "saas",
    title: "SaaS: onboarding fully automated",
    description:
      "New customers provisioned, emailed, and routed without a human touch.",
    href: "#",
    image: "https://placehold.co/720x405/86ABFF/FFFFFF/png?text=SaaS",
  },
  {
    id: "agency",
    title: "Agency: reporting on autopilot",
    description:
      "Client dashboards and weekly reports generated and delivered automatically.",
    href: "#",
    image: "https://placehold.co/720x405/0A2540/FFFFFF/png?text=Agency",
  },
];

const Gallery = ({
  title = "Results across operations-heavy teams",
  description = "How AgentBlue customers fixed revenue leaks and won back time. (Sample case studies — replace with your own.)",
  items = defaultItems,
}: GalleryProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-14 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-black">
              {title}
            </h2>
            <p className="max-w-lg text-[#425466]">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(rgba(10,37,64,0),rgba(10,37,64,0.4),rgba(10,37,64,0.85)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9 text-white/80">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm">
                        Read more
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#4F7CFF]" : "bg-[#4F7CFF]/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery };
