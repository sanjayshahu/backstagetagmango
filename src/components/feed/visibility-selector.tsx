'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useStagePasses } from '@/hooks/use-stages';
import { useStageAccess } from '@/lib/stage-access-context';
import type { PassResponseDto } from '@backstage-pass/api';
import { GlobeHemisphereWestIcon, TicketIcon } from '@phosphor-icons/react';
import { Button } from '../ui/button';
import { MultiSelect } from '../ui/multi-select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Text } from '../ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Modal } from '@/components/modal';
import { useSession } from '@/lib/auth-client';
import { BlurryImageEffect } from '../profile/BlurryImageEffect';

type VisibilityType = 'public' | 'restricted';

interface VisibilitySelectorProps {
  stageId: string;
  selectedPassIds: string[];
  visibilityType: VisibilityType;
  /** Callback when the visibility button is clicked to open the modal */
  onOpenChange?: (isOpen: boolean) => void;
  /** Callback when pass selection validity changes (for disabling Create Post) */
  onValidityChange?: (isValid: boolean) => void;
}

interface VisibilitySelectorModalProps {
  open: boolean;
  stageId: string;
  selectedPassIds: string[];
  visibilityType: VisibilityType;
  onDone: ({passIds, visibilityType}: {passIds: string[]; visibilityType: VisibilityType}) => void;
  onClose: () => void;
  /** Callback when pass selection validity changes (for disabling Create Post) */
  onValidityChange?: (isValid: boolean) => void;
}

// export function VisibilitySelectorModal({
//   open,
//   stageId,
//   selectedPassIds: initialPassIds,
//   onDone,
//   onClose,
//   onValidityChange,
// }: VisibilitySelectorModalProps) {
//   const { data: {passes = []} = {passes: []} } = useStagePasses({ stageId });
//   const { role, subscribedPasses } = useStageAccess();
//   const { data: userData } = useSession();

//   // Determine if user is owner/admin/moderator (can see all options)
//   const isOwner = role === 'owner' || role === 'admin' || role === 'moderator';
//   const userAvatar = (userData?.user.image || '/creator_dp.png') as string;

//   // Find the ground pass for this stage
//   const groundPass = passes.find((p: PassResponseDto) => p.isGroundPass);

//   // Get available passes based on role
//   const selectablePasses = useMemo(() => {
//     if (isOwner) {
//       // Owner sees all non-ground passes for restricted option
//       return passes.filter((pass: PassResponseDto) => !pass.isGroundPass);
//     }
//     // Subscriber: only their subscribed passes with posting allowed
//     return subscribedPasses.filter((p) => p.allowSubscriberPosting);
//   }, [isOwner, passes, subscribedPasses]);

//   // Determine if selection is only the ground pass (treat as public) - only for owners
//   const isOnlyGroundPass =
//     isOwner &&
//     initialPassIds.length === 1 &&
//     groundPass &&
//     initialPassIds[0] === groundPass.id;

//   // Determine initial visibility type based on role and current selection
//   const getInitialVisibilityType = (): VisibilityType => {
//     if (!isOwner) {
//       // Subscribers always see restricted
//       return 'restricted';
//     }
//     return initialPassIds.length === 0 || isOnlyGroundPass
//       ? 'public'
//       : 'restricted';
//   };

//   const getInitialSelectedPasses = (): string[] => {
//     if (!isOwner) {
//       // For subscribers, if only one pass available, auto-select it
//       if (selectablePasses.length === 1) {
//         return [selectablePasses[0].id];
//       }
//       // Otherwise use initialPassIds if they're in selectable passes
//       return initialPassIds.filter((id) =>
//         selectablePasses.some((p) => p.id === id),
//       );
//     }
//     return isOnlyGroundPass ? [] : initialPassIds;
//   };

//   const [visibilityType, setVisibilityType] = useState<VisibilityType>(
//     getInitialVisibilityType(),
//   );
//   const [selectedPassIds, setSelectedPassIds] = useState<string[]>(
//     getInitialSelectedPasses(),
//   );

//   // Reset internal state when modal opens
//   useEffect(() => {
//     if (open) {
//       setVisibilityType(getInitialVisibilityType());
//       setSelectedPassIds(getInitialSelectedPasses());
//     }
//   }, [open]);

//   // Auto-select for subscribers with single pass
//   useEffect(() => {
//     if (
//       !isOwner &&
//       selectablePasses.length === 1 &&
//       selectedPassIds.length === 0
//     ) {
//       setSelectedPassIds([selectablePasses[0].id]);
//     }
//   }, [isOwner, selectablePasses, selectedPassIds.length]);

//   // Notify parent of validity changes
//   useEffect(() => {
//     const isValid = isOwner
//       ? visibilityType === 'public' || selectedPassIds.length > 0
//       : selectedPassIds.length > 0;
//     onValidityChange?.(isValid);
//   }, [isOwner, visibilityType, selectedPassIds, onValidityChange]);

//   const handleDone = () => {
//     if (isOwner && visibilityType === 'public') {
//       // For public visibility (owner only), use the ground pass ID
//       onDone(groundPass ? [groundPass.id] : []);
//     } else {
//       onDone(selectedPassIds);
//     }
//     onClose();
//   };

//   // Done button is disabled when restricted is selected with no passes
//   // For subscribers, they must always select a pass
//   const canDone = isOwner
//     ? visibilityType === 'public' || selectedPassIds.length > 0
//     : selectedPassIds.length > 0;

//   const handleOpenChange = (isOpen: boolean) => {
//     if (!isOpen) {
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onOpenChange={handleOpenChange}
//       showCloseButton={false}
//       wrapperClassName="p-0!"
//       className="w-full max-w-fit min-w-fit rounded-t-3xl! md:rounded-3xl! overflow-hidden p-0! bg-surface border-none"
//     >
//       {/* Content - Figma: p-12 (48px), gap-8 (32px) */}
//       <div className="relative min-w-150 max-w-150 p-6 flex flex-col gap-8">
//         {/* Cover image as background - spans full modal */}
//         <div className="absolute inset-0 overflow-hidden rounded-t-3xl md:rounded-3xl -z-1">
//           <BlurryImageEffect
//             className="h-32 w-full"
//             src={userAvatar}
//           />
//         </div>

//         {/* Header - Figma: node 4803:73563 */}
//         <div className="flex items-center justify-between">
//           <Text
//             as="h3"
//             className="font-semibold text-xl leading-7 tracking-[-0.016px] text-neutral-12"
//           >
//             {isOwner ? 'Who can see your post?' : 'Select pass for your post'}
//           </Text>
//           <Button
//             type="button"
//             onClick={handleDone}
//             disabled={!canDone}
//             className={`h-12 rounded-full px-6 text-lg font-medium leading-6.5 tracking-[-0.04px] transition-colors ${
//               canDone
//                 ? 'bg-accent-9 hover:bg-accent-10 text-[#fff]'
//                 : 'bg-neutral-alpha-3 text-neutral-alpha-8 cursor-not-allowed'
//             }`}
//           >
//             Done
//           </Button>
//         </div>

//         <div className="flex flex-col gap-3">
//           {/* Options - Figma: gap-3 (12px) between rows */}
//           {isOwner && <RadioGroup
//             value={visibilityType}
//             onValueChange={(value: string) =>
//               setVisibilityType(value as VisibilityType)
//             }
//             className="flex flex-col gap-3"
//           >
//             {/* Public option - only shown for owners */}
//             {isOwner && (
//               <label
//                 className={`w-full h-full flex rounded-3xl items-center gap-4 pl-2 pr-6 py-2 rounded-6 transition-colors text-left cursor-pointer ${
//                   visibilityType === 'public'
//                     ? 'bg-neutral-alpha-3'
//                     : 'hover:bg-neutral-alpha-3/50'
//                 }`}
//               >
//                 {/* Icon container - Figma: 64x64, p-[9px], rounded-full */}
//                 <div className="w-16 h-16 rounded-full bg-neutral-alpha-3 flex items-center justify-center shrink-0 p-2.25">
//                   <GlobeHemisphereWestIcon
//                     className="w-8 h-8 text-neutral-12"
//                     weight="fill"
//                   />
//                 </div>
//                 {/* Text content - Figma: gap-1 (4px) */}
//                 <div className="flex-1 min-w-0 flex flex-col gap-1">
//                   <Text
//                     as="span"
//                     className="font-medium text-lg leading-6.5 tracking-[-0.04px] text-neutral-12"
//                   >
//                     Visible to all followers
//                   </Text>
//                   <Text
//                     as="span"
//                     className="text-xs leading-4 tracking-[0.04px] text-neutral-alpha-11"
//                   >
//                     Best for announcements, updates, or discovery content.
//                   </Text>
//                 </div>
//                 {/* Radio - Figma: 20x20 */}
//                 <div className="h-6 flex items-center shrink-0">
//                   <RadioGroupItem value="public" />
//                 </div>
//               </label>
//             )}

//             {/* Restricted option - shown for all, but only option for subscribers */}
//             <label
//               className={`w-full h-full flex items-center gap-4 pl-2 pr-6 py-2 rounded-3xl transition-colors text-left cursor-pointer ${
//                 visibilityType === 'restricted'
//                   ? 'bg-neutral-alpha-3'
//                   : 'hover:bg-neutral-alpha-3/50'
//               }`}
//             >
//               {/* Icon container - Figma: 64x64, p-[9px], rounded-full */}
//               <div className="w-16 h-16 rounded-full bg-neutral-alpha-3 flex items-center justify-center shrink-0 p-2.25">
//                 <TicketIcon className="w-8 h-8 text-neutral-12" weight="fill" />
//               </div>
//               {/* Text content - Figma: gap-1 (4px) */}
//               <div className="flex-1 min-w-0 flex flex-col gap-1">
//                 <Text
//                   as="span"
//                   className="font-medium text-lg leading-6.5 tracking-[-0.04px] text-neutral-12"
//                 >
//                   Restricted to selected passes
//                 </Text>
//                 <Text
//                   as="span"
//                   className="text-xs leading-4 tracking-[0.04px] text-neutral-alpha-11"
//                 >
//                   Ideal for exclusive content, lessons, or member-only updates.
//                 </Text>
//               </div>
//               {/* Radio - Figma: 20x20 */}
//               <div className="h-6 flex items-center shrink-0">
//                 <RadioGroupItem value="restricted" />
//               </div>
//             </label>
//           </RadioGroup>}

//           <div className="flex flex-col gap-2 text-base pt-12 font-medium">
//             {/* Pass selection (only when restricted) - Figma: node 4803:73773 */}
//             {visibilityType === 'restricted' && (
//               <>
//                 {/* <Text className="text-neutral-12">Select pass</Text> */}
//                 <MultiSelect
//                   options={selectablePasses.map((pass) => ({
//                     value: pass.id,
//                     label: pass.name,
//                   }))}
//                   selected={selectedPassIds}
//                   onChange={setSelectedPassIds}
//                   placeholder="Select"
//                   inputContainerClass="rounded-[30px]"
//                   icon={
//                     <TicketIcon
//                       size={18}
//                       className="text-neutral-11"
//                       weight="regular"
//                     />
//                   }
//                   // maxItemsPerRow={3}
//                   filterOutSelected={true}
//                   dropdownPosition="top"
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }


export function VisibilitySelectorModalV2({
  open,
  stageId,
  selectedPassIds: initialPassIds,
  visibilityType: initialVisibilityType,
  onDone,
  onClose,
  onValidityChange,
}: VisibilitySelectorModalProps) {
  const { data: {passes = [] as PassResponseDto[]} = {passes: []} } = useStagePasses({ stageId });
  const { role, subscribedPasses } = useStageAccess();
  const { data: userData } = useSession();

  // Determine if user is owner/admin/moderator (can see all options)
  const isOwner = ['owner', 'admin', 'moderator'].includes(role ?? '');
  const userAvatar = (userData?.user.image || '/creator_dp.png') as string;

  // Get available passes based on role
  const selectablePasses = useMemo(() => {
    if (isOwner) {
      // Owner sees all non-ground passes for restricted option
      return passes.filter((pass: PassResponseDto) => !pass.isGroundPass);
    }
    // Subscriber: only their subscribed passes with posting allowed
    return subscribedPasses.filter((p) => p.allowSubscriberPosting);
  }, [isOwner, passes, subscribedPasses]);

  const [visibilityType, setVisibilityType] = useState<VisibilityType>(
    initialVisibilityType,
  );
  const [selectedPassIds, setSelectedPassIds] = useState<string[]>(
    initialPassIds,
  );

  // Reset internal state when modal opens
  useEffect(() => {
    if (open) {
      setVisibilityType(initialVisibilityType);
      setSelectedPassIds(initialPassIds);
    }
  }, [open]);

  // Auto-select for subscribers with single pass
  useEffect(() => {
    if (
      !isOwner &&
      selectablePasses.length === 1 &&
      selectedPassIds.length === 0
    ) {
      setSelectedPassIds([selectablePasses[0].id]);
    }
  }, [isOwner, selectablePasses, selectedPassIds.length]);

  // Notify parent of validity changes
  // useEffect(() => {
  //   const isValid = isOwner
  //     ? visibilityType === 'public' || selectedPassIds.length > 0
  //     : selectedPassIds.length > 0;
  //   onValidityChange?.(isValid);
  // }, [isOwner, visibilityType, selectedPassIds, onValidityChange]);

  const handleDone = () => {
    if (isOwner && visibilityType === 'public') {
      // For public visibility (owner only), use the ground pass ID
      onDone({visibilityType: 'public', passIds: []});
    } else {
      onDone({ visibilityType: 'restricted', passIds: selectedPassIds });
    }
    onClose();
  };

  // Done button is disabled when restricted is selected with no passes
  // For subscribers, they must always select a pass
  const canDone = isOwner
    ? visibilityType === 'public' || selectedPassIds.length > 0
    : selectedPassIds.length > 0;

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      showCloseButton={false}
      wrapperClassName="p-0!"
      className="w-full max-w-fit min-w-fit rounded-t-3xl! md:rounded-3xl! overflow-hidden p-0! bg-surface border-none"
    >
      {/* Content - Figma: p-12 (48px), gap-8 (32px) */}
      <div className="relative min-w-150 max-w-150 p-6 flex flex-col gap-8">
        {/* Cover image as background - spans full modal */}
        <div className="absolute inset-0 overflow-hidden rounded-t-3xl md:rounded-3xl -z-1">
          <BlurryImageEffect
            className="h-32 w-full"
            src={userAvatar}
          />
        </div>

        {/* Header - Figma: node 4803:73563 */}
        <div className="flex items-center justify-between">
          <Text
            as="h3"
            className="font-semibold text-xl leading-7 tracking-[-0.016px] text-neutral-12"
          >
            {isOwner ? 'Who can see your post?' : 'Select pass for your post'}
          </Text>
          <Button
            type="button"
            onClick={handleDone}
            disabled={!canDone}
            className={`h-12 rounded-full px-6 text-lg font-medium leading-6.5 tracking-[-0.04px] transition-colors ${
              canDone
                ? 'bg-accent-9 hover:bg-accent-10 text-[#fff]'
                : 'bg-neutral-alpha-3 text-neutral-alpha-8 cursor-not-allowed'
            }`}
          >
            Done
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Options - Figma: gap-3 (12px) between rows */}
          {isOwner && <RadioGroup
            value={visibilityType}
            onValueChange={(value: string) =>
              setVisibilityType(value as VisibilityType)
            }
            className="flex flex-col gap-3"
          >
            {/* Public option - only shown for owners */}
            {isOwner && (
              <label
                className={`w-full h-full flex rounded-3xl items-center gap-4 pl-2 pr-6 py-2 rounded-6 transition-colors text-left cursor-pointer ${
                  visibilityType === 'public'
                    ? 'bg-neutral-alpha-3'
                    : 'hover:bg-neutral-alpha-3/50'
                }`}
              >
                {/* Icon container - Figma: 64x64, p-[9px], rounded-full */}
                <div className="w-16 h-16 rounded-full bg-neutral-alpha-3 flex items-center justify-center shrink-0 p-2.25">
                  <GlobeHemisphereWestIcon
                    className="w-8 h-8 text-neutral-12"
                    weight="fill"
                  />
                </div>
                {/* Text content - Figma: gap-1 (4px) */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <Text
                    as="span"
                    className="font-medium text-lg leading-6.5 tracking-[-0.04px] text-neutral-12"
                  >
                    Visible to all followers
                  </Text>
                  <Text
                    as="span"
                    className="text-xs leading-4 tracking-[0.04px] text-neutral-alpha-11"
                  >
                    Best for announcements, updates, or discovery content.
                  </Text>
                </div>
                {/* Radio - Figma: 20x20 */}
                <div className="h-6 flex items-center shrink-0">
                  <RadioGroupItem value="public" />
                </div>
              </label>
            )}

            {/* Restricted option - shown for all, but only option for subscribers */}
            <label
              className={`w-full h-full flex items-center gap-4 pl-2 pr-6 py-2 rounded-3xl transition-colors text-left cursor-pointer ${
                visibilityType === 'restricted'
                  ? 'bg-neutral-alpha-3'
                  : 'hover:bg-neutral-alpha-3/50'
              }`}
            >
              {/* Icon container - Figma: 64x64, p-[9px], rounded-full */}
              <div className="w-16 h-16 rounded-full bg-neutral-alpha-3 flex items-center justify-center shrink-0 p-2.25">
                <TicketIcon className="w-8 h-8 text-neutral-12" weight="fill" />
              </div>
              {/* Text content - Figma: gap-1 (4px) */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <Text
                  as="span"
                  className="font-medium text-lg leading-6.5 tracking-[-0.04px] text-neutral-12"
                >
                  Restricted to selected passes
                </Text>
                <Text
                  as="span"
                  className="text-xs leading-4 tracking-[0.04px] text-neutral-alpha-11"
                >
                  Ideal for exclusive content, lessons, or member-only updates.
                </Text>
              </div>
              {/* Radio - Figma: 20x20 */}
              <div className="h-6 flex items-center shrink-0">
                <RadioGroupItem value="restricted" />
              </div>
            </label>
          </RadioGroup>}

          <div className="flex flex-col gap-2 text-base pt-12 font-medium">
            {/* Pass selection (only when restricted) - Figma: node 4803:73773 */}
            {visibilityType === 'restricted' && (
              <>
                {/* <Text className="text-neutral-12">Select pass</Text> */}
                <MultiSelect
                  options={selectablePasses.map((pass) => ({
                    value: pass.id,
                    label: pass.name,
                  }))}
                  selected={selectedPassIds}
                  onChange={setSelectedPassIds}
                  placeholder="Select"
                  inputContainerClass="rounded-[30px]"
                  icon={
                    <TicketIcon
                      size={18}
                      className="text-neutral-11"
                      weight="regular"
                    />
                  }
                  // maxItemsPerRow={3}
                  filterOutSelected={true}
                  dropdownPosition="top"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function VisibilitySelector({
  stageId,
  selectedPassIds,
  visibilityType,
  onOpenChange,
  onValidityChange,
}: VisibilitySelectorProps) {
  console.log('visibilityType in visibility selector', visibilityType);
  console.log('selectedPassIds', selectedPassIds);
  const { data:{ passes = [] } = {passes: []} } = useStagePasses({ stageId });
  const { role, subscribedPasses } = useStageAccess();

  // Determine if user is owner/admin/moderator
  const isOwner = role === 'owner' || role === 'admin' || role === 'moderator';

  // Get all selected pass names for tooltip
  const allSelectedPassNames = useMemo(() => {
    if (isOwner) {
      return selectedPassIds
        .map((id) => passes.find((p: PassResponseDto) => p.id === id)?.name)
        .filter(Boolean);
    }
    return selectedPassIds
      .map((id) => subscribedPasses.find((p) => p.id === id)?.name)
      .filter(Boolean);
  }, [isOwner, selectedPassIds, passes, subscribedPasses]);

  // Determine display text based on role
  const displayText = useMemo(() => {
    if (visibilityType === 'public') {
      return 'Public';
    }
    return allSelectedPassNames[0];
  }, [allSelectedPassNames]);

  // Notify parent of validity changes
  useEffect(() => {
    const isValid = visibilityType === 'public' || selectedPassIds.length > 0;
    onValidityChange?.(isValid);
  }, [visibilityType, selectedPassIds, onValidityChange]);

  const needsSelection = visibilityType === 'restricted' && selectedPassIds.length === 0;

  const buttonContent = (
    <Button
      type="button"
      onClick={() => onOpenChange?.(true)}
      className={`inline-flex items-center gap-2 px-3 rounded-full transition-colors text-sm h-8 ${
        needsSelection
          ? 'bg-amber-3 hover:bg-amber-4 text-amber-11'
          : 'bg-mauve-3 hover:bg-mauve-4 text-mauve-12'
      }`}
    >
      {visibilityType === 'public' ? (
        <GlobeHemisphereWestIcon
          className="w-4 h-4 text-mauve-12"
          weight="fill"
        />
      ) : (
        <TicketIcon
          size={16}
          className={needsSelection ? 'text-amber-11' : 'text-mauve-12'}
          weight="fill"
        />
      )}
      <Text as="span">{displayText}</Text>
      {selectedPassIds.length > 1 && (
        <Text as="span" className="text-mauve-11">
          +{selectedPassIds.length - 1}
        </Text>
      )}
      <ChevronDown
        className={`w-4 h-4 ${needsSelection ? 'text-amber-11' : 'text-mauve-11'}`}
      />
    </Button>
  );

  // Show tooltip only when there are multiple passes selected
  if (selectedPassIds.length > 1) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-50 flex flex-col">
          {allSelectedPassNames.map((name, index) => (
            <Text key={index} as="span" className="w-full p-2">
              {name}
            </Text>
          ))}
        </TooltipContent>
      </Tooltip>
    );
  }

  return buttonContent;
}
