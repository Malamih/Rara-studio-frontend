import { Work } from "../components/Work";
import { ClientsSection } from "./components/ClientsSection";
import { Content } from "./components/Content";
import { Projects } from "./components/Projects";

export default function page() {
  return (
    <main>
      <Content />
      <Projects />
      <ClientsSection />
      <section className="py-28 bg-white text-black">
        <Work className="text-black" page="work" />
      </section>
    </main>
  );
}
