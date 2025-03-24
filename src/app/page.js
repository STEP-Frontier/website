import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div>
      <Hero 
      hero_title = "STEPへようこそ"
      subtitle="Space TEchnology Project"
      />
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
        content="学生自ら設計・製作したハイブリッドロケットの開発を行っています。打上げ実験を通じて、構造設計・エンジン・電装・シミュレーションなど多岐にわたる技術を学びます。"
        image="/images/rocket.jpg"
        learnMoreLink="/rocket"
      />
      <Section
        title="衛星プロジェクト"
        content="模擬人工衛星「CanSat」の開発を行い、各種コンテストに挑戦しています。機体設計からプログラミングまでを学生主体で取り組み、宇宙機システムの基礎を実践的に学びます。"
        image="/images/cansat.jpg"
        learnMoreLink="/cansat"
        reverse
      />
      </div>
    </div>
  );
}
