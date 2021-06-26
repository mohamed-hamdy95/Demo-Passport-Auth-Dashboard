import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  message: {
    marginTop: spacing(1),
    color: palette.text.secondary,
    fontWeight: 300,
    [breakpoints.up('sm')]: {
      fontSize: '1em',
    },
  },
}));
