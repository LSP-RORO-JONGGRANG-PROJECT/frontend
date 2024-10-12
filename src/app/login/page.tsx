import Header from "@/components/header";
import Auth from "@/components/login";

export default function LoginPage() {
  return (
    <main>
      <Header isActive = {false} />
      <Auth />
    </main>
  );
}
