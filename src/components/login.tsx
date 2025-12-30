'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { AvatarComponent } from '@/components/avatar-component';
import { OTP } from '@/components/ui/otp';
import { Text } from '@/components/ui/text';
import { Modal } from '@/components/modal';
import { emailOtp, signIn } from '@/lib/auth-client';
import { useStage } from '@/hooks/use-stages';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import GoogleIcon from '../../public/google-icon.svg';
import AppleIcon from '../../public/icons/apple_logo.svg';
import AppleIconDark from '../../public/icons/apple_logo_dark.svg';
import { BlurryImageEffect } from './profile/BlurryImageEffect';
import { cn } from '@/lib/utils';
import { useTheme } from '@/stores/useTheme';

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function Login({ open, onOpenChange }: LoginProps) {
  const router = useRouter();
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;
  const { theme } = useTheme()

  // Fetch stage data only if slug exists
  const { data: stage, isLoading: stageLoading } = useStage(slug ?? '', {
    enabled: !!slug,
  });

  const stageId = stage?.id;
  const stageImage = (stage?.image || '/creator_dp.png') as string

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'initial' | 'otp'>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Reset all states when modal closes
  useEffect(() => {
    if (!open) {
      setEmail('');
      setOtp('');
      setStep('initial');
      setIsLoading(false);
      setError(null);
      setResendTimer(0);
    }
  }, [open]);

  // Start the resend timer
  const startResendTimer = useCallback(() => {
    setResendTimer(60);
  }, []);

  // Countdown effect for resend timer
  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (stageId) {
        // Extract parent domain for cross-subdomain cookie sharing
        // e.g., "web.dev.bpasses.com" -> ".bpasses.com"
        // For localhost, don't set domain attribute
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

        let cookieString = `pending_stage_id=${stageId}; path=/; max-age=600; SameSite=Lax`;

        if (!isLocalhost) {
          // Extract parent domain (last two segments for standard TLDs)
          const parts = hostname.split('.');
          const parentDomain = parts.length >= 2
            ? '.' + parts.slice(-2).join('.')
            : hostname;
          cookieString += `; domain=${parentDomain}; Secure`;
        }

        document.cookie = cookieString;
      }

      await signIn.social({
        provider: 'google',
        callbackURL: window.location.origin + window.location.pathname,
      });
    } catch {
      setError('Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
        ...(stageId && { stageId: stageId }),
      } as Parameters<typeof emailOtp.sendVerificationOtp>[0] & {
        stageId?: string;
      });

      if (result.error) {
        setError(result.error.message || 'Failed to send OTP');
      } else {
        setStep('otp');
        startResendTimer();
      }
    } catch {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn.emailOtp({
        email,
        otp,
      });

      if (result.error) {
        setError(result.error.message || 'Invalid OTP');
      } else {
        onOpenChange(false);
        // Remove query params, stay on current path
        const currentPath = window.location.pathname;
        router.replace(currentPath);
      }
    } catch {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
        ...(slug && { stageId: slug }),
      } as Parameters<typeof emailOtp.sendVerificationOtp>[0] & {
        stageId?: string;
      });

      if (result.error) {
        setError(result.error.message || 'Failed to resend OTP');
      } else {
        startResendTimer();
      }
    } catch {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('initial');
    setOtp('');
    setError(null);
    setResendTimer(0);
  };

  const isInitialStep = step === 'initial'
  const canVerifyCode = !isLoading && otp.length === 6

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={isInitialStep}
      dismissible={isInitialStep}
      className='max-w-fit sm:max-w-fit items-center'
      wrapperClassName="p-0!"
    >
      <div className={cn(
        'relative w-full overflow-hidden h-full bg-neutral-2 rounded-2xl',
        isInitialStep ? 'max-w-120' : 'min-w-150'
      )}>
        <div className="absolute inset-x-0 top-0 overflow-hidden rounded-t-2xl md:rounded-t-2xl">
          <BlurryImageEffect
            className="h-45 w-full"
            src={stageImage}
            lightGradientColor='#FAF9FB'
            darkGradientColor='#1A191B'
          />
        </div>
        {isInitialStep ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 relative">
            {/* Stage Avatar with glow - only shown when slug exists and stage is loaded */}
            {slug && stage && !stageLoading && (
              <>
                <AvatarComponent
                  src={(stage.image as string | null) || (stage.owner.image as string | null)}
                  username={stage.name}
                  size="size-28"
                />

                {/* Stage Info */}
                <div className="text-center space-y-2">
                  <Text className="text-2xl font-semibold">{stage.name}</Text>
                  <Text className="text-neutral-alpha-11 text-base">
                    {formatCount(stage.subscribersCount)} Joined
                  </Text>
                </div>
              </>
            )}

            {/* Info text */}
            <Text className="text-sm text-center max-w-sm">
              You are viewing free content. Signup to continue & engage
            </Text>

            {/* Login Form */}
            <div className="w-full space-y-4">
              {/* Google Button */}
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 bg-neutral-alpha-3 hover:bg-neutral-alpha-4 text-neutral-12 border-0 rounded-full text-lg font-medium gap-3"
                requireAuth={false}
              >
                <Image src={GoogleIcon} alt="Google" className="size-5" />
                Continue with Google
              </Button>

              {/* Apple Button */}
              <Button
                type="button"
                disabled={isLoading}
                className="w-full h-12 bg-neutral-alpha-3 hover:bg-neutral-alpha-4 text-neutral-12 border-0 rounded-full text-lg font-medium gap-3"
                requireAuth={false}
              >
                {theme === 'light' && <Image src={AppleIcon} alt="Apple" className="size-5" />}
                {theme === 'dark' && <Image src={AppleIconDark} alt="Apple_Dark" className="size-5" />}

                Continue with Apple
              </Button>

              {/* Divider */}
              <Text className="text-center text-lg">or</Text>

              {/* Email Form */}
              <form onSubmit={handleSendOtp} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                  className="w-full h-12 bg-white border-neutral-alpha-5 text-neutral-12 placeholder:text-neutral-alpha-9 rounded-full px-4 text-base"
                />

                {error && (
                  <Text className="text-red-9 text-sm text-center">{error}</Text>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full h-12 bg-neutral-12 hover:bg-neutral-11 text-neutral-1 rounded-full text-lg font-medium"
                  requireAuth={false}
                >
                  {isLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>
            </div>

            {/* Terms */}
            <Text className="text-neutral-alpha-11 text-xs text-center">
              By continuing, you agree to Backstage Pass&apos;s{' '}
              <Link href="/terms" target='_blank' className="text-neutral-12 underline font-semibold">
                Terms
              </Link>
              {' & '}
              <Link href="/privacy" target='_blank' className="text-neutral-12 underline font-semibold">
                Privacy
              </Link>
            </Text>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 px-12 py-12 relative min-w-150">
            {/* Back button */}
            <div onClick={handleBack} className="absolute text-black left-4 top-5 bg-neutral-alpha-3 hover:bg-neutral-alpha-6 p-2 cursor-pointer rounded-full">
              <ArrowLeft className="size-6" />
              <span className="sr-only">Back</span>
            </div>

            {/* OTP Header */}
            <div className="text-center space-y-2 pt-6">
              <Text className="font-bold tracking-tight leading-9 text-black text-[28px]">
                Enter verification code
              </Text>
              <Text className="text-neutral-alpha-11 text-base max-w-sm">
                Your email is used for login, security alerts, and important updates.
              </Text>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerifyOtp} className="w-full space-y-6">
              <Text className="text-neutral-alpha-11 text-sm text-center">
                We sent a 6-digit code to <Text as='span' className='font-medium'>{email}</Text>
              </Text>

              {/* OTP Input using shadcn InputOTP */}
              <div className="flex justify-center py-2">
                <OTP autoFocus value={otp} onChange={setOtp} disabled={isLoading} slotClassName='h-11.25 w-11.25 border-neutral-6 rounded-2xl! border! text-neutral-12 text-[20px] ring-0!' />
              </div>

              {error && (
                <Text className="text-red-9 text-sm text-center">{error}</Text>
              )}

              <Button
                type="submit"
                disabled={!canVerifyCode}
                className={`w-full h-12 bg-neutral-12 hover:bg-neutral-11 text-neutral-alpha-8 rounded-full text-lg font-medium ${canVerifyCode ? 'text-neutral-1' : 'bg-neutral-alpha-3'}`}
                requireAuth={false}
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  'Verify code'
                )}
              </Button>

              {/* Resend */}
              <div className="flex gap-4 justify-center">
                {resendTimer > 0 ? (
                  <Text className="text-neutral-alpha-11 text-sm">
                    Resend code in <span className="tabular-nums inline-block w-5 text-left">{resendTimer}s</span>
                  </Text>
                ) : (
                  <Text
                    as='div'
                    onClick={handleResendCode}
                    className={`text-neutral-12 text-sm font-semibold border-neutral-12 border-b border-dashed hover:text-neutral-alpha-11 cursor-pointer transition-colors ${isLoading && 'text-neutral-alpha-11'}`}
                  >
                    Resend Code
                  </Text>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
}
