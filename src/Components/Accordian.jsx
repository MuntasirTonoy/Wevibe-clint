import React from "react";

const Accordian = () => {
  return (
    <div className="max-w-4xl mx-auto my-20 p-5 bg-base rounded-lg ">
      <h2 className="text-2xl font-bold mb-5 text-center">Event FAQs</h2>
      <div className="join join-vertical bg-base-100">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="event-accordion" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create a new event?
          </div>
          <div className="collapse-content text-sm">
            Go to the "Create Event" page from the navigation menu, fill in the
            event details, and submit to publish it.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="event-accordion" />
          <div className="collapse-title font-semibold">
            How can I join an event?
          </div>
          <div className="collapse-content text-sm">
            Browse the "Upcoming Events" section, click on the event you’re
            interested in, and hit the "Join" button. You may need to be logged
            in.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="event-accordion" />
          <div className="collapse-title font-semibold">
            How do I track the events I've joined?
          </div>
          <div className="collapse-content text-sm">
            Visit your profile and navigate to the "My Events" section to view
            all the events you’ve joined or hosted.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="event-accordion" />
          <div className="collapse-title font-semibold">
            Can I edit or cancel an event I've created?
          </div>
          <div className="collapse-content text-sm">
            Yes. Go to your "My Events" page, select the event, and choose
            "Edit" or "Cancel" to update or remove it.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="event-accordion" />
          <div className="collapse-title font-semibold">
            How do I get notified about new events in my area?
          </div>
          <div className="collapse-content text-sm">
            Make sure notifications are enabled in your profile settings. You’ll
            get alerts based on your location and interests.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
