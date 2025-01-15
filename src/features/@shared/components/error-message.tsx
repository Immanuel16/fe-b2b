type ErrorMessageProps = {
  message: string | undefined;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <span className="text-[10px] text-[#ef233c]">{message}</span>
);
