import { toast } from 'react-toastify';

export const Toaster = (type, error) => {
  switch (type) {
    case 'loading':
      toast.loading('Loading...', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true
      });
      break;
    case 'success':
      toast.success('Loaded', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      break;
    case 'error':
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      break;

    default:
      break;
  }

};


export const formatDate = (dateString, withTime = true) => {

  if (withTime) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', options).replace(' at', '');

    return formattedDate;
  } else {
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
  }

};