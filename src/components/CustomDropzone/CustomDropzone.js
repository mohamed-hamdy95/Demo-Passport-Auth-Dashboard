import React, { useCallback, useState } from 'react';
import firebase from 'config/firebase';
import { useDispatch } from 'react-redux';
import { endUpload, setProgress, startUpload } from 'redux/features/upload.slice';
import snackbar from 'utils/snackbar';
import { useDropzone } from 'react-dropzone';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/core/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CardActions from '@material-ui/core/CardActions';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px 20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: 'rgba(0,0,0,60)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const CustomDropzone = ({
  accept,
  open,
  handleClose,
  handleSubmit,
  attribute,
  prefix = 'about',
}) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept,
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const dispatch = useDispatch();
  const filePath = `${prefix}/${new Date().getTime()}.${file?.name.split('.').pop()}`;

  const uploadImage = () => {
    dispatch(startUpload());
    const uploadTask = firebase.storage().ref(filePath).put(file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        dispatch(setProgress(progress));
      },
      error => {
        // error function ....
        snackbar.error('Error Occured While Uploading.');
        console.log(error);
      },
      async () => {
        // complete function ....
        const bucket = firebase.storage().ref().bucket;
        const url = await (await uploadTask).ref.getDownloadURL();
        let obj = {};
        obj[attribute] = { bucket, file: filePath, url };
        await handleSubmit(obj);
        dispatch(endUpload());
        handleClose();
      },
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          alignItems: 'center',
        },
      }}
    >
      <Box sx={{ m: 2, minWidth: { md: 520 } }}>
        <Collapse in={!file} timeout={400} mountOnEnter unmountOnExit>
          <div className="container">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag 'n' drop file here, or click to select it</p>
              )}
            </div>
          </div>
        </Collapse>
        <Collapse in={!!file} timeout={400} mountOnEnter unmountOnExit>
          <Alert
            severity="success"
            sx={{
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.08)',
              boxShadow: 1,
              p: 2,
              color: 'text.primary',
              '& .MuiAlert-message': {
                color: 'inherit',
                fontWeight: 'bold',
              },
              '& .MuiAlert-icon': {
                color: 'inherit',
              },
              '&:hover': {
                boxShadow: 3,
              },
            }}
            variant="outlined"
            onClose={() => setFile(null)}
          >
            {file?.name}
          </Alert>
        </Collapse>
      </Box>
      <CardActions>
        <Button size="large" variant="contained" onClick={() => uploadImage()} disabled={!file}>
          Upload
        </Button>
      </CardActions>
    </Dialog>
  );
};

export default CustomDropzone;
