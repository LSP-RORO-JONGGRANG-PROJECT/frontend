import Header from "@/components/header";


export default function ProductDetailLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
      <Header isActive = {false} />
      {/* Add any common layout for product detail pages here */}
        {children}
      </section>
    )
  }