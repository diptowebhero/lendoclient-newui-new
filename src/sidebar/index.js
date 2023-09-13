
import Link from "next/link";
import Style from "./style";

export default function Sidebar(props) {

    const sidebarData = [
        {
            img: "/assets/images/wallets/launchpadicon.svg",
            lable: "Launchpad",
            navigate: "/creating-option"
        },
        {
            img: "/assets/images/wallets/raffleicon.svg",
            lable: "Raffle",
            navigate: "/created-collection",
            link:"https://raffle.lendochain.io/"
        },
        {
            img: "/assets/images/wallets/playicon.svg",
            lable: "Play",
            navigate: "/created-collection"
        },
        {
            img: "/assets/images/wallets/dragonzicon.svg",
            lable: "Dragonz",
            navigate: "/nft-detail"
        },
        {
            img: "/assets/images/wallets/reawardsicon.svg",
            lable: "Rewards",
            navigate: "/explore-art"
        },
        {
            img: "/assets/images/wallets/supporticon.svg",
            lable: "Support",
            navigate: "/article"
        },

    ]
    const sidebarBottomData = [
        {
            img: "/assets/images/wallets/twittericon.svg",
            alt: "twittericon",
            className: "twitter"
        },
        {
            img: "/assets/images/wallets/webicon.svg",
            alt: "webicon",
            className: "web"
        },
        {
            img: "/assets/images/wallets/sharingicon.svg",
            alt: "sharingicon",
            className: "shareing"
        }
    ]


    return (
        <Style>
            <div className="sidebar">
                <ul style={{ padding: "2rem 0 2rem 1rem" }} className="sidebarmenu py-5 ps-4 ">

                    <li className="sidebar-item active">
                        <a to="/explore-art" style={{ color: 'white' }} className="sidebar-link text-decoration-none">
                            <div style={{display: 'flex'}}>
                                <span className="marketicon menuicon">
                                    <img src="assets/images/wallets/marketpalceicon.svg" alt="marketpalceicon" />
                                </span>
                                <span className="sidebarlink_text">
                                    Marketplace
                                </span>
                            </div>
                        </a>
                    </li>

                    {sidebarData.map((vl, index) => (

                        <li key={index + 1} className="sidebar-item">
                            <a href={vl?.link} target="_blank" className="sidebar-link">
                                <span className="marketicon menuicon">
                                    <img src={vl.img} alt="launchpadicon" />
                                </span>
                                <span className="sidebarlink_text">
                                    {/* <Link to={vl?.navigate} style={{ color: '#ACACAC' }} class="text-decoration-none"> */}

                                    {vl.lable}
                                    {/* </Link> */}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div style={{ display: "flex", justifyContent: 'space-evenly', alignItems: 'center' }} className="share_sec ">
                    {sidebarBottomData.map((vl, index) =>
                        <span className="socialhandle" key={index + 1}>
                            <a href="/" className={vl.className}>
                                <img src={vl.img} alt={vl.alt} />
                            </a>
                        </span>
                    )}
                </div>

            </div>
        </Style>
    );
}



