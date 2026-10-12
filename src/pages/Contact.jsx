import ContactHero from "../components/ContactSection/ContactHero";
import ContactInfo from "../components/ContactSection/ContactInfo";
import ContactForm from "../components/ContactSection/ContactForm";
import ContactMap from "../components/ContactSection/ContactMap";

function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactInfo />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <ContactForm />
          <ContactMap />
        </div>
      </section>
    </main>
  );
}

export default Contact;