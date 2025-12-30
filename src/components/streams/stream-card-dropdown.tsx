'use client';

import * as React from 'react';
import { MoreHorizontal, Pencil, Eye, Link, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ============================================
// Type Definitions
// ============================================

export interface StreamCardDropdownProps {
  streamId: string;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
  onCopyLink?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  isLive?: boolean;
}

// ============================================
// Main Component
// ============================================

export function StreamCardDropdown({
  streamId,
  onEdit,
  onCancel,
  onCopyLink,
  onViewDetails,
  isLive = false,
}: StreamCardDropdownProps) {
  const handleEdit = React.useCallback(() => {
    onEdit?.(streamId);
  }, [onEdit, streamId]);

  const handleCancel = React.useCallback(() => {
    onCancel?.(streamId);
  }, [onCancel, streamId]);

  const handleCopyLink = React.useCallback(() => {
    onCopyLink?.(streamId);
  }, [onCopyLink, streamId]);

  const handleViewDetails = React.useCallback(() => {
    onViewDetails?.(streamId);
  }, [onViewDetails, streamId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          requireAuth={false}
          className="w-8 h-8 rounded-full hover:bg-black/5"
          aria-label="Stream options"
        >
          <MoreHorizontal className="w-5 h-5 text-neutral-12" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {!isLive && onEdit && (
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Stream
          </DropdownMenuItem>
        )}
        {onViewDetails && (
          <DropdownMenuItem onClick={handleViewDetails}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </DropdownMenuItem>
        )}
        {onCopyLink && (
          <DropdownMenuItem onClick={handleCopyLink}>
            <Link className="w-4 h-4 mr-2" />
            Copy stream link
          </DropdownMenuItem>
        )}
        {!isLive && onCancel && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCancel} variant="destructive">
              <X className="w-4 h-4 mr-2" />
              Cancel Stream
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
