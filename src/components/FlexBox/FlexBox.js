import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function FlexBox({ children, row, wrap, ai, jc, def, ...more }) {
  return (
    <Box
      display="flex"
      justifyContent={jc ? jc : def ? 'flex-start' : 'center'}
      alignItems={ai ? ai : def ? 'stretch' : 'center'}
      flexDirection={row ? 'row' : 'column'}
      flexWrap={wrap ? 'wrap' : 'nowrap'}
      {...more}
    >
      {children}
    </Box>
  );
}

FlexBox.propTypes = {
  children: PropTypes.node.isRequired,
  ai: PropTypes.string,
  jc: PropTypes.string,
  def: PropTypes.bool,
  row: PropTypes.bool,
  wrap: PropTypes.bool,
};

export default FlexBox;
