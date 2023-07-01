import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { socialApi } from 'src/api/social';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SocialPostAdd } from 'src/sections/social/social-post-add';
import { SocialPostCard } from 'src/sections/social/social-post-card';

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await socialApi.getFeed();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getPosts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return posts;
};

const SocialFeed = () => {
  const posts = usePosts();

  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Social Feed | Devias Kit PRO
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Feedback
            </Typography>
            <Typography variant="h4">
              Feedback for you to get a better service experience
            </Typography>
          </Stack>
          <Stack
            spacing={3}
            sx={{ mt: 3 }}
          >
            <SocialPostAdd />
            {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                media={post.media}
                message={post.message}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

SocialFeed.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SocialFeed;
