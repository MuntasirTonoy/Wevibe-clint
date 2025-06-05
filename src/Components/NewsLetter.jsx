const NewsLetter = () => {
  return (
    <section className="py-16 md:py-24 bg-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg mb-8 text-gray-300">
            Subscribe to our newsletter to receive updates about upcoming events
            and volunteer opportunities in your area.
          </p>

          <div className="flex flex-col items-center sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-white px-4 py-3 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-white  btn  text-black hover:bg-gray-100">
              Subscribe
            </button>
          </div>

          <p className="text-xs mt-4 text-gray-200">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from CommunityServe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
