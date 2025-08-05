import { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";
import Loader from "./Loader";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  isPending: boolean;
  children?: ReactNode
};

export const SubmitButton = ({ isPending, children, ...rest }: SubmitButtonProps) => {
  return (
    <Button {...rest} disabled={isPending} className="w-full">
      {isPending ? <Loader className="text-muted" /> : (<>{children ? children : "Submit"}</>)}
    </Button>
  );
};
