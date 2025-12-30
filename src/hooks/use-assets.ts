'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { AssetResponseDto } from '@backstage-pass/api';

// ============================================================================
// Types
// ============================================================================

interface UploadAssetVariables {
  file: File;
  durationInSeconds?: number;
  passIds?: string[];
}

interface UploadAssetResult {
  asset: AssetResponseDto;
}

// ============================================================================
// API Functions
// ============================================================================

async function uploadStageAsset(
  stageId: string,
  { file, durationInSeconds, passIds }: UploadAssetVariables
): Promise<UploadAssetResult> {
  const response = await api.assetsControllerUploadV1(
    { purpose: 'post', stageId, passIds },
    { file, durationInSeconds }
  );

  // API returns array of assets, get the first one
  const assets = Array.isArray(response.data.result)
    ? response.data.result
    : [response.data.result];

  return {
    asset: assets[0],
  };
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook for uploading assets to a stage
 * Used for post media attachments
 */
export function useUploadStageAsset(stageId: string) {
  const mutation = useMutation({
    mutationFn: (variables: UploadAssetVariables) =>
      uploadStageAsset(stageId, variables),
  });

  return {
    upload: mutation.mutate,
    uploadAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

/**
 * Hook for uploading multiple assets sequentially
 * Returns progress and results for all uploads
 */
export function useUploadMultipleAssets(stageId: string) {
  const { uploadAsync, isPending, isError, error, reset } =
    useUploadStageAsset(stageId);

  const uploadMultiple = async (
    files: File[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<AssetResponseDto[]> => {
    const results: AssetResponseDto[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await uploadAsync({ file });
      results.push(result.asset);
      onProgress?.(i + 1, files.length);
    }

    return results;
  };

  return {
    uploadMultiple,
    isPending,
    isError,
    error,
    reset,
  };
}
