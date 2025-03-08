// src/app/RemoveSsrStyles.tsx
"use client";

import { useEffect } from "react";

export default function RemoveSsrStyles() {
    useEffect(() => {
        const ssrStyles = document.getElementById("jss-server-side");
        if (ssrStyles && ssrStyles.parentElement) {
            ssrStyles.parentElement.removeChild(ssrStyles);
        }
    }, []);

    return null;
}
