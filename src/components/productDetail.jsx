import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRows } from "../utils/db";
import { Query } from "appwrite";
import { ShoppingCart, ChevronLeft, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false); // Success state
  const [error, setError] = useState(null);
  const [tailor, setTailor] = useState(null);

  // New state for selections
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const resp = await getRows(
          import.meta.env.VITE_APPWRITE_TAILORS_TABLE_ID,
          [Query.equal("$id", id)]
        );
        const row = resp?.rows?.[0] ?? resp?.documents?.[0] ?? (Array.isArray(resp) ? resp[0] : null);
        if (!mounted) return;
        setProduct(row || null);

        if (row) {
          const tailorId = row.tailorId || row.tailor || row.ownerId;
          if (tailorId) {
            try {
              const tailorResp = await getRows(
                import.meta.env.VITE_APPWRITE_TABLE_ID_USERS, [Query.equal("$id", tailorId)]
              );
              console.log("tailor id", tailorId)
              const tailorRow = tailorResp?.rows?.[0] ?? tailorResp?.documents?.[0] ?? null;
              if (mounted) setTailor(tailorRow || null);
            } catch (tailorErr) {
              console.error("Failed to load tailor", tailorErr);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load product", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  const images = (product?.imageUrls ?? product?.images ?? (product?.imageURL ? [product.imageURL] : [])) || [];
  
  const displayPrice = (() => {
    const p = Number(product?.price ?? 0);
    if (!Number.isFinite(p)) return "0.00";
    return p > 1000 ? (p / 100).toFixed(2) : p.toFixed(2);
  })();

  const addToCart = () => {
    if (!product) return;

    // Validation
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    setAdding(true);
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      
      // Create a unique ID for this specific combination
      const cartItemId = `${product.$id}-${selectedSize}-${selectedColor}`;
      const existing = cart.find((it) => it.cartItemId === cartItemId);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          cartItemId,
          $id: product.$id,
          name: product.title ?? product.name,
          price: Number(product.price ?? 0),
          image: images[0] ?? "",
          quantity: 1,
          selectedSize,
          selectedColor,
          tailorId: product.tailorId
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Visual feedback
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading product…</div>;
  if (error || !product) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-700 mb-6">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
          {/* Gallery Section */}
          <div>
            <div className="rounded-lg overflow-hidden">
              <img src={images[galleryIndex] ?? "https://via.placeholder.com/800x600?text=No+Image"} className="w-full h-[420px] object-cover" alt="Product" />
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setGalleryIndex(i)} className={`w-20 h-20 rounded border ${i === galleryIndex ? "border-emerald-600" : "border-gray-200"}`}>
                    <img src={src} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title ?? product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-extrabold text-gray-900">${displayPrice}</span>
              <span className="text-sm text-gray-500">/{product.pricingUnit ?? "item"}</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description ?? product.bio ?? ""}</p>

            {/* Selectable Sizes */}
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-600 mb-2">Select Size</div>
              <div className="flex gap-2 flex-wrap">
                {(product.sizes || []).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 border rounded-md text-sm transition-all ${
                      selectedSize === s ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 hover:border-emerald-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Selectable Colors */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-600 mb-2">Select Color</div>
              <div className="flex gap-2 flex-wrap">
                {(product.colors || []).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 border rounded-md text-sm transition-all ${
                      selectedColor === c ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 hover:border-emerald-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={addToCart}
                disabled={adding}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                  added ? "bg-green-100 text-green-700 border border-green-200" : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {added ? <CheckCircle className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {adding ? "Adding…" : added ? "Added to Cart" : "Add to Cart"}
              </button>
              
              <button onClick={() => navigate(`/tailor/${product.tailorId || product.ownerId}`)} className="px-6 py-3 border rounded-md text-gray-700 hover:bg-gray-50">
                Contact Tailor
              </button>
            </div>

            <div className="mt-8 border-t pt-4 text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-600" /> {tailor?.phone ?? "Not provided"}</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-emerald-600" /> {tailor?.location ?? "Location not specified"}</div>
               {tailor && (
                <div className="flex items-center gap-3 mt-2">
                Designed by: <span className="font-medium">{tailor.name}</span>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}