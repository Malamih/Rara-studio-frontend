"use client";
import Container from "@/components/Container";
import { HomePageContent } from "@/types/pages";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Counters = ({
  data,
}: {
  data: HomePageContent["sections"]["overview"];
}) => {
  const section = useRef<HTMLElement | null>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasAnimated = useRef(false); // Track if animation has run
  const [counters, setCounters] = useState([
    { title: "Happy Clients", count: "75", target: 75 },
    { title: "Professional Shots", count: "8,000", target: 8000 },
    { title: "Captivating Videos", count: "450", target: 450 },
  ]);

  // Function to format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Function to parse count string to number
  const parseCount = (countStr: string): number => {
    return parseInt(countStr.replace(/,/g, ""), 10) || 0;
  };

  useEffect(() => {
    if (!section.current) return;

    // Update counters with data
    const updatedCounters = [
      {
        title: "Happy Clients",
        count: data?.happyClients?.value || "75",
        target: parseCount(data?.happyClients?.value || "75"),
      },
      {
        title: "Professional Shots",
        count: data?.professionalShots?.value || "8,000",
        target: parseCount(data?.professionalShots?.value || "8,000"),
      },
      {
        title: "Captivating Videos",
        count: data?.captivatingVideos?.value || "450",
        target: parseCount(data?.captivatingVideos?.value || "450"),
      },
    ];

    setCounters(updatedCounters);

    // ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: false,
        onEnter: () => {
          // Only animate if it hasn't been animated before
          if (!hasAnimated.current) {
            hasAnimated.current = true; // Mark as animated

            // Animate counters when section enters viewport
            counterRefs.current.forEach((ref, index) => {
              if (ref && updatedCounters[index]) {
                const target = updatedCounters[index].target;

                // Create a temporary object to animate
                const counterObj = { count: 0 };

                gsap.to(counterObj, {
                  count: target,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (ref) {
                      ref.textContent =
                        formatNumber(Math.floor(counterObj.count)) + "+";
                    }
                  },
                });
              }
            });
          }
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data]);

  return (
    <section className="my-24" ref={section}>
      <Container>
        <ul className="flex items-center justify-around gap-4 flex-wrap">
          {counters.map((counter, i) => (
            <li key={i} className="flex flex-col gap-1 text-center">
              <span
                ref={(el) => (counterRefs.current[i] = el) as any}
                className="font-normal text-6xl text-primary"
              >
                0+
              </span>
              <span className="text-4xl font-normal">{counter.title}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
