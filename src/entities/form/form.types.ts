export type FormField = {
  name: string;
  label: string;
  type: string;
};

export type FormProps = {
  error: {
    get: string;
    set: (v: string) => void;
  };
  fields: FormField[];
  onSubmit: (data: { [key: string]: string }) => void;
  onChangeUserType: () => void;
  textConnect: string;
  submitButtonText: string;
  switchAuthButtonText: string;
  bCatchResponse: boolean;
  route: string;
};
