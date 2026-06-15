"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";

const transitionVariants = {
  item: {
    // NOTE: deliberately no animated `filter: blur()` here. Animating a blur
    // filter forces the GPU to re-rasterize the (large) layer every frame,
    // which made scrolling through this section heavy. Opacity + y are
    // compositor-cheap and give nearly the same fade-up feel.
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

/* Faithful implementation of the bottom part of hero-section-2.tsx:
   the framed app-screenshot block + the customer logos grid.
   Implemented verbatim, adapted only for Vite (next/link -> <a>,
   motion/react -> framer-motion via AnimatedGroup, aspect-15/8 ->
   aspect-[15/8]). The reference hero header/nav is intentionally omitted. */
export function HeroShowcase() {
  return (
    <main className="overflow-hidden">
      <section>
        <div className="relative">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="relative mt-8 overflow-hidden px-4 sm:mr-0 sm:mt-12 md:mt-20">
              <div
                aria-hidden
                className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
              />
              <div className="inset-shadow-2xs ring-background bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                <img
                  className="z-2 border-border/25 aspect-[15/8] relative rounded-2xl border"
                  src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=1920&q=75"
                  alt="app screen"
                  width="2700"
                  height="1440"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>
      <section className="bg-background pb-16 pt-16 md:pb-32">
        <div className="group relative m-auto max-w-5xl px-6">
          <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
            <a href="/" className="block text-sm duration-150 hover:opacity-75">
              <span> Meet Our Customers</span>
              <ChevronRight className="ml-1 inline-block size-3" />
            </a>
          </div>
          <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:grid-cols-4 sm:gap-x-16 sm:gap-y-14">
            <div className="flex">
              <img
                className="mx-auto h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                alt="Nvidia Logo"
                height="20"
                width="auto"
              />
            </div>

            <div className="flex">
              <img
                className="mx-auto h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/column.svg"
                alt="Column Logo"
                height="16"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/github.svg"
                alt="GitHub Logo"
                height="16"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/nike.svg"
                alt="Nike Logo"
                height="20"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                alt="Lemon Squeezy Logo"
                height="20"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/laravel.svg"
                alt="Laravel Logo"
                height="16"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-7 w-fit"
                src="https://html.tailus.io/blocks/customers/lilly.svg"
                alt="Lilly Logo"
                height="28"
                width="auto"
              />
            </div>

            <div className="flex">
              <img
                className="mx-auto h-6 w-fit"
                src="https://html.tailus.io/blocks/customers/openai.svg"
                alt="OpenAI Logo"
                height="24"
                width="auto"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
