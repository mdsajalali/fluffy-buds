const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen md:mt-[65px] bg-white text-gray-800 px-4 sm:px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            At our eCommerce store, we value your privacy. This Privacy Policy
            outlines the types of personal information we collect, how we use
            it, and the measures we take to protect it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <p>We collect various types of information, including:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>
              Personal identification information (name, email address, phone
              number)
            </li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Shipping information (address, delivery instructions)</li>
            <li>
              Browser and device information (IP address, device type, browser
              version)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Process your orders and provide customer service</li>
            <li>
              Improve our website and personalize your shopping experience
            </li>
            <li>Send marketing communications if you’ve opted in</li>
            <li>Comply with legal obligations and resolve disputes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal data. We use encryption to protect
            sensitive information transmitted online.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
          <p>
            Our website uses cookies to enhance user experience. Cookies are
            small files stored on your device that help us track your
            preferences and improve your browsing experience. You can choose to
            disable cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Sharing Your Information
          </h2>
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your data with trusted third-party service
            providers who assist us in operating our website and conducting our
            business, such as payment processors and shipping companies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
          <p>
            Our website may contain links to other websites. We are not
            responsible for the privacy practices or content of external sites.
            We encourage you to review their privacy policies before providing
            any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. If you would like to exercise these rights, please
            contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 underline"
            >
              support@example.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            9. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we will update the "Last updated"
            date at the bottom of the page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 underline"
            >
              support@example.com
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

export default PrivacyPolicy;
