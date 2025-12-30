import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Backstage Pass',
  description: 'Read the terms and conditions for using the Backstage Pass platform.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
