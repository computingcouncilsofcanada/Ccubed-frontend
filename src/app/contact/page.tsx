/**
 * Contact Page Component
 *
 * This page serves as the contact information page of the application.
 * Currently displays a centered heading as a placeholder.
 * This component can be expanded to include contact forms,
 * contact information, and other relevant contact-related features.
 */

import React from "react";

/**
 * ContactPage Component
 *
 * @returns {JSX.Element} A centered heading displaying "Contact Page"
 *
 * This component:
 * 1. Provides a placeholder for the contact page content
 * 2. Uses flexbox for centering the content
 * 3. Can be enhanced with additional contact-related features
 */
function ContactPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">Contact Page</h1>
    </div>
  );
}

export default ContactPage;
