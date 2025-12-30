import Link from 'next/link';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Text as="h1" className="text-4xl font-bold mb-4">
            Terms and Conditions
          </Text>
          <Text as="p" className="text-neutral-11">
            Last updated: January 1, 2025
          </Text>
        </div>

        <div className="space-y-8">
          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Introduction
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              Welcome to Backstage Pass. These Terms and Conditions govern your
              use of our platform and services. By accessing or using Backstage
              Pass, you agree to be bound by these terms. If you do not agree
              with any part of these terms, you may not use our services.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Use of Service
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              Backstage Pass provides a platform for creators to share exclusive
              content with their audience through stages and passes. You must be
              at least 18 years old to use our services. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              User Accounts
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed mb-4">
              When creating an account, you agree to:
            </Text>
            <ul className="list-disc list-inside text-neutral-11 space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Keep your account credentials secure</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not share your account with others</li>
              <li>Not create multiple accounts for abusive purposes</li>
            </ul>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Content Guidelines
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed mb-4">
              You retain ownership of the content you create and share on
              Backstage Pass. However, by posting content, you grant us a
              license to display, distribute, and promote your content on the
              platform. You are solely responsible for your content and must
              ensure it does not:
            </Text>
            <ul className="list-disc list-inside text-neutral-11 space-y-2 ml-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Contain harmful, abusive, or offensive material</li>
              <li>Include misleading or fraudulent information</li>
              <li>Violate the privacy of others</li>
            </ul>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Prohibited Uses
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed mb-4">
              You may not use Backstage Pass to:
            </Text>
            <ul className="list-disc list-inside text-neutral-11 space-y-2 ml-4">
              <li>Engage in illegal activities</li>
              <li>Harass, bully, or intimidate other users</li>
              <li>Distribute spam or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the platform</li>
              <li>Scrape or collect user data without permission</li>
            </ul>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Payments and Refunds
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              Payments for passes are processed through our secure payment
              providers. All sales are final unless otherwise specified by the
              creator or required by applicable law. Creators set their own
              pricing for passes, and Backstage Pass takes a platform fee from
              each transaction.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Termination
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              We reserve the right to suspend or terminate your account at any
              time for violations of these terms or for any other reason at our
              discretion. You may also delete your account at any time through
              your account settings.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Disclaimers
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              Backstage Pass is provided &quot;as is&quot; without warranties of
              any kind. We do not guarantee uninterrupted or error-free service.
              We are not responsible for content created by users or for any
              disputes between users and creators.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Contact Us
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at legal@backstagepass.com.
            </Text>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-alpha-4">
          <Button asChild variant="ghost">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
