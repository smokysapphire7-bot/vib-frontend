import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, getRelatedProducts } from "@/lib/products";

interface Props { params: { slug: string } }

const WHATSAPP = "919074445985";

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: `https://vapedeliverybangalore.com/products/${product.slug}` },
    keywords: [
      "vape in bangalore", "vapes in bangalore", "vape delivery bangalore",
      "buy vape bangalore", product.name, product.brand,
      `${product.brand} bangalore`, "disposable vape bangalore",
    ],
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      images: [{ url: `https://vapedeliverybangalore.com${product.image}` }],
      type: "website",
      siteName: "VapeDeliveryBangalore.com",
    },
  };
}

const AREAS = [
  "BTM Layout", "HSR Layout", "Koramangala", "Indiranagar", "Whitefield",
  "Marathahalli", "Electronic City", "Jayanagar", "JP Nagar", "Hebbal",
  "Yelahanka", "Rajajinagar", "Malleshwaram", "Banashankari", "Bellandur",
];

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 4);
  const waMsg = encodeURIComponent(
    `Hi Vape Delivery Bangalore, I want to order *${product.name}* (${product.price}). Please confirm availability and delivery time.`
  );
  const waUrl = `https://wa.me/${WHATSAPP}?text=${waMsg}`;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80 }}>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": `https://vapedeliverybangalore.com${product.image}`,
        "description": product.metaDescription,
        "brand": { "@type": "Brand", "name": product.brand },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": product.price.replace(/[₹,]/g, ""),
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "VapeDeliveryBangalore.com" }
        },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "180" }
      })}} />

      {/* Header */}
      <div style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "16px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Link href="/products" style={{ color: "var(--green)", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}>← All Products</Link>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>
        {/* Product card */}
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ position: "relative", aspectRatio: "1", background: "var(--bg-3)", maxHeight: 300 }}>
            {product.badge && (
              <span style={{ position: "absolute", top: 12, left: 12, background: "var(--green)", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px", borderRadius: 100, zIndex: 1 }}>{product.badge}</span>
            )}
            <Image src={product.image} alt={product.name} fill style={{ objectFit: "contain", padding: 20 }} />
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{product.brand}</div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--white)", marginBottom: 8 }}>{product.name}</h1>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--green)", marginBottom: 16 }}>{product.price}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { label: "Puffs", value: product.puffs },
                { label: "Nicotine", value: product.nicotine },
                { label: "Brand", value: product.brand },
                { label: "Category", value: product.category },
              ].filter(i => i.value).map(item => (
                <div key={item.label} style={{ background: "var(--bg-3)", borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--muted)", fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--white)" }}>{item.value}</div>
                </div>
              ))}
            </div>

            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", marginBottom: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.122 1.523 5.855L0 24l6.29-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.733.884.937-3.638-.234-.374A9.818 9.818 0 0112 2.182c5.424 0 9.818 4.394 9.818 9.818 0 5.425-4.394 9.818-9.818 9.818z"/></svg>
              Order {product.name} on WhatsApp
            </a>

            <div style={{ fontSize: "0.78rem", color: "var(--muted)", textAlign: "center" as const, lineHeight: 1.6 }}>
              No COD — Payment confirmed on WhatsApp before dispatch<br/>
              Dispatch in 10-15 mins · Delivery charge paid to rider
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px", marginBottom: 24 }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>About {product.name}</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.8 }}>{product.longDescription}</p>
        </div>

        {/* Delivery areas */}
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px", marginBottom: 24 }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>
            {product.name} Delivery Areas in Bangalore
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {AREAS.map(area => (
              <Link key={area} href={`/vape-delivery/${area.toLowerCase().replace(/ /g, "-")}`} style={{ background: "var(--bg-3)", border: "1px solid var(--border)", padding: "5px 10px", borderRadius: 100, fontSize: "0.72rem", color: "var(--muted)", textDecoration: "none" }}>
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--white)", marginBottom: 14 }}>You may also like</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/products/${p.slug}`} style={{ textDecoration: "none", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" as const }}>
                  <div style={{ position: "relative", aspectRatio: "1", background: "var(--bg-3)" }}>
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain", padding: 8 }} />
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--white)", marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--green)" }}>{p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#25D366", color: "#fff", textAlign: "center" as const, padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
          Order {product.name} on WhatsApp — 30-45 Min Delivery
        </a>
      </div>
    </main>
  );
}
