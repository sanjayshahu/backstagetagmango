'use client';
import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useStagePasses } from '@/hooks/use-stages';
import { useStageAccess } from '@/lib/stage-access-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
export type PostedByFilter = 'everyone' | 'me' | 'owner';
interface PostFiltersProps {
  selectedPassIds: string[];
  selectedPostedBy: PostedByFilter;
  onPassIdsChange: (passIds: string[]) => void;
  onPostedByChange: (postedBy: PostedByFilter) => void;
}
export function PostFilters({
  selectedPassIds,
  selectedPostedBy,
  onPassIdsChange,
  onPostedByChange,
}: PostFiltersProps) {
  const { stage, role, subscribedPasses } = useStageAccess();
  // Owner, Admin, Moderator all have same access level
  const isAdmin = role === 'owner' || role === 'admin' || role === 'moderator';
  // For members: fetch all passes; For subscribers: use context directly
  const { data: { passes: allPasses = [] } = { passes: [] } } = useStagePasses(
    { stageId: stage.id },
    { enabled: isAdmin && !!stage.id },
  );
  const displayPasses = useMemo(() => {
    if (isAdmin) return allPasses;
    return subscribedPasses; // Use directly - same structure, no mapping needed
  }, [isAdmin, allPasses, subscribedPasses]);
  // Posted By options based on role
  const postedByOptions = useMemo(() => {
    if (isAdmin) {
      return [
        { value: 'everyone' as PostedByFilter, label: 'Everyone' },
        { value: 'me' as PostedByFilter, label: 'Me' },
      ];
    }
    return [
      { value: 'everyone' as PostedByFilter, label: 'Everyone' },
      { value: 'owner' as PostedByFilter, label: 'Owner' },
      { value: 'me' as PostedByFilter, label: 'Me' },
    ];
  }, [isAdmin]);
  const getPassDisplayText = () => {
    if (selectedPassIds.length === 0) return 'All Passes';
    if (selectedPassIds.length === 1) {
      return (
        displayPasses.find((p) => p.id === selectedPassIds[0])?.name || '1 Pass'
      );
    }
    return `${selectedPassIds.length} Passes`;
  };
  const getPostedByDisplayText = () => {
    if (selectedPostedBy === 'me') return 'Me';
    if (selectedPostedBy === 'owner') return 'Creator';
    return 'Everyone';
  };
  const togglePass = (passId: string) => {
    if (selectedPassIds.includes(passId)) {
      onPassIdsChange(selectedPassIds.filter((id) => id !== passId));
    } else {
      onPassIdsChange([...selectedPassIds, passId]);
    }
  };
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Pass Filter */}
      <div className="flex items-center gap-1">
        <Text as="span" className="text-sm text-neutral-alpha-11">
          Showing posts from
        </Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              requireAuth={false}
              className="flex items-center gap-1 p-1 rounded hover:bg-accent transition-colors h-auto text-black"
            >
              <Text as="span" className="text-sm font-medium">
                {getPassDisplayText()}
              </Text>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {/* All Passes option */}
            <DropdownMenuCheckboxItem
              checked={selectedPassIds.length === 0}
              onCheckedChange={() => onPassIdsChange([])}
            >
              All Passes
            </DropdownMenuCheckboxItem>
            {displayPasses.length > 0 && (
              <>
                <DropdownMenuSeparator />
                {displayPasses.map((pass) => (
                  <DropdownMenuCheckboxItem
                    key={pass.id}
                    checked={selectedPassIds.includes(pass.id)}
                    onCheckedChange={() => togglePass(pass.id)}
                  >
                    {pass.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </>
            )}
            {displayPasses.length === 0 && (
              <Text className="px-2 py-1.5 text-sm text-muted-foreground">
                No passes available
              </Text>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Posted By Filter */}
      <div className="flex items-center gap-1">
        <Text as="span" className="text-sm text-neutral-alpha-11">
          Posted by
        </Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              requireAuth={false}
              className="flex items-center gap-1 p-1 rounded transition-colors h-auto text-black"
            >
              <Text as="span" className="text-sm font-medium">
                {getPostedByDisplayText()}
              </Text>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuRadioGroup
              value={selectedPostedBy}
              onValueChange={(value) => onPostedByChange(value as PostedByFilter)}
            >
              {postedByOptions.map(({ value, label }) => (
                <DropdownMenuRadioItem key={value} value={value}>
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
