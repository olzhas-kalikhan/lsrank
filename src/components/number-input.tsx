import { forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { Input } from "~/components/ui/input";

export type NumberInputProps = NumericFormatProps;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    return <NumericFormat
    getInputRef={ref}
    customInput={Input} {...props} />;
  },
);
NumberInput.displayName = "NumberInput";
export default NumberInput;
