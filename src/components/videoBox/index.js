import Style from "./style";
import { useTranslation } from "next-i18next";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import "node_modules/video-react/dist/video-react.css";
import { Row, Col } from "antd";

export default function VideoBox(props) {
  const [t, i18n] = useTranslation("common");
  const { videoSrc, thumbnail, title, subtitle } = props;
  return (
    <Style>
      <div className="videobox">
        <h3>{t(title)}</h3>
        <p>{t(subtitle)}</p>
        <Row>
          <Col
            xs={{ span: 18, offset: 3 }}
            sm={{ span: 18, offset: 3 }}
            md={{ span: 18, offset: 3 }}
            xl={{ span: 12, offset: 6 }}
          >
            <svg
              className="triangle-video-shape"
              xmlns="http://www.w3.org/2000/svg"
              width="65.623"
              height="60.65"
              viewBox="0 0 65.623 60.65"
            >
              <path
                id="Polygon_1"
                data-name="Polygon 1"
                d="M22.217,7.112a5,5,0,0,1,8.566,0L48.435,36.42A5,5,0,0,1,44.152,44H8.848a5,5,0,0,1-4.283-7.58Z"
                transform="translate(16.483) rotate(22)"
                fill="#6bc482"
              />
            </svg>
            <svg
              className="circle-dotted-video-shape"
              xmlns="http://www.w3.org/2000/svg"
              width="145.126"
              height="90.516"
              viewBox="0 0 145.126 90.516"
            >
              <g
                id="Ellipse_14"
                data-name="Ellipse 14"
                transform="translate(143.59 90.516) rotate(-179)"
                fill="none"
                stroke="#cfb04d"
                strokeWidth="5"
                strokeDasharray="20"
              >
                <ellipse
                  cx="71.806"
                  cy="44.012"
                  rx="71.806"
                  ry="44.012"
                  stroke="none"
                />
                <ellipse
                  cx="71.806"
                  cy="44.012"
                  rx="69.306"
                  ry="41.512"
                  fill="none"
                />
              </g>
            </svg>
            <svg
              className="circle-video-shape"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <circle
                id="Ellipse_15"
                data-name="Ellipse 15"
                cx="18"
                cy="18"
                r="18"
                fill="#cfb04d"
              />
            </svg>

            <svg
              className="line-video-shape"
              xmlns="http://www.w3.org/2000/svg"
              width="79.241"
              height="58.099"
              viewBox="0 0 79.241 58.099"
            >
              <path
                id="Path_29"
                data-name="Path 29"
                d="M54.853,3015.653l17.905,17.305H93.3l23.824,23.824"
                transform="translate(-46.369 -3007.169)"
                fill="none"
                stroke="#ee574c"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                strokeWidth="12"
              />
            </svg>
            <iframe
              src="https://www.youtube.com/embed/2PUx4RvDLRQ"
              title="What is lendohain"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* <Player
              poster="/assets/images/video-poster.jpg"
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            >
              <LoadingSpinner />
              <BigPlayButton position="center" />
            </Player> */}
          </Col>
        </Row>
      </div>
    </Style>
  );
}
