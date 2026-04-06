import { Convertidor } from "../components/convertidor/Convertidor";
import { Navbar } from "../components/navbar/navbar";
import { Footer } from "../components/footer/Footer";

export const App = () => {
  return (
    <main>
      <Navbar />
      <Convertidor />
      <Footer />
    </main>
  );
}