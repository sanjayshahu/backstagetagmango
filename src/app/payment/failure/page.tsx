import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardSection } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-white/5 border-white/10 backdrop-blur-sm">
        <CardSection className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Failed
          </h1>

          <p className="text-zinc-400 mb-8">
            Something went wrong with your payment. Please try again or contact support if the issue persists.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full"
            >
              <Link href="/">
                Go to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-full"
            >
              <Link href="/">
                Try Again
              </Link>
            </Button>
          </div>
        </CardSection>
      </Card>
    </div>
  );
}
