import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  form: {
    maxWidth: spacing(40),
    margin: '0 auto',
  },
  formActions: {
    marginTop: spacing(5),
    display: 'flex',
    justifyContent: 'center',
  },
}));
