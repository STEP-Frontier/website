import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="max-w-[90rem] mx-auto sm:px-8 md:px-16 items-center mt-1">
      <Section
        title="宇宙技術プロジェクト STEP"
        content="筑波大学宇宙技術プロジェクトSTEPは、ロケットや模擬人工衛星(CanSat)の製作・運用を行っている学生団体です。"
        image="/images/step.jpg"
        learnMoreLink="/about"
        reverse
      />
      <Section
        title="ロケットプロジェクト"
        content="現在STEPロケット班が開発中のロケットです。（まだ名前すらつけてないけど）"
        image="/images/rocket.jpg"
        learnMoreLink="/rocket"
      />
      <Section
        title="衛星プロジェクト"
        content="現在STEP衛星班が開発中のCanSatです。（図がなーい）"
        image="/images/cansat.jpg"
        learnMoreLink="/cansat"
        reverse
      />
      </div>
    </div>
  );
}
