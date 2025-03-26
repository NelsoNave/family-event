import { ReviewType } from "@/types/review";
import Image from "next/image";
import Link from "next/link";
import SlickCarousel from "./slick-carousel";

type ReviewSectionProps = {
  eventId: string;
  reviewsData: ReviewType[];
  reviewImages: string[];
  hasPostedReview: boolean;
  isHost: boolean;
};

export default async function ReviewSection({
  eventId,
  reviewsData,
  reviewImages,
  hasPostedReview,
  isHost,
}: ReviewSectionProps) {
  return (
    <section className="px-3">
      <h2 className="w-full border-b border-textBorder pb-2 text-base font-semibold">
        Reviews ({reviewsData.length})
      </h2>
      {isHost && reviewsData.length === 0 && (
        <p className="mt-6 text-center text-sm font-medium">
          Stay tuned for reviews from other guests!
        </p>
      )}
      {!isHost && !hasPostedReview && (
        <div className="mt-6 grid justify-items-center gap-4">
          <p className="text-center text-sm font-medium">
            Your review and others will be here.
          </p>
          <Link
            href={`/event/${eventId}/review/create`}
            className="w-fit rounded-full bg-accentGreen px-5 py-2 text-sm font-bold text-white duration-200 hover:scale-105 hover:opacity-70"
          >
            Add your review
          </Link>
        </div>
      )}
      {reviewsData.length > 0 && (
        <div className="mt-2 flex flex-col gap-4">
          {reviewImages.length >= 3 ? (
            <SlickCarousel images={reviewImages} />
          ) : (
            <div className="flex gap-1">
              {reviewImages.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt={`Review image - ${image}`}
                  width={150}
                  height={120}
                  className="h-[120px] rounded-xl object-cover p-1"
                />
              ))}
            </div>
          )}
          <ul className="grid max-h-72 gap-4 overflow-scroll">
            {reviewsData.map((review) => (
              <li key={review.id} className="flex gap-2">
                <Image
                  src={review.user.profileImageUrl}
                  alt={review.user.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)]"
                />
                <div className="grid gap-1">
                  <p className="text-base font-semibold">{review.user.name}</p>
                  <p className="whitespace-pre-wrap text-sm font-medium">
                    &quot;{review.reviewText}&quot;
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
