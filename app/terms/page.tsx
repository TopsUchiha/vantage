import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you use the Vantage Logistics website and services.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="September 28, 2026"
      intro={`These terms apply when you use the ${siteConfig.name} website and our logistics services. By using them, you agree to these terms.`}
      sections={[
        {
          title: 'Our services',
          body: [
            'We provide freight, shipping, warehousing and related logistics services as described on this website. A specific shipment is governed by these terms together with any written quote, booking confirmation, waybill or bill of lading we issue.',
          ],
        },
        {
          title: 'Quotes and bookings',
          body: [
            'A website enquiry or an estimate is not a contract. A booking is confirmed only when we confirm it in writing. Quotes may change if shipment details, routes, fuel costs or carrier rates change.',
          ],
        },
        {
          title: 'Your responsibilities as shipper',
          list: [
            'Give complete and accurate information about the goods, their value, weight, dimensions and the sender and receiver.',
            'Pack goods properly so they can withstand normal handling and transport.',
            'Provide all documents needed for export, import and customs clearance.',
            'Make sure the goods and the shipment are lawful.',
          ],
        },
        {
          title: 'Prohibited and restricted goods',
          body: [
            'We do not carry illegal goods. Dangerous, hazardous, perishable, high-value or otherwise regulated goods may be refused or need prior written agreement and special handling. We may inspect, hold or refuse any shipment we believe breaks the law or these terms.',
          ],
        },
        {
          title: 'Tracking information and delivery times',
          body: [
            'Tracking status, locations and estimated delivery dates are provided for convenience. Updates may be delayed, and estimated dates are not guarantees. Delays can be caused by weather, customs, carrier schedules and other events outside our control.',
          ],
        },
        {
          title: 'Customs, duties and taxes',
          body: [
            'Unless we agree otherwise in writing, the shipper or receiver is responsible for customs duties, import taxes, storage or demurrage charges and any fines arising from incorrect or missing information.',
          ],
        },
        {
          title: 'Liability and insurance',
          body: [
            'Our liability for loss, damage or delay is limited as set out in our written booking terms, the applicable waybill or bill of lading and the law that applies to the mode of transport. To the extent the law allows, we are not liable for indirect or consequential losses such as lost profits or business interruption. We recommend insuring valuable goods; ask us about cargo insurance.',
          ],
        },
        {
          title: 'Claims',
          body: [
            'Report any loss or damage to us in writing as soon as you discover it, with the tracking number and supporting photos or documents. Time limits for claims are set by the applicable waybill or law.',
          ],
        },
        {
          title: 'Using this website',
          body: [
            'You agree not to misuse the website, including trying to access the administrator area or our systems without permission, interfering with its operation, or automatically scraping shipment data. Content on this website, including the Vantage Logistics name and logo, belongs to us and may not be copied without permission.',
          ],
        },
        {
          title: 'Website disclaimer',
          body: [
            'The website is provided "as is". We try to keep it accurate and available but do not promise it will always be error-free or uninterrupted.',
          ],
        },
        {
          title: 'Governing law',
          body: ['These terms are governed by the laws of the State of Ohio, United States, without regard to conflict-of-law rules, except where mandatory local law says otherwise.'],
        },
        {
          title: 'Changes to these terms',
          body: ['We may update these terms from time to time. The date at the top shows when they were last changed.'],
        },
        {
          title: 'Contact us',
          body: [`${siteConfig.name}. Email: ${siteConfig.email}.`],
        },
      ]}
    />
  )
}
