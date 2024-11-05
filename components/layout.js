import NavBar from "./Navbar";
import FooterFinal from "./FooterFinal";

import { useRouter } from "next/router";
import NavBarEn from "../components/NavBarEn/NavBarEn";
import NavBarEs from "../components/NavBarEs/NavBarEs";

export default function Layout({ children }) {
  // const router = useRouter();
  // const { locale } = router;

  // let NavBarComponent;

  // switch (locale) {
  //     case 'en':
  //         NavBarComponent = NavBarEn;
  //         break;
  //     case 'es':
  //         NavBarComponent = NavBarEs;
  //         break;
  //     default:
  //         NavBarComponent = NavBarEs;
  // }

  return (
    <>
      <main>{children}</main>
      <FooterFinal />
    </>
  );
}
