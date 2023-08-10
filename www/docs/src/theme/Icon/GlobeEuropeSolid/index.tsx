import React from "react"
import { IconProps } from ".."

const IconGlobeEuropeSolid: React.FC<IconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10ZM16.497 10.204C16.4594 11.3915 16.097 12.5461 15.4492 13.5421C14.8014 14.5381 13.893 15.3375 12.8227 15.8534C11.7524 16.3693 10.5612 16.582 9.37848 16.4684C8.19579 16.3547 7.06687 15.9191 6.11442 15.2088C5.16197 14.4985 4.42242 13.5407 3.97616 12.4395C3.5299 11.3384 3.394 10.136 3.58322 8.96301C3.77244 7.79003 4.27955 6.69135 5.04943 5.78638C5.81931 4.88141 6.82251 4.20477 7.95 3.83L6.927 5.62C6.77282 5.89063 6.70968 6.20365 6.7469 6.51288C6.78412 6.82212 6.91973 7.11121 7.13372 7.33753C7.34771 7.56385 7.62877 7.71541 7.93544 7.76987C8.24211 7.82433 8.55817 7.7788 8.837 7.64L9.012 7.553C9.08153 7.51815 9.15823 7.50001 9.236 7.5H9.382C9.46726 7.5 9.55111 7.52181 9.62557 7.56335C9.70003 7.60489 9.76264 7.66478 9.80743 7.73733C9.85222 7.80988 9.87772 7.89268 9.88149 7.97786C9.88527 8.06304 9.8672 8.14777 9.829 8.224L9.801 8.279C9.76782 8.3453 9.71687 8.40108 9.65383 8.44011C9.59079 8.47913 9.51814 8.49987 9.444 8.5H8.942C8.57005 8.50003 8.20385 8.59186 7.8759 8.76735C7.54795 8.94284 7.26838 9.19656 7.062 9.506L7.018 9.572C6.83893 9.8407 6.72427 10.1471 6.68294 10.4674C6.64161 10.7876 6.67472 11.1131 6.7797 11.4184C6.88468 11.7238 7.0587 12.0008 7.28822 12.228C7.51773 12.4551 7.79656 12.6262 8.103 12.728C8.21804 12.7662 8.3182 12.8396 8.38941 12.9377C8.46062 13.0358 8.49929 13.1538 8.5 13.275V14.325C8.49988 14.5686 8.57547 14.8062 8.71631 15.005C8.85715 15.2037 9.05629 15.3538 9.28615 15.4344C9.51602 15.515 9.76526 15.5222 9.99939 15.4549C10.2335 15.3877 10.441 15.2493 10.593 15.059L12.204 13.045C12.396 12.805 12.5 12.509 12.5 12.203C12.5 11.887 12.628 11.579 12.853 11.353C13.0753 11.1308 13.2139 10.8386 13.2454 10.5258C13.277 10.2131 13.1994 9.89912 13.026 9.637L12.562 8.941C12.515 8.86865 12.4949 8.78213 12.5051 8.69648C12.5153 8.61083 12.5552 8.53146 12.6178 8.47215C12.6804 8.41285 12.7619 8.37736 12.8479 8.37185C12.934 8.36634 13.0193 8.39116 13.089 8.442L13.432 8.699C13.748 8.936 14.17 8.974 14.523 8.797C14.6331 8.74189 14.7578 8.72286 14.8793 8.74261C15.0008 8.76235 15.113 8.81987 15.2 8.907L16.497 10.204Z"
        className={
          iconColorClassName ||
          "fill-medusa-icon-subtle dark:fill-medusa-icon-subtle-dark"
        }
      />
    </svg>
  )
}

export default IconGlobeEuropeSolid
