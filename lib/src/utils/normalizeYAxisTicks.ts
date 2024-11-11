import type { Scale } from "../types";

// This function aligns a secondary Y scale's ticks to the primary Y scale's ticks so that the ticks on either side of the chart are drawn on the same lines.
export const normalizeYAxisTicks = (
  primaryTicks: number[],
  primaryYScale: Scale,
  yScale: Scale,
  requestedTickCount?: number
) => {
  // Get all possible normalized ticks
  const allNormalizedTicks = primaryTicks.map((tick) => 
    yScale.invert(primaryYScale(tick))
  );

  // If no specific tick count requested, return all ticks
  if (!requestedTickCount) {
    return allNormalizedTicks;
  }

  // If requested fewer ticks, return evenly spaced subset
  if (requestedTickCount < primaryTicks.length) {
    const step = Math.floor(allNormalizedTicks.length / (requestedTickCount - 1));
    const result: number[] = [];
    
    // Always include first and last tick
    for (let i = 0; i < allNormalizedTicks.length; i += step) {
      result.push(allNormalizedTicks[i]!);
      if (result.length === requestedTickCount - 1) break;
    }
    result.push(allNormalizedTicks[allNormalizedTicks.length - 1]!);
    
    return result;
  }

  return allNormalizedTicks;
};
