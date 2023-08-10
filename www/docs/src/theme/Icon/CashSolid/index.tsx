import React from "react"
import { IconProps } from ".."

const IconCashSolid: React.FC<IconProps> = ({
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
        d="M1 4C1 3.73478 1.10536 3.48043 1.29289 3.29289C1.48043 3.10536 1.73478 3 2 3H18C18.2652 3 18.5196 3.10536 18.7071 3.29289C18.8946 3.48043 19 3.73478 19 4V12C19 12.2652 18.8946 12.5196 18.7071 12.7071C18.5196 12.8946 18.2652 13 18 13H2C1.73478 13 1.48043 12.8946 1.29289 12.7071C1.10536 12.5196 1 12.2652 1 12V4ZM13 8C13 8.79565 12.6839 9.55871 12.1213 10.1213C11.5587 10.6839 10.7956 11 10 11C9.20435 11 8.44129 10.6839 7.87868 10.1213C7.31607 9.55871 7 8.79565 7 8C7 7.20435 7.31607 6.44129 7.87868 5.87868C8.44129 5.31607 9.20435 5 10 5C10.7956 5 11.5587 5.31607 12.1213 5.87868C12.6839 6.44129 13 7.20435 13 8ZM4 9C4.26522 9 4.51957 8.89464 4.70711 8.70711C4.89464 8.51957 5 8.26522 5 8C5 7.73478 4.89464 7.48043 4.70711 7.29289C4.51957 7.10536 4.26522 7 4 7C3.73478 7 3.48043 7.10536 3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8C3 8.26522 3.10536 8.51957 3.29289 8.70711C3.48043 8.89464 3.73478 9 4 9ZM17 8C17 8.26522 16.8946 8.51957 16.7071 8.70711C16.5196 8.89464 16.2652 9 16 9C15.7348 9 15.4804 8.89464 15.2929 8.70711C15.1054 8.51957 15 8.26522 15 8C15 7.73478 15.1054 7.48043 15.2929 7.29289C15.4804 7.10536 15.7348 7 16 7C16.2652 7 16.5196 7.10536 16.7071 7.29289C16.8946 7.48043 17 7.73478 17 8ZM1.75 14.5C1.55109 14.5 1.36032 14.579 1.21967 14.7197C1.07902 14.8603 1 15.0511 1 15.25C1 15.4489 1.07902 15.6397 1.21967 15.7803C1.36032 15.921 1.55109 16 1.75 16C6.167 16 10.443 16.603 14.499 17.73C15.61 18.039 16.75 17.218 16.75 16.034V15.25C16.75 15.0511 16.671 14.8603 16.5303 14.7197C16.3897 14.579 16.1989 14.5 16 14.5C15.8011 14.5 15.6103 14.579 15.4697 14.7197C15.329 14.8603 15.25 15.0511 15.25 15.25V16.034C15.2484 16.0755 15.2373 16.1161 15.2176 16.1526C15.1979 16.1891 15.1701 16.2207 15.1363 16.2448C15.1025 16.269 15.0637 16.285 15.0227 16.2918C14.9817 16.2986 14.9398 16.2959 14.9 16.284C10.6177 15.0963 6.19392 14.4961 1.75 14.5Z"
        className={
          iconColorClassName ||
          "fill-medusa-icon-subtle dark:fill-medusa-icon-subtle-dark"
        }
      />
    </svg>
  )
}

export default IconCashSolid
