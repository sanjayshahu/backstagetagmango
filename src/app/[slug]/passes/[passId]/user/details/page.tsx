'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useStageAccess } from '@/lib/stage-access-context';
import { usePass, useJoinPass } from '@/hooks';
import { PassCreatedSuccess } from '@/components/pass/pass-created-success';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils';
import { PassTheme } from '@/components/passes/utils';

// Type for the price object from API
interface PassPrice {
  usdCents?: number;
  inrPaise?: number;
}

export default function PassDetailsPage() {
  const params = useParams<{ slug: string; passId: string }>();
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);

  const { stage, isLoading: stageLoading } = useStageAccess();
  const {
    data: pass,
    isLoading: passLoading,
    error: passError,
  } = usePass(stage?.id || '', params.passId);

  const { joinPassAsync, isPending: isJoining } = useJoinPass();

  // Show loading while stage is loading, or while pass is loading after stage is available
  const isLoading = stageLoading || (!!stage?.id && passLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Handle stage not found
  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive">Stage not found</div>
      </div>
    );
  }

  // Handle pass not found
  if (passError || !pass) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive">Pass not found</div>
      </div>
    );
  }

  // Theme is a required field from API, cast to PassTheme
  const theme: PassTheme = pass.theme;

  // Get description as string (API types it as object but it's actually a string)
  const description = (pass.description as unknown as string) || '';

  // Calculate price display (price is typed as object but is actually { usdCents?, inrPaise? })
  const priceObj = pass.price as unknown as PassPrice;
  const priceType = pass.recurringType === 'recurring' ? 'recurring' : 'one-time';


  const handleJoinPass = async () => {
    if (isJoining || isJoined) return;

    try {
      const result = await joinPassAsync(params.passId);

      if (result.type === 'redirect') {
        // Paid pass - redirect to Stripe payment page
        window.location.href = result.url;
      } else {
        // Free pass - subscription created
        setIsJoined(true);
        toast.success('Successfully joined the pass!');
        // Navigate to stage page after a short delay
        setTimeout(() => {
          router.push(`/${params.slug}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to join pass: ', error)
      // const err = error as { statusCode?: number; message?: string };
      // if (err.statusCode === 409) {
      //   toast.error('You are already subscribed to this pass');
      // } else if (err.statusCode === 401) {
      //   toast.error('Please sign in to join this pass');
      // } else if (err.statusCode === 400) {
      //   toast.error('This pass is not available for purchase');
      // } else {
      //   toast.error(err.message || 'Failed to join pass');
      // }
    }
  };

  const handleSkip = () => {
    router.push(`/${params.slug}/passes`);
  };

  return (
    <PassCreatedSuccess
      pass={{
        name: pass.name,
        description,
        price: formatPrice({price: priceObj, priceType: pass.passType}).formattedString,
        priceType: priceType as 'onetime' | 'recurring',
        theme,
      }}
      onJoinPass={handleJoinPass}
      onSkip={handleSkip}
    />
  );
}
