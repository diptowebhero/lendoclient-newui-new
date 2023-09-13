import Footer from "@src/components/footer";
import Header from "@src/components/header";
import Style from "./style";

export default function HomeLayout(props) {
  const { setVisibleDrawer,children, isHome, overflow } = props;
  return (
    <Style>
      <Header homeSetVisibleDrawer={setVisibleDrawer} isHome={isHome} overflow={overflow} />
      <br/><br/>
      {children}
      <Footer />
    </Style>
  );
}





