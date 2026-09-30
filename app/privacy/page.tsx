import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Vantage Logistics collects, uses and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 30, 2026"
      intro={`This policy explains what personal information ${siteConfig.name} ("we", "us") collects when you use this website or ship with us, how we use it, and the choices you have.`}
      sections={[
        {
          title: 'Information we collect',
          list: [
            'Contact enquiries: the name, email address, phone number (optional), service of interest and message you submit through our contact form.',
            'Shipment details: sender and receiver names, phone numbers, email addresses and addresses, plus package details, locations and status updates, entered by our staff when a shipment is booked.',
            'Tracking: the tracking number you enter on our tracking page. You do not need an account to track a shipment.',
            'Technical data: basic information such as IP address and browser type, which our hosting provider may record in server logs, and which we use to prevent abuse. We also count page views with Vercel Analytics, which does not use cookies.',
          ],
        },
        {
          title: 'How we use your information',
          list: [
            'To answer your enquiries and provide quotes.',
            'To arrange, move, track and deliver shipments, and to show tracking status to people who hold the tracking number.',
            'To keep the website and our systems secure and to prevent spam and misuse.',
            'To meet legal, customs, tax and accounting obligations.',
          ],
          body: ['We do not sell your personal information.'],
        },
        {
          title: 'Cookies',
          body: [
            'At the time of writing, this website does not use advertising or analytics cookies. Our staff login uses a single strictly necessary session cookie to keep administrators signed in. Customers do not receive a login cookie.',
          ],
        },
        {
          title: 'Who we share information with',
          body: ['We share information only where needed to run our service:'],
          list: [
            'Hosting and database providers that store and serve our website and records.',
            'Carriers, airlines, shipping lines, customs brokers and authorities involved in moving and clearing your shipment.',
            'Google Maps: the tracking page shows an embedded Google map, so your browser connects to Google directly and Google can see your IP address. Separately, our staff look up shipment place names through OpenStreetMap.',
            'Authorities or other parties when required by law.',
          ],
        },
        {
          title: 'International transfers',
          body: [
            'Shipping is international by nature. Your information may be processed in the United States and in the countries your shipment passes through, where data protection rules may differ from those where you live.',
          ],
        },
        {
          title: 'How long we keep information',
          body: [
            'We keep information for as long as needed for the purposes above, including shipment records we must retain for legal, customs and accounting reasons. Contact messages are kept until your enquiry is resolved and for a reasonable period afterwards.',
          ],
        },
        {
          title: 'Security',
          body: [
            'We use reasonable measures to protect your information, including encrypted connections, hashed administrator passwords and restricted access to our systems. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
          ],
        },
        {
          title: 'Your rights',
          body: [
            `Depending on where you live, you may have the right to access, correct or delete the personal information we hold about you, or to object to certain uses. To make a request, email ${siteConfig.email}. We may need to verify your identity, and some records must be kept by law.`,
          ],
        },
        {
          title: "Children's privacy",
          body: ['Our website is not directed at children under 13, and we do not knowingly collect their personal information.'],
        },
        {
          title: 'Changes to this policy',
          body: ['We may update this policy from time to time. The date at the top shows when it was last changed.'],
        },
        {
          title: 'Contact us',
          body: [`${siteConfig.name}. Email: ${siteConfig.email}.`],
        },
      ]}
    />
  )
}
