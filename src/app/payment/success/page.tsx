import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardSection } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl p-6">
        <CardSection className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful
          </h1>

          <p className="text-neutral-8 mb-8">
            Your payment has been processed successfully. You now have access to your pass.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="bg-white text-zinc-900 hover:bg-zinc-300 rounded-full"
            >
              <Link href="/">
                Go to Home
              </Link>
            </Button>
          </div>
        </CardSection>
      </Card>
    </div>
  );
}
