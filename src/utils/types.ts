interface UserProps {
  avatar: string;
  avatarPath: string;
  createdAt: any;
  email: string;
  isOnline: boolean;
  name: string;
  uid: string | undefined;
}

interface UserCredentials {
  name: string;
  email: string;
  password: string;
  error: any;
  loading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
  error: any;
  loading: boolean;
}

interface FullButtonProps {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  isDisabledTxt?: string;
}

interface InputProps {
  id: string;
  placeholder: string;
  type: string;
  value: string;
  handleOwl?: Function;
  data: {};
  setData: Function;
}

interface MessageValProps {
  createdAt: any;
  from: string;
  media: string;
  mediaSnap: string;
  text: string;
  to: string;
}

interface MessageFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  text: string;
  setText: Function;
  setImg: Function;
  img: File;
}

interface LastMsg {
  createdAt: any;
  from: string;
  media: string;
  mediaSnap: string;
  text: string;
  to: string;
  unread: boolean;
}

export type {
  UserProps,
  UserCredentials,
  LoginCredentials,
  FullButtonProps,
  InputProps,
  MessageValProps,
  MessageFormProps,
  LastMsg,
};