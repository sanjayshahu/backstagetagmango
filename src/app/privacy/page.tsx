import Link from 'next/link';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Text as="h1" className="text-4xl font-bold mb-4">
            Privacy Policy
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
              Welcome to Backstage Pass. We respect your privacy and are
              committed to protecting your personal data. This privacy policy
              explains how we collect, use, and safeguard your information when
              you use our platform.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Information We Collect
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </Text>
            <ul className="list-disc list-inside text-neutral-11 space-y-2 ml-4">
              <li>Account information (name, email address, profile picture)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Content you create, share, or upload to the platform</li>
              <li>Communications with us or other users</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed mb-4">
              We use the information we collect to:
            </Text>
            <ul className="list-disc list-inside text-neutral-11 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your experience on the platform</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Information Sharing
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              We do not sell your personal information. We may share your
              information with third parties only in the following
              circumstances: with your consent, to comply with legal
              obligations, to protect our rights, or with service providers who
              assist in operating our platform.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Data Security
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure.
            </Text>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Your Rights
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal data, including:
            </Text>
            <ul className="list-disc list-inside text-neutral-11 space-y-2 ml-4">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section>
            <Text as="h2" className="text-2xl font-semibold mb-4">
              Contact Us
            </Text>
            <Text as="p" className="text-neutral-11 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@backstagepass.com.
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
