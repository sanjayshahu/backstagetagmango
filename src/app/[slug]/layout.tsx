import { StageAccessProvider } from '@/lib/stage-access-context';

export default async function StageLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <StageAccessProvider slug={slug}>
            {children}
        </StageAccessProvider>
    );
}
