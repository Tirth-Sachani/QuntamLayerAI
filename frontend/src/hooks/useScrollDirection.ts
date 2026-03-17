"use client";

import { useState, useEffect } from 'react';

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = scrollY > lastScrollY ? "down" : "up";

            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            // Always set "up" if we are at the very top of the page
            if (scrollY <= 20) {
                setScrollDirection("up");
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener("scroll", updateScrollDirection); // add event listener

        return () => {
            window.removeEventListener("scroll", updateScrollDirection); // clean up
        }
    }, [scrollDirection]);

    return scrollDirection;
}
