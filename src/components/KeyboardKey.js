// @flow
import React from "react";
import classNames from "classnames";

type Props = {
  number: number,
  pressed: boolean
};

const getKeyFactories = () => {
  const getClassName = (number, pressed) =>
    classNames(`POINTER_TARGET-key-${number}`, number, {
      pressed
    });

  return {
    "45": (number, pressed) => (
      <path
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        d="M104.8,516.8v-38.5h-1.5c-2.7,0-4.9,2.2-4.9,4.9v46.6c0,2.7,2.2,4.9,4.9,4.9h11.4v-17.9H104.8z"
      />
    ),
    "46": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="104.8"
        y="478.3"
        fill="#2B2B2D"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "47": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="123.9,478.3 123.9,516.8 114.7,516.8 114.7,534.7    152.9,534.7 152.9,478.3  "
      />
    ),
    "48": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="181.4,516.8 181.4,478.3 152.9,478.3 152.9,534.7    190.9,534.7 190.9,516.8  "
      />
    ),
    "49": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="181.4"
        y="478.3"
        fill="#2C2C2E"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "50": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="231.8,516.8 231.8,478.3 200.4,478.3 200.4,516.8    190.9,516.8 190.9,534.7 241.3,534.7 241.3,516.8  "
      />
    ),
    "51": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="231.8"
        y="478.3"
        fill="#2C2C2E"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "52": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="250.8,478.3 250.8,516.8 241.3,516.8 241.3,534.7    279.4,534.7 279.4,478.3  "
      />
    ),
    "53": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="308,516.8 308,478.3 279.4,478.3 279.4,534.7    317.5,534.7 317.5,516.8  "
      />
    ),
    "54": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="308"
        y="478.3"
        fill="#2C2C2E"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "55": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="358.3,516.8 358.3,478.3 327,478.3 327,516.8    317.5,516.8 317.5,534.7 367.9,534.7 367.9,516.8  "
      />
    ),
    "56": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="358.3"
        y="478.3"
        fill="#2C2C2E"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "57": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="409.1,516.8 409.1,478.3 377.4,478.3 377.4,516.8    367.9,516.8 367.9,534.7 418.6,534.7 418.6,516.8  "
      />
    ),
    "58": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="409.1"
        y="478.3"
        fill="#2C2C2E"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "59": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="428.1,478.3 428.1,516.8 418.6,516.8 418.6,534.7    456.4,534.7 456.4,478.3  "
      />
    ),
    "60": (number, pressed) => (
      <polygon
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        points="484.8,516.8 484.8,478.3 456.4,478.3 456.4,534.7    494.3,534.7 494.3,516.8  "
      />
    ),
    "61": (number, pressed) => (
      <rect
        className={getClassName(number, pressed)}
        x="484.8"
        y="478.3"
        fill="#2C2C2E"
        stroke="#414042"
        strokeMiterlimit="10"
        width="19"
        height="38.5"
      />
    ),
    "62": (number, pressed) => (
      <path
        className={getClassName(number, pressed)}
        fill="#F0F0F2"
        stroke="#414042"
        strokeMiterlimit="10"
        d="M506.2,478.3h-2.5v38.5h-9.5v17.9h12c2.7,0,4.9-2.2,4.9-4.9v-46.6    C511.1,480.5,508.9,478.3,506.2,478.3z"
      />
    )
  };
};

const keyFactories = getKeyFactories();

/**
 * Keyboard Key Component.
 */
function KeyboardKey({ number, pressed }: Props) {
  const keyFactory = keyFactories[number];
  return keyFactory(number, pressed);
}

export default React.memo(KeyboardKey);
