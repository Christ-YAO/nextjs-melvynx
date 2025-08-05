import { ComponentProps } from "react";
import { Button } from "./ui/button";
import Loader from "./Loader";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  isPending: boolean;
};

export const SubmitButton = ({ isPending, ...rest }: SubmitButtonProps) => {
  return (
    <Button {...rest} disabled={isPending} className="w-full">
      {isPending ? <Loader className="text-muted" /> : "Submit"}
    </Button>
  );
};
