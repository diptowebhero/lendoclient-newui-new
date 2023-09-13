import mediaQuery from "@src/styles/MediaQuery";
import styled from "styled-components";

export const Style = styled.div`


.sidebar {
    height: 95%;
    background-color: #1A1C1E;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    z-index:10;
    width: 218px;
    border-radius: 10px;
    // margin-top: 2%;
}

.sidebarmenu {
    list-style-type: none;


}

a.sidebar-link span.menuicon {
    margin-right: 15px;
}

li.sidebar-item {
    margin: 1.75rem 0
}

a.sidebar-link {
    color: #ACACAC;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 14px;
}

li.sidebar-item span.menuicon {
    /* background-color: #E46400; */
    display: flex;
    padding: 5px;
    border-radius: 2px;

}

li.sidebar-item.active span.menuicon {
    background-color: #E46400;
    display: flex;
    padding: 5px;
    border-radius: 2px;
}

li.sidebar-item.active a.sidebar-link {
    font-weight: 600;
    color: white;
}

.socialhandle {
    background: #272A30;
    border-radius: 2px;
    padding: 6px;
    line-height: 0;
}

.share_sec {
    border-top: 1px solid white;
    padding: 1.25rem 0;

}

`

export default Style;