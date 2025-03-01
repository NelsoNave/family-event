import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Revalidate ALL pages using the layout
    revalidatePath("/", "layout");

    // Revalidate all API-fetching components
    revalidateTag("all");

    return NextResponse.json({
      success: true,
      message: "Cache cleared for the whole site",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to clear cache", error },
      { status: 500 },
    );
  }
}
