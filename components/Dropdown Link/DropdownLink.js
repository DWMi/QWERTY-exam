import Link from "next/link";
import React from "react";

const DropdownLink = React.forwardRef(function CustomComponent(props, ref) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
});

export default DropdownLink;
