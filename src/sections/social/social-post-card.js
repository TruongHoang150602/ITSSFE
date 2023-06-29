import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import { SocialComment } from './social-comment';
import { SocialCommentAdd } from './social-comment-add';

export const SocialPostCard = (props) => {
  const {
    authorAvatar,
    authorName,
    comments,
    createdAt,
    isLiked: isLikedProp,
    likes: likesProp,
    media,
    message,
    ...other
  } = props;
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likes, setLikes] = useState(likesProp);

  const handleLike = useCallback(() => {
    setIsLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  }, []);

  const handleUnlike = useCallback(() => {
    setIsLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  }, []);

  return (
    <Card {...other}>
      <CardHeader
        avatar={(
          <Avatar
            component="a"
            href="#"
            src={authorAvatar}
          />
        )}
        disableTypography
        subheader={(
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon color="action">
              <ClockIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              {formatDistanceToNowStrict(createdAt)}
              {' '}
              ago
            </Typography>
          </Stack>
        )}
        title={(
          <Stack
            alignItems="center"
            direction="row"
            spacing={0.5}
            sx={{ mb: 1 }}
          >
            <Link
              color="text.primary"
              href="#"
              variant="subtitle2"
            >
              {authorName}
            </Link>
            <Typography variant="body2">
              updated her status
            </Typography>
          </Stack>
        )}
      />
      <Box
        sx={{
          pb: 2,
          px: 3
        }}
      >
        <Typography variant="body1">
          {message}
        </Typography>
        {media && (
          <Box sx={{ mt: 3 }}>
            <CardActionArea>
              <CardMedia
                image={media}
                sx={{
                  backgroundPosition: 'top',
                  height: 500
                }}
              />
            </CardActionArea>
          </Box>
        )}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 2 }}
        >
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Stack spacing={3}>
          {comments.map((comment) => (
            <SocialComment
              authorAvatar={comment.author.avatar}
              authorName={comment.author.name}
              createdAt={comment.createdAt}
              key={comment.id}
              message={comment.message}
            />
          ))}
        </Stack>
        <Divider sx={{ my: 3 }} />
        <SocialCommentAdd />
      </Box>
    </Card>
  );
};

SocialPostCard.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  createdAt: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  media: PropTypes.string,
  message: PropTypes.string.isRequired
};
