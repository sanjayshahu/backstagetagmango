'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Info, RefreshCw } from 'lucide-react';
import { useSkeletonLoading } from '@/lib/skeleton-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreatePass, useUpdatePass } from '@/hooks/use-stages';
import { cn } from '@/lib/utils';
import { ThemeSelector } from './components/theme-selector';
import { DescriptionModal } from './components/description-modal';
import {
  PASS_TYPES,
  BILLING_CYCLES,
  DURATION_DAYS_MAP,
  mapApiToUIPassType,
  mapDurationToBillingCycle,
  type PassTheme,
  type UIPassType,
  type BillingCycle,
  type PassFormProps,
  PassImage,
} from '../utils';
import { CompassIcon, ReceiptIcon, TicketIcon } from '@phosphor-icons/react';
import { useStageAccess } from '@/lib/stage-access-context';

// Disabled Field Info Tooltip Component
function DisabledFieldTooltip({ message }: { message: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="ml-2 size-4 cursor-help text-neutral-alpha-11" />
        </TooltipTrigger>
        <TooltipContent>
          <Text as="p" className="text-sm text-white">{message}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


export function PassForm({ mode, stageId, initialData, passId }: PassFormProps) {
  const router = useRouter();
  const passNameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const isLoading = useSkeletonLoading();

  // Mutations
  const { createPassAsync, isPending: isCreating } = useCreatePass();
  const { updatePassAsync, isPending: isUpdating } = useUpdatePass();

  const isPending = mode === 'create' ? isCreating : isUpdating;

  // Focus input after loading completes
  useEffect(() => {
    if (!isLoading && passNameInputRef.current) {
      passNameInputRef.current.focus();
    }
  }, [isLoading]);

  // Form state
  const [selectedTheme, setSelectedTheme] = useState<PassTheme>('silver');
  const [passName, setPassName] = useState('');
  const [description, setDescription] = useState('');
  const [passType, setPassType] = useState<UIPassType>('free');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [price, setPrice] = useState('');
  const [allowUserPosts, setAllowUserPosts] = useState(false);

  // Modal states
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

  // Select dropdown open states
  const [passTypeOpen, setPassTypeOpen] = useState(false);
  const [billingCycleOpen, setBillingCycleOpen] = useState(false);

  // Determine disabled states for edit mode
  const isEditMode = mode === 'edit';
  const isRecurringPass = initialData?.recurringType === 'recurring';

  // Disabled field states
  const passTypeDisabled = isEditMode;
  const billingCycleDisabled = isEditMode;
  const priceDisabled = isEditMode && isRecurringPass;

  const { stage } = useStageAccess()

  const passListUrl = `/${stage.slug}/passes`

  // Pre-populate form data in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setSelectedTheme((initialData.theme as PassTheme) || 'silver');
      setPassName(initialData.name);
      setDescription((initialData.description as unknown as string) || '');
      setPassType(mapApiToUIPassType(initialData.passType, initialData.recurringType));

      const priceObj = initialData.price as { usdCents?: number; inrPaise?: number } | null;
      if (priceObj?.usdCents) {
        setPrice((priceObj.usdCents / 100).toString());
      }

      setBillingCycle(mapDurationToBillingCycle(initialData.durationDays as unknown as number));
      setAllowUserPosts(initialData.allowSubscriberPosting);
    }
  }, [mode, initialData]);

  // Open handlers
  const handleOpenDescriptionModal = useCallback(() => {
    setDescriptionModalOpen(true);
  }, []);

  // Check if form is valid
  const isFormValid = passName.trim().length > 0 && (passType === 'free' || price.trim().length > 0);

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid || !stageId) return;

    const apiPassType = passType === 'free' ? 'free' : 'paid';
    const apiRecurringType = passType === 'subscription' ? 'recurring' : 'onetime';

    const priceInCents = passType !== 'free' && price
      ? Math.round(parseFloat(price) * 100)
      : undefined;

    try {
      if (mode === 'edit' && passId) {
        await updatePassAsync({
          stageId,
          passId,
          data: {
            name: passName,
            description: description || undefined,
            ...(!priceDisabled && passType !== 'free' && {
              price: priceInCents ? { usdCents: priceInCents } : undefined,
            }),
            allowSubscriberPosting: allowUserPosts,
            theme: selectedTheme,
          },
        });

        handleBack()
      } else {
        const res = await createPassAsync({
          stageId,
          name: passName,
          description: description || undefined,
          passType: apiPassType,
          recurringType: apiRecurringType,
          price: priceInCents ? { usdCents: priceInCents } : undefined,
          durationDays: passType === 'subscription' ? DURATION_DAYS_MAP[billingCycle] : undefined,
          allowSubscriberPosting: allowUserPosts,
          theme: selectedTheme,
        });
        const successPage = `/${stage.slug}/passes/${res.id}/success`
        router.push(successPage)
      }

    } catch (err) {
      console.error(`Failed to ${mode} pass:`, err);
    }
  };

  const handleBack = () => {
    router.push(passListUrl);
  };

  return (
    <>
      {/* Background with blur */}
      <PassImage theme={selectedTheme} className='absolute inset-0' blur />
      {/* Main content */}
      <div className='relative z-10 h-[calc(100vh-60px)]'>
        <div className="mx-auto flex max-w-[428px] flex-col items-center px-4 pb-16 pt-3">
          {/* Theme Selector */}
          <ThemeSelector
            selectedTheme={selectedTheme}
            onSelect={setSelectedTheme}
          />

          {/* Form Fields */}
          <div className="mt-12 flex w-full flex-1 flex-col gap-4">
            {/* Pass Name Input */}

            <Input
              ref={passNameInputRef}
              value={passName}
              onChange={(e) => setPassName(e.target.value)}
              placeholder="Pass Name"
              maxLength={100}
              className="h-[60px] rounded-full px-6 bg-neutral-alpha-3 border-0 text-2xl font-medium leading-[30px] text-neutral-12 placeholder:text-neutral-alpha-11 focus:placeholder:text-neutral-alpha-8 focus:outline-none"
            />

            {/* Add Description */}
            <Button
              type="button"
              onClick={handleOpenDescriptionModal}
              className="flex h-[60px] w-full items-center gap-3 rounded-full bg-neutral-alpha-3 px-6 transition-colors hover:bg-neutral-alpha-4 focus:outline-none"
            >
              <ReceiptIcon className="size-5 text-static-neutral-alpha-11" weight='fill' />
              <Text as="span" className={cn(
                'flex-1 text-left text-base leading-6',
                description ? 'text-neutral-12' : 'text-neutral-alpha-11'
              )}>
                {description ? description.slice(0, 35) + (description.length > 35 ? '...' : '') : 'Add Description'}
              </Text>
            </Button>

            {/* Pass Type Selector */}
            <div
              className={cn(
                'flex h-[60px] w-full items-center gap-3 rounded-full bg-neutral-alpha-3 px-6',
                passTypeDisabled ? 'opacity-60 cursor-default' : 'cursor-pointer'
              )}
              onClick={() => !passTypeDisabled && setPassTypeOpen(true)}
            >
              <TicketIcon className="size-5 text-neutral-alpha-11" weight='fill' />
              <Text as="span" className="flex-1 text-base leading-6 text-neutral-alpha-11">
                Pass Type
              </Text>
              <div className="flex items-center gap-1">
                {passTypeDisabled ? (
                  <>
                    <Text as="span" className="text-base font-medium leading-6 text-neutral-12">
                      {PASS_TYPES.find((t) => t.value === passType)?.label || 'Free'}
                    </Text>
                    <DisabledFieldTooltip message="Pass type cannot be changed after creation" />
                  </>
                ) : (
                  <Select
                    open={passTypeOpen}
                    onOpenChange={setPassTypeOpen}
                    value={passType}
                    onValueChange={(value: UIPassType) => {
                      setPassType(value);
                      if (value === 'free') {
                        setPrice('');
                      }
                    }}
                  >
                    <SelectTrigger className="h-auto w-auto gap-1 border-0 bg-transparent p-0 text-base font-medium leading-6 text-neutral-12 shadow-none focus-visible:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='bg-white text-black'>
                      {PASS_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value} indicatorStyle="radio">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Price Input - Only shown for non-free passes */}
            {passType !== 'free' && (
              <div className="overflow-hidden rounded-3xl bg-neutral-alpha-3">
                {/* Billing Cycle Row - Only for subscription */}
                {passType === 'subscription' && (
                  <>
                    <div
                      className={cn(
                        'flex h-[60px] items-center gap-3 px-6',
                        billingCycleDisabled ? 'opacity-60 cursor-default' : 'cursor-pointer'
                      )}
                      onClick={() => !billingCycleDisabled && setBillingCycleOpen(true)}
                    >
                      <RefreshCw className="size-5 text-neutral-alpha-11" />
                      <Text as="span" className="flex-1 text-base leading-6 text-neutral-alpha-11">
                        Billing Cycle
                      </Text>
                      <div className="flex items-center gap-1">
                        {billingCycleDisabled ? (
                          <>
                            <Text as="span" className="text-base font-medium leading-6 text-neutral-12">
                              {BILLING_CYCLES.find((c) => c.value === billingCycle)?.label || 'Monthly'}
                            </Text>
                            <DisabledFieldTooltip message="Billing cycle cannot be changed after creation" />
                          </>
                        ) : (
                          <Select
                            open={billingCycleOpen}
                            onOpenChange={setBillingCycleOpen}
                            value={billingCycle}
                            onValueChange={(value: BillingCycle) => setBillingCycle(value)}
                          >
                            <SelectTrigger className="h-auto w-auto gap-1 border-0 bg-transparent p-0 text-base font-medium leading-6 text-neutral-12 shadow-none focus-visible:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {BILLING_CYCLES.map((cycle) => (
                                <SelectItem key={cycle.value} value={cycle.value} indicatorStyle="radio">
                                  {cycle.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                    <div className="mx-6 h-px bg-neutral-alpha-6" />
                  </>
                )}

                {/* Price Input Row */}
                <div
                  className={cn(
                    'flex h-[60px] items-center gap-3 px-6',
                    priceDisabled ? 'opacity-60 cursor-default' : 'cursor-text'
                  )}
                  onClick={() => !priceDisabled && priceInputRef.current?.focus()}
                >
                  <DollarSign className="size-5 text-static-neutral-alpha-11" />
                  <Text as="span" className="flex-1 text-base leading-6 text-static-neutral-alpha-11">
                    Price
                  </Text>
                  {priceDisabled ? (
                    <div className="flex items-center gap-1">
                      <Text as="span" className="text-base font-semibold text-static-neutral-alpha-11">
                        ${price || '0'}
                      </Text>
                      <DisabledFieldTooltip message="Price cannot be changed for recurring passes" />
                    </div>
                  ) : (
                    <Input
                      ref={priceInputRef}
                      type="text"
                      inputMode="decimal"
                      value={price}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow digits and one decimal point
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          setPrice(value);
                        }
                      }}
                      placeholder="Enter Price"
                      className="p-0 rounded-none h-auto w-32 border-0 bg-transparent text-right text-base font-semibold leading-6 text-static-neutral-12 placeholder:text-static-neutral-alpha-11 focus:placeholder:text-neutral-alpha-8 focus-visible:ring-0 caret-static-neutral-12"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Allow Users to Post */}
            <div
              className="flex h-[60px] cursor-pointer items-center gap-3 rounded-full bg-static-neutral-alpha-3 px-6"
              onClick={() => setAllowUserPosts(!allowUserPosts)}
            >
              <CompassIcon className="size-5 text-static-neutral-alpha-11" weight='fill' />
              <Text as="span" className="flex-1 text-base leading-6 text-static-neutral-alpha-11">
                Allow users to post on feed
              </Text>
              <Switch
                checked={allowUserPosts}
                onCheckedChange={setAllowUserPosts}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex w-full flex-col gap-4 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isPending || !stageId}
              requireAuth={false}
              className={cn(
                'h-12 w-full rounded-full text-lg font-medium leading-[26px] transition-all',
                isFormValid && !isPending && stageId
                  ? 'bg-static-white text-static-neutral-1 hover:bg-static-neutral-2'
                  : 'cursor-not-allowed bg-static-neutral-alpha-3 text-[rgba(238,231,255,0.36)]'
              )}
            >
              {isPending
                ? (mode === 'edit' ? 'Saving...' : 'Creating...')
                : (mode === 'edit' ? 'Save Changes' : 'Create Pass')
              }
            </Button>
            <Button
              onClick={handleBack}
              variant="ghost"
              requireAuth={false}
              className="h-12 w-full rounded-full text-lg font-normal leading-[26px] text-static-neutral-12 hover:bg-static-neutral-alpha-3"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      <DescriptionModal
        isOpen={descriptionModalOpen}
        onClose={() => setDescriptionModalOpen(false)}
        initialDescription={description}
        onSave={setDescription}
      />
    </>
  );
}

export type { PassFormProps };
