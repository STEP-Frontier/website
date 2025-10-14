import Hero from "@/components/Hero";

import { url } from "@/util/url-converter";

export default function CanSat() {
    return (
        <div className="w-full">
            <Hero
                image_path={url("/images/cansat/cansat-hero-tmp.jpg")}
                hero_title="CANSAT PROJECTS"
                subtitle="ただいま工事中でございます"
                black_opacity={0.4}
            />
        </div>
    )
}