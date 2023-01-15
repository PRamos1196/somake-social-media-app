import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '99vt0lre',
  dataset: 'production',
  apiVersion: '2023-01-15',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
