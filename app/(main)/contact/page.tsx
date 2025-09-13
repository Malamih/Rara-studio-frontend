import Container from "@/components/Container";
import { Info } from "./components/Info";
import { Form } from "./components/Form";

export default function Page() {
  return (
    <main>
      <Container>
        <div className="form my-20 flex gap-12 max-lg:flex-col">
          <Info />
          <Form />
        </div>

        <div className="map mt-16">
          <iframe
            src="https://www.google.com/maps?q=33.317320071901705,44.351885470605765&hl=es;z=14&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </main>
  );
}
