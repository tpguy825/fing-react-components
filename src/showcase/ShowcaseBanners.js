import React from "react";
import { pageNavigationBar, sectionTitle } from "./ShowcaseUtils";
import DiscountRightArrow from "../component/DiscountRightArrow";
import SideBanner from "../component/SideBanner";
import ActionButton, { BTN_SIZE_BIG } from "../component/ActionButton";

export default class ShowcaseBanners extends React.Component {
    render() {
        return <>
            {pageNavigationBar("Banners")}

            <section className="container mt-10 mb-5">
                <h2>Banners</h2>
                <p>
                    Banners are more or less decorated strips or boxes that hold important information that require the attention of the user
                </p>
                {sectionTitle('Discount Right Arrow')}
                <DiscountRightArrow 
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore" 
                />
                {sectionTitle('Side Banner')}
                <div className="small my-3">Basic <code>SideBanner</code> with default values and a simple <code>div</code> as target. Target is optional</div>
                <SideBanner target={<div className="bg-success text-light text-center">Test target</div>}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </SideBanner>
                <div className="small mt-3" style={{ marginBottom: "30vh" }}>
                    Dismissible <code>SideBanner</code> with different styling, a more complex body and a close callback. It shows also the width responsitivity with a width set to 50% for the whole component and at 75% for the balloon.<br />
                    This example makes also use of the <code>floating</code> option, which means that space will be reserved
                    only for the target (the button here) and the balloon will appear as 'floating' above that, so that dismissing doesn't move the target up
                </div>
                <SideBanner className="w-50"
                    floating
                    balloonClass="w-75 mx-auto"
                    styling="primary" 
                    onClose={() => console.log("SideBanner closed")}
                    target={<ActionButton size={BTN_SIZE_BIG} title="Test button" action={() => console.log('action')} />}
                >
                    <h5>Title</h5>
                    <hr />
                    <p>
                        Click the close button and look in the devtools console. When dismissed, a message should be logged that confirms the operation
                    </p>
                </SideBanner>
            </section>
        </>;
    }
}