import WaveColorAnimation from "@/components/features/event/common/wave-color-animation";
import EventDetail from "@/components/features/event/event-detail";
import MenuIcon from "@/components/features/event/menu-icon";
import ReviewRequest from "@/components/features/event/review/review-request";
import GuestProfile from "@/components/features/event/participant/guest-profile";
import ReviewSection from "@/components/features/event/review/review-section";
import { ShareLinks } from "@/components/features/rsvp/ShareLinks";
import ScrollToTop from "@/components/features/scroll-to-top";
import Spinner from "@/components/features/spinner";
import { MENU_LIST_GUEST, MENU_LIST_HOST } from "@/constants/icons";
import { getWhoIsComing } from "@/lib/actions/event/participant";
import { getAllReviews, getReviewImages } from "@/lib/actions/event/review";
import { checkIsHost, getEventInformation } from "@/lib/api/event";
import { getInvitationUrl } from "@/lib/helpers/url-utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventHome({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  let eventData = null;
  let isHost = false;
  let guests = null;
  let reviewImages: string[] = [];
  let hasPostedReview = false;
  let reviewsData;
  let eventUrl;

  const { eventId } = await params;

  try {
    const [
      eventResponse,
      hostStatus,
      guestList,
      reviewImagesResult,
      reviewsResult,
      eventUrlResult,
    ] = await Promise.all([
      getEventInformation(eventId),
      checkIsHost(eventId),
      getWhoIsComing(eventId),
      getReviewImages(eventId),
      getAllReviews(eventId),
      getInvitationUrl(eventId),
    ]);

    eventData = eventResponse.event;
    isHost = hostStatus;
    guests = guestList;
    reviewImages = reviewImagesResult;
    reviewsData = reviewsResult.data.reviews;
    hasPostedReview = reviewsResult.hasPostedReview;
    eventUrl = eventUrlResult;
  } catch (err) {
    console.error(`Error fetching data for event ${eventId}:`, err);
    notFound();
  }

  const now = new Date();
  const eventStartTime = new Date(eventData.startTime);

  const reviewStartTime = new Date(eventData.startTime);
  reviewStartTime.setHours(reviewStartTime.getHours() + 1);

  const hasEventStarted = now >= eventStartTime;
  const hasEventStartedOneHourAgo = now >= reviewStartTime;

  return (
    <section className="flex h-full min-h-screen flex-col justify-between pt-2">
      <ScrollToTop />
      <div className="grid gap-8 px-4 pb-20">
        {eventData ? (
          <EventDetail eventData={eventData} isHost={isHost} />
        ) : (
          <Spinner color="text-primary" />
        )}

        <section className="grid grid-cols-4 gap-4">
          {(isHost ? MENU_LIST_HOST : MENU_LIST_GUEST).map((menu, index) => (
            <MenuIcon
              key={menu.path}
              iconDetail={menu}
              eventId={eventId}
              index={index}
            />
          ))}
        </section>
        {isHost && !hasEventStarted && (
          <div className="grid gap-6">
            <h2 className="border-b-[0.2px] border-gray-300 pb-2 font-semibold">
              Send Event Invitation!
            </h2>
            <ShareLinks eventUrl={eventUrl} />
          </div>
        )}
        {!isHost && hasEventStartedOneHourAgo && !hasPostedReview && (
          <ReviewRequest eventId={eventId} />
        )}
        {!isHost && (
          <section className="px-3">
            <div className="flex items-center justify-between border-b-[0.2px] border-gray-300 pb-2">
              <h2 className="font-semibold">
                {hasEventStartedOneHourAgo ? "Who Was There" : "Who is coming"}
              </h2>
              <p className="text-sm font-medium text-textSub">
                <span>{guests.length}</span>{" "}
                {hasEventStartedOneHourAgo ? "Went" : "Going"}
              </p>
            </div>
            <div className="flex w-full flex-col">
              <ul className="grid grid-cols-5 gap-2 pt-4">
                {guests.map(({ id, name, profileImageUrl }) => (
                  <GuestProfile
                    key={id}
                    name={name}
                    profileImageUrl={profileImageUrl}
                    size={14}
                    fontSize="text-sm"
                    fontWeight="font-medium"
                  />
                ))}
              </ul>
              <Link
                href={`/event/${eventId}/guests`}
                className="ml-auto text-sm font-semibold text-accentBlue hover:text-accentBlue/60"
              >
                See all
              </Link>
            </div>
          </section>
        )}
        {hasEventStartedOneHourAgo && (
          <ReviewSection
            eventId={eventId}
            reviewImages={reviewImages}
            reviewsData={reviewsData}
            hasPostedReview={hasPostedReview}
            isHost={isHost}
          />
        )}
      </div>

      <div className="relative">
        <WaveColorAnimation />
      </div>
    </section>
  );
}
