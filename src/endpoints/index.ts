export const getCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export const writeCookie = (key: string, value: string) => {
  const date = new Date();
  const days = 365;
  // Get unix milliseconds at current time plus number of days
  date.setTime(+date + (days * 86400000)); // 24 * 60 * 60 * 1000
  window.document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/`;
  return value;
};

interface Data {
  username: string;
  password: string;
}

interface Methods {
  push: Function;
  setIsSubmitting: Function;
}

export const loginUser = (data: Data, { push, setIsSubmitting }: Methods) =>
  new Promise(() => setTimeout(() => {
    setIsSubmitting(false);
    // Mock a backend api call and recieve JWT with fake authentication
    if (data.username === 'demo' && data.password === 'demo') {
      const fake_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJldmVyZ2FyY2lhNjIxQG91dGxvb2suY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.sp670wNR4IPHcZ1iTyjO5qAfLNUktZdRH09Hy4JJx9U";
      writeCookie('token', fake_jwt);
      push('/home');
    }
    else {
      alert('Wrong Credential. username is demo password is demo')
    }
  }, 2000));


export const fetchActiveUser = () =>
  new Promise(resolve => setTimeout(() => {
    // Mock a backend api call would send JWT to authenticate on the backend and recieve a user object
    resolve({
      Admin: true,
      CreatedTime: new Date(),
      Email: 'evergarcia621@outlook.com',
      Id: 1,
      Username: 'demo',
    })
  }, 1000));
