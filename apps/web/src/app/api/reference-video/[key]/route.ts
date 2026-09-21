import { referencePreviewEnabled } from "@/features/catalog/queries.server";
import { readReferenceVideo } from "@/features/catalog/reference/video.server";
import { referenceVideoResponse } from "@/features/catalog/reference/video-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!referencePreviewEnabled()) return new Response(null, { status: 404 });
  const { key } = await params;
  const pending = readReferenceVideo(key);
  if (!pending) return new Response(null, { status: 404 });
  try {
    return referenceVideoResponse(await pending, request);
  } catch {
    return new Response("Reference video is unavailable in this checkout.", {
      status: 503,
    });
  }
}

export const HEAD = GET;
