import {
    TechRadarApi,
    TechRadarLoaderResponse,
  } from '@backstage/plugin-tech-radar';
  
  export class TechRadar implements TechRadarApi {
    async load(id: string | undefined): Promise<TechRadarLoaderResponse> {
      // if needed id prop can be used to fetch the correct data
  
      const data = await fetch('https://codeiain.github.io/tech.json').then(res => res.json());
  
      // For example, this converts the timeline dates into date objects
      return {
        ...data,
        entries: data.entries.map((entry: { timeline: any[]; }) => ({
          ...entry,
          timeline: entry.timeline.map(timeline => ({
            ...timeline,
            date: new Date(timeline.date),
          })),
        })),
      };
    }
  }