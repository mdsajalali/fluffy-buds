const TermsConditions = () => {
  return (
    <div className="min-h-screen md:mt-[65px] bg-white text-gray-800 px-4 sm:px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms & Conditions
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to our eCommerce website. By accessing or using our website,
            you agree to be bound by these Terms & Conditions. Please read them
            carefully.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use our website. By using this
            site, you represent and warrant that you meet all eligibility
            requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Account Registration
          </h2>
          <p>
            To access certain features, you may be required to register for an
            account. You agree to provide accurate and complete information
            during registration.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Orders & Payments</h2>
          <p>
            All orders are subject to availability and acceptance. We reserve
            the right to cancel any order. Payment must be completed before
            shipping.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Shipping & Delivery</h2>
          <p>
            We aim to process and ship orders promptly. Delivery times are
            estimates and not guaranteed. We are not responsible for delays
            caused by external factors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Returns & Refunds</h2>
          <p>
            We accept returns within 14 days of delivery. Items must be unused
            and in original packaging. Refunds will be processed to the original
            payment method.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Intellectual Property
          </h2>
          <p>
            All content, trademarks, and logos on this site are the property of
            our company or its licensors and are protected by intellectual
            property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of the website or purchase of our
            products.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms & Conditions at any time.
            Changes will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact our
            support team at{" "}
            <a
              href="mailto:fluffybuds@help.com"
              className="text-blue-600 underline"
            >
              fluffybuds@help.com
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

export default TermsConditions;
