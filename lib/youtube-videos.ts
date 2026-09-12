export const youtubeVideos = {
  agora: {
    id: '4Lr4lqt2Zlo',
    url: 'https://www.youtube.com/watch?v=4Lr4lqt2Zlo',
  },
  metis: {
    id: 'cmJ8nYdlJyw',
    url: 'https://www.youtube.com/watch?v=cmJ8nYdlJyw',
  },
  aegis: {
    id: '7qNdqUu_MP8',
    url: 'https://www.youtube.com/watch?v=7qNdqUu_MP8',
  },
  ergane: {
    id: 'KJEdMybjEYc',
    url: 'https://www.youtube.com/watch?v=KJEdMybjEYc',
  },
  pallas: {
    id: '4GCIG5fQHQA',
    url: 'https://www.youtube.com/watch?v=4GCIG5fQHQA',
  },
  glaux: {
    id: 'uGWoA9dPacg',
    url: 'https://www.youtube.com/watch?v=uGWoA9dPacg',
  },
} as const;

export function getYoutubeVideo(slug: string) {
  return slug in youtubeVideos
    ? youtubeVideos[slug as keyof typeof youtubeVideos]
    : null;
}
