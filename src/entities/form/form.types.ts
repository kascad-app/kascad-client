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
  onChangeAuth: () => void;
  submitButtonText: string;
  switchAuthButtonText: string;
  bCatchResponse: boolean;
};
