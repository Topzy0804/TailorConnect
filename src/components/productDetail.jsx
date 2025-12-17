import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRows } from "../utils/db";
import { Query } from "appwrite";
import { ShoppingCart, ChevronLeft, Phone, MapPin } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [tailor, setTailor] = useState(null);

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
        const row =
          resp?.rows?.[0] ??
          resp?.documents?.[0] ??
          (Array.isArray(resp) ? resp[0] : null);
        if (!mounted) return;
        setProduct(row || null);

        if (row) {
          const tailorId = row.tailorId || row.tailor || row.ownerId;

          if (tailorId) {
            try {
              const tailorResp = await getRows(
                import.meta.env.VITE_APPWRITE_TABLE_ID_USERS, [Query.equal("$id", tailorId)]
              );

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

  const images =
    (product?.imageUrls ??
      product?.images ??
      (product?.imageURL ? [product.imageURL] : [])) ||
    [];

  const displayPrice = (() => {
    const p = Number(product?.price ?? 0);
    if (!Number.isFinite(p)) return "0.00";
    return p > 1000 ? (p / 100).toFixed(2) : p.toFixed(2);
  })();

  const addToCart = () => {
    if (!product) return;
    setAdding(true);
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      const existing = cart.find((it) => it.$id === product.$id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          $id: product.$id,
          title: product.title ?? product.name,
          price: Number(product.price ?? 0),
          image: images[0] ?? "",
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading product…</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Product not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
          <div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={
                  images[galleryIndex] ??
                  "https://via.placeholder.com/800x600?text=No+Image"
                }
                alt={product.title ?? product.name}
                className="w-full h-[420px] object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`w-20 h-20 rounded overflow-hidden border ${
                      i === galleryIndex
                        ? "border-emerald-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.title ?? product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-extrabold text-gray-900">
                ${displayPrice}
              </span>
              <span className="text-sm text-gray-500">
                /{product.pricingUnit ?? "item"}
              </span>
            </div>

            <p className="text-gray-700 mb-4">
              {product.description ?? product.bio ?? ""}
            </p>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Sizes</div>
              <div className="flex gap-2 flex-wrap">
                {(product.sizes || []).length > 0 ? (
                  (product.sizes || []).map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 border rounded text-sm bg-gray-50"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">Not specified</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Colors</div>
              <div className="flex gap-2 flex-wrap">
                {(product.colors || []).length > 0 ? (
                  (product.colors || []).map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 border rounded text-sm bg-gray-50"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">Not specified</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={addToCart}
                disabled={adding}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                {adding ? "Adding…" : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  const tailorId =
                    product.tailorId ?? product.tailor ?? product.ownerId;
                  if (tailorId) navigate(`/tailor/${tailorId}`);
                }}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Contact Tailor
              </button>
            </div>

            <div className="mt-8 border-t pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{tailor?.phone ?? "Not provided"}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>
                  {tailor?.location ??
                    tailor?.address ??
                    "Location not specified"}
                </span>
              </div>
              {tailor && (
                <div className="flex items-center gap-3 mt-2">
                Designed by: <span className="font-medium">{tailor.name}</span>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* optional details / specifications */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Details</h3>
          <div className="text-gray-700">
            <p>
              {product.longDescription ??
                product.details ??
                "No additional details available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
