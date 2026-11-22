import type { AxiosResponse } from "axios";
import { api } from "@/src/lib/api";
import { merchantFeed } from "@/src/lib/merchant-feed";
import type { Sneaker } from "@/types/sneaker";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const products: Sneaker[] = [];
    const cursors = new Set<string>();
    let after: string | null = null;
    do {
      const response: AxiosResponse<{ products: Sneaker[]; nextCursor: string | null }> = await api.get<{ products: Sneaker[]; nextCursor: string | null }>(
        "/merchant-products", { params: after ? { after } : {} },
      );
      if (!Array.isArray(response.data.products)) throw new Error("Invalid merchant response");
      products.push(...response.data.products);
      after = response.data.nextCursor;
      if (after !== null && (typeof after !== "string" || !/^[a-f0-9]{24}$/i.test(after) || cursors.has(after))) {
        throw new Error("Invalid merchant cursor");
      }
      if (after) cursors.add(after);
    } while (after);
    return new Response(merchantFeed(products), {
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=300", "X-Content-Type-Options": "nosniff" },
    });
  } catch {
    // Never publish an empty or partially fetched feed when the catalogue is unavailable.
    return new Response("Catalogue temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "300" } });
  }
}
