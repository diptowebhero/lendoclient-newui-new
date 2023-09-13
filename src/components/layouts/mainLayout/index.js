import Footer_2 from "@src/components/footer_2";
import Header from "@src/components/header";
import Style from "./style";

export default function Mainlayout(props) {
  const { setVisibleDrawer, children, isHome, overflow } = props;
  return (
    <Style>
      <Header homeSetVisibleDrawer={setVisibleDrawer} isHome={isHome} overflow={overflow} />
      <br /><br />
      {children}
      <Footer_2 />
    </Style>
  );
}





