/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QualityOption {
  id: string;
  name: string;
  resolution: string;
  size: string;
  recommendation: string;
  icon: string;
}

export interface Episode {
  id: number;
  title: string;
  type: 'regular' | 'unseen-bits' | 'aftersun' | 'reunion';
  duration: string;
  size: string;
  rating: number;
  airDate: string;
}

export interface SyncStep {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

export type DownloadPackType = 'complete' | 'selective' | 'specials';
export type FormatOption = 'mkv' | 'mp4';
