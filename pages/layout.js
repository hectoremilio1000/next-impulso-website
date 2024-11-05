import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry"; // Ajusta el import si es necesario

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
