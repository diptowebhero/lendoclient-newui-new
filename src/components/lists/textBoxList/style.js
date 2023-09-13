import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`


.first-steps  {
  background: linear-gradient(0deg, #E46400 0%, #FF8104 100%) !important;
}

.step {

  background: linear-gradient(180deg, #404242 0%, #1D2022 100%);

  color: white;
  border-radius: 20px;
  padding: 20px 22px 25px;
  display: flex;

}

.stepno {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.stepname {
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
}

.aboutstep {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
}
.create-icon-container{
  display:flex;
}
.stepicon img {
  margin-top: -60px;
}

  .title {
    padding-bottom: 3rem;
  }
  .textbox-list {
    .textbox-item {
      .header {
        display: flex;
        align-items: center;
        justify-self: center;
        h3 {
          color: ${props => props.theme.colors.primary};
          white-space: pre-wrap;
          font-weight: 500;
          line-height: 1.3;
        }
      }
      p {
        color: ${props => props.theme.colors.gray};
      }
    }
  }
`;

export default Style;
