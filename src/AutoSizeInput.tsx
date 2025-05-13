import React, { useEffect, useRef, useState, CSSProperties } from "react";

const sizerStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  visibility: "hidden",
  height: 0,
  overflow: "scroll",
  whiteSpace: "pre",
};

const INPUT_PROPS_BLACKLIST = [
  "extraWidth",
  "injectStyles",
  "inputClassName",
  "inputRef",
  "inputStyle",
  "minWidth",
  "onAutosize",
  "placeholderIsMinWidth",
];

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  extraWidth?: number | string;
  injectStyles?: boolean;
  inputClassName?: string;
  inputRef?: (el: HTMLInputElement | null) => void;
  inputStyle?: CSSProperties;
  minWidth?: number;
  onAutosize?: (width: number) => void;
  placeholderIsMinWidth?: boolean;
};

const cleanInputProps = (inputProps: any) => {
  INPUT_PROPS_BLACKLIST.forEach((field) => delete inputProps[field]);
  return inputProps;
};

const copyStyles = (styles: CSSStyleDeclaration, node: HTMLElement) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

const isIE =
  typeof window !== "undefined" && window.navigator
    ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent)
    : false;

const generateId = (): string | undefined => {
  return isIE ? "_" + Math.random().toString(36).substr(2, 12) : undefined;
};

const AutosizeInput: React.FC<InputProps> = (props) => {
  const {
    minWidth = 1,
    injectStyles = true,
    inputClassName,
    inputRef,
    inputStyle,
    className,
    style,
    placeholder,
    value,
    defaultValue,
    onAutosize,
    placeholderIsMinWidth,
    ...restProps
  } = props;

  const input = useRef<HTMLInputElement | null>(null);
  const sizer = useRef<HTMLDivElement | null>(null);
  const placeHolderSizer = useRef<HTMLDivElement | null>(null);

  const [inputWidth, setInputWidth] = useState<number>(minWidth);
  const [inputId, setInputId] = useState<string | undefined>(
    props.id || generateId(),
  );

  useEffect(() => {
    setInputId(props.id || generateId());
  }, [props.id]);

  useEffect(() => {
    if (!input.current || !window.getComputedStyle) return;
    const inputStyles = window.getComputedStyle(input.current);
    if (!inputStyles) return;
    if (sizer.current) copyStyles(inputStyles, sizer.current);
    if (placeHolderSizer.current)
      copyStyles(inputStyles, placeHolderSizer.current);
  }, [input.current]);

  useEffect(() => {
    if (!sizer.current || typeof sizer.current.scrollWidth === "undefined")
      return;

    let newInputWidth = 0;
    if (placeholder && (!value || placeholderIsMinWidth)) {
      newInputWidth =
        Math.max(
          sizer.current.scrollWidth,
          placeHolderSizer.current?.scrollWidth || 0,
        ) + 2;
    } else {
      newInputWidth = sizer.current.scrollWidth + 2;
    }

    const extraWidth =
      props.type === "number" && props.extraWidth === undefined
        ? 16
        : parseInt(props.extraWidth as string) || 0;

    newInputWidth += extraWidth;
    if (newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }

    if (newInputWidth !== inputWidth) {
      setInputWidth(newInputWidth);
      if (typeof onAutosize === "function") {
        onAutosize(newInputWidth);
      }
    }
  }, [value, placeholder, placeholderIsMinWidth, props.extraWidth]);

  useEffect(() => {
    if (typeof inputRef === "function") {
      inputRef(input.current);
    }
  }, [input.current]);

  const sizerValue = [defaultValue, value, ""].find(
    (val) => val !== null && val !== undefined,
  );

  const wrapperStyle: CSSProperties = { ...style };
  if (!wrapperStyle.display) wrapperStyle.display = "inline-block";

  const computedInputStyle: CSSProperties = {
    boxSizing: "content-box",
    width: `${inputWidth}px`,
    ...inputStyle,
  };

  const inputProps: any = {
    ...restProps,
    className: inputClassName,
    id: inputId,
    style: computedInputStyle,
  };
  cleanInputProps(inputProps);

  return (
    <div className={className} style={wrapperStyle}>
      {isIE && injectStyles && (
        <style
          dangerouslySetInnerHTML={{
            __html: `input#${inputId}::-ms-clear {display: none;}`,
          }}
        />
      )}
      <input {...inputProps} ref={input} value={value} />
      <div ref={sizer} style={sizerStyle}>
        {sizerValue}
      </div>
      {placeholder && (
        <div ref={placeHolderSizer} style={sizerStyle}>
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default AutosizeInput;
