import React from "react"
import { IconProps } from ".."

const IconRocketLaunch: React.FC<IconProps> = ({
  iconColorClassName,
  ...props
}) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.7845 11.8383C12.9461 12.5217 12.9508 13.2328 12.7985 13.9182C12.6461 14.6037 12.3407 15.2459 11.9049 15.7965C11.4691 16.3472 10.9144 16.7921 10.2823 17.098C9.65017 17.4038 8.95703 17.5626 8.25481 17.5625V13.8394M12.7845 11.8383C14.2659 10.7592 15.471 9.34497 16.3014 7.71115C17.1318 6.07732 17.5639 4.27024 17.5625 2.4375C15.7299 2.43618 13.923 2.86836 12.2893 3.69875C10.6556 4.52913 9.24152 5.73417 8.1625 7.21545M12.7853 11.8383C11.4372 12.8243 9.89165 13.507 8.25481 13.8394M8.1625 7.21545C7.47906 7.0538 6.76789 7.04894 6.08229 7.20121C5.39669 7.35349 4.75445 7.65895 4.20369 8.09473C3.65293 8.5305 3.20794 9.08527 2.90207 9.71747C2.5962 10.3497 2.43737 11.0429 2.4375 11.7452H6.16058M8.1625 7.21545C7.17657 8.56337 6.49391 10.1086 6.16135 11.7452M8.25481 13.8394C8.17492 13.8557 8.09425 13.8712 8.01358 13.886C7.30991 13.328 6.6728 12.6909 6.11481 11.9872C6.12947 11.9064 6.14498 11.8257 6.16135 11.7452M4.42392 13.599C3.91368 13.9784 3.51698 14.4902 3.27676 15.0789C3.03655 15.6676 2.96197 16.3108 3.06112 16.9389C3.68925 17.0379 4.33252 16.9632 4.92124 16.7229C5.50996 16.4825 6.0217 16.0857 6.40102 15.5753M13.4904 7.67308C13.4904 7.98165 13.3678 8.27758 13.1496 8.49577C12.9314 8.71396 12.6355 8.83654 12.3269 8.83654C12.0184 8.83654 11.7224 8.71396 11.5042 8.49577C11.286 8.27758 11.1635 7.98165 11.1635 7.67308C11.1635 7.36451 11.286 7.06858 11.5042 6.85039C11.7224 6.6322 12.0184 6.50962 12.3269 6.50962C12.6355 6.50962 12.9314 6.6322 13.1496 6.85039C13.3678 7.06858 13.4904 7.36451 13.4904 7.67308Z"
        className={
          iconColorClassName ||
          "stroke-medusa-icon-subtle dark:stroke-medusa-icon-subtle"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconRocketLaunch
