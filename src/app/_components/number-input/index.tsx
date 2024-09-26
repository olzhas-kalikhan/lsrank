"use client"

import {
  type InputAttributes,
  type NumericFormatProps,
  NumericFormat,
} from "react-number-format";
import { Input } from "../ui/input";

export default function NumberInput<BaseType = InputAttributes>(
  props: NumericFormatProps<BaseType>,
) {
  return <NumericFormat customInput={Input} {...props} />;
}
