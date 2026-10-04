import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-secret");
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    const body = await req.json();
    const slug = body?.slug?.current;

    if (!slug) {
      revalidatePath("/blogs");
      return NextResponse.json({ revalidated: true, path: "/blogs" });
    }

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);

    return NextResponse.json({
      revalidated: true,
      slug,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("[Revalidation Webhook Error]:", err);
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}
