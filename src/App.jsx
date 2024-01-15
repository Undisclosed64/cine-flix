import "./App.css";
import { Navbar } from "./components/Navbar";
import { Movies } from "./components/Movies";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar></Navbar>
      <Movies></Movies>
    </CartProvider>
  );
}

export default App;
