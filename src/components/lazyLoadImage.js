import { LazyLoadImage as Lazyload } from "react-lazy-load-image-component";
import styled from "styled-components";
const Style = styled.div`
  .lazy-load-image-background.blur {
    filter: blur(15px);
  }

  .lazy-load-image-background.blur.lazy-load-image-loaded {
    filter: blur(0);
    transition: filter 0.3s;
  }

  .lazy-load-image-background.blur > img {
    opacity: 0;
  }

  .lazy-load-image-background.blur.lazy-load-image-loaded > img {
    opacity: 1;
    transition: opacity 0.3s;
  }
  
`;


export default function LazyLoadImage(props) {
  return (
    <Style>
      <Lazyload sty effect="blur" {...props} />
    </Style>
  );
}

