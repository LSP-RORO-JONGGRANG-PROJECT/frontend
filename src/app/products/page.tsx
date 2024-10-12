import ShopAll from "@/components/allproducts";
import Header from "@/components/header";

export default function AllProductsPage() {
  return (
    <main>
      <Header isActive = {false} />
      <ShopAll />
    </main>
  );
}
