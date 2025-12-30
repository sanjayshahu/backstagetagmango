import { ProfileLayoutClient } from '@/components/profile/profile-layout-client';

export default async function StageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <ProfileLayoutClient slug={slug}>{children}</ProfileLayoutClient>
  );
}
