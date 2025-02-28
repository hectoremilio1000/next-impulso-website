import React from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { AntdRegistry } from "@ant-design/nextjs-registry"; // Ajusta el import si es necesario

const RootLayout = ({ children }) => (
  <html lang="en">
    <GoogleTagManager gtmId="GTM-M676V953" />
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
