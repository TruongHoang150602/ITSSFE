import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import feedbacksApi from 'src/api/feedback';
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
      const response = await feedbacksApi.getFeedbacks();
      console.log(response);
      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const createPost = useCallback(async (newPost) => {
    try {
      const response = await feedbacksApi.createFeedback(newPost);
      getPosts();
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, posts]);

  useEffect(() => {
    getPosts();
  }, [posts, isMounted]);

  return { posts, createPost };
};


const SocialFeed = () => {
  const { posts, createPost } = usePosts();

  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Feedback
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
