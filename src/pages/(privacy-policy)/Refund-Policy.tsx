const RefundPolicy = () => {
  return (
    <div className="min-h-screen md:mt-[65px] bg-white text-gray-800 px-4 sm:px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you're
            not happy with your order, we're here to help with our refund policy
            outlined below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Returns</h2>
          <p>
            You have 14 calendar days to return an item from the date you
            received it. To be eligible for a return, the item must be unused,
            in the original packaging, and in the same condition you received
            it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Non-Returnable Items
          </h2>
          <p>Certain items cannot be returned, including:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Personal care items (if opened)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Refunds</h2>
          <p>
            Once we receive your returned item, we will inspect it and notify
            you of the status of your refund. If approved, your refund will be
            processed within 5-7 business days to your original method of
            payment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Late or Missing Refunds
          </h2>
          <p>
            If you haven’t received a refund yet, first check your bank account
            again. Then contact your credit card company or bank, as it may take
            some time before your refund is officially posted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Exchanges</h2>
          <p>
            We only replace items if they are defective or damaged. If you need
            to exchange an item for the same one, contact us at{" "}
            <a
              href="mailto:luffybuds@help.com"
              className="text-blue-600 underline"
            >
              luffybuds@help.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Shipping Returns</h2>
          <p>
            To return your product, mail it to: <br />
            <span className="block mt-2">
              123 Your Street, Your City, State, 00000
            </span>
            <br />
            You will be responsible for paying your own shipping costs for
            returning your item. Shipping costs are non-refundable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Need Help?</h2>
          <p>
            Contact our customer support team for questions related to refunds
            and returns at{" "}
            <a
              href="mailto:luffybuds@help.com"
              className="text-blue-600 underline"
            >
              luffybuds@help.com
            </a>
            .
          </p>
        </section>
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center">
        Last updated: April 11, 2025
      </p>
    </div>
  );
};

export default RefundPolicy;
