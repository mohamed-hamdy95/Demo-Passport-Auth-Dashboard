import React from 'react';
import emptyBox from 'assets/lottie/empty-box.json';
import noSearchResults from 'assets/lottie/no-search-results.json';
import Lottie from 'react-lottie';
import FlexBox from 'components/FlexBox/FlexBox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ConditionalWrapper from 'utils/ConditionalWrapper';
import useStyles from './styles';

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function EmptyState({ message, isSearch, size, paper, paperProps, ...more }) {
  const classes = useStyles();

  return (
    <ConditionalWrapper
      condition={paper}
      wrapper={children => (
        <Box clone my={1} p={2} pb={3.5} {...paperProps}>
          <Paper>{children}</Paper>
        </Box>
      )}
    >
      <FlexBox fontSize={size} {...more}>
        <FlexBox maxWidth="14em" width="100%">
          <Lottie
            options={{ ...defaultOptions, animationData: isSearch ? noSearchResults : emptyBox }}
          />
        </FlexBox>
        <Typography align="center" variant="h5" className={classes.message}>
          {message}
        </Typography>
      </FlexBox>
    </ConditionalWrapper>
  );
}

EmptyState.defaultProps = {
  size: '2.4rem',
};

export default EmptyState;
