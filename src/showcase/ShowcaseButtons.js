import React, {Component} from "react";
import {codeBlock, codeLine, pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import ActionButton, {
    BTN_SIZE_BIG,
    BTN_SIZE_JUMBO,
    BTN_TINT_DANGER,
    BTN_TINT_DARK,
    BTN_TINT_NAVY,
    BTN_TINT_PRIMARY,
    BTN_TINT_WARNING,
    BTN_TYPE_DEFAULT,
    BTN_TYPE_GHOST,
    BTN_TYPE_LINK,
    BTN_TYPE_OUTLINE,
    BTN_TYPE_SOFT
} from "../component/ActionButton";
import DropdownButton from "../component/DropdownButton";

export default class ShowcaseButtons extends Component {
    componentDidMount() {
        window.initDropdown();
    }

    render() {
        return (
            <>
                {pageNavigationBar("Buttons")}

                <section className="container mt-10 mb-5">
                    <h2>Buttons</h2>
                    <p>
                        Use Visual Languages's button for actions in navigation bars, forms, dialogs, and more.
                    </p>
                    {codeBlock(
                        codeLine('<ActionButton route="/" title="Go to Route" />'),
                        codeLine('<ActionButton route="/" title="Go to Route" type={BTN_TYPE_SOFT}} />')
                        )}

                    {sectionTitle("Button Targets")}
                    <p className='small'>
                        Use one property among <code>route</code>, <code>url</code> or <code>action</code> to react
                        properly to button clicks.
                    </p>
                    <ActionButton className="mx-2" route="/" title="Go to Route"/>
                    <ActionButton className="mx-2" url="https://www.fing.com" title="Go to hyperlink"/>
                    <ActionButton className="mx-2" action={() => {
                        window.alert("You clicked me");
                    }} title="React to click"/>

                    {sectionTitle('Button Sizes')}
                    <p className='small'>
                        Use the property <code>size</code> with the bootstrap btn size class.
                    </p>
                    {codeBlock(
                        codeLine('<ActionButton route="/" title="Big" size={BTN_SIZE_BIG} />')
                    )}
                    <ActionButton className="mx-2" title="Button (Standard)"/>
                    <ActionButton className="mx-2" title="Button Big" size={BTN_SIZE_BIG}/>
                    <ActionButton className="mx-2" title="Button Jumbo" size={BTN_SIZE_JUMBO}/>

                    {sectionTitle('Button Types')}
                    <p className='small'>
                        Use the property <code>type</code> with the bootstrap btn style class.
                    </p>
                    {codeBlock(
                        codeLine('<ActionButton route="/" title="Go to Route" type={BTN_TYPE_OUTLINE} />')
                    )}
                    <div className="mb-2">
                        <ActionButton className="mx-2" title="Standard (Primary)" type={BTN_TYPE_DEFAULT} />
                        <ActionButton className="mx-2" title="Outline" type={BTN_TYPE_OUTLINE}/>
                        <ActionButton className="mx-2" title="Soft" type={BTN_TYPE_SOFT}/>
                        <ActionButton className="mx-2" title="Ghost" type={BTN_TYPE_GHOST}/>
                        <ActionButton className="mx-2" title="Link" type={BTN_TYPE_LINK}/>
                    </div>
                    <div className="mb-2">
                        <ActionButton className="mx-2" title="Success" tint={BTN_TINT_PRIMARY} />
                        <ActionButton className="mx-2" title="Warning" tint={BTN_TINT_WARNING} />
                        <ActionButton className="mx-2" title="Danger" tint={BTN_TINT_DANGER} />
                        <ActionButton className="mx-2" title="Dark" tint={BTN_TINT_DARK} />
                        <ActionButton className="mx-2" title="Navy" tint={BTN_TINT_NAVY} />
                    </div>
                    <div className="mb-2">
                        <ActionButton className="mx-2" title="Success" type={BTN_TYPE_OUTLINE} tint={BTN_TINT_PRIMARY} />
                        <ActionButton className="mx-2" title="Warning" type={BTN_TYPE_SOFT} tint={BTN_TINT_WARNING} />
                        <ActionButton className="mx-2" title="Danger" type={BTN_TYPE_GHOST} tint={BTN_TINT_DANGER} />
                        <ActionButton className="mx-2" title="Dark" type={BTN_TYPE_LINK} tint={BTN_TINT_DARK} />
                    </div>
                    <div className="mb-2">
                        <ActionButton title="Refresh" rounded={true} className='mx-2 text-uppercase'/>
                    </div>

                    {sectionTitle('Button with Chevron')}
                    <p className='small'>
                        Use the property <code>chevron</code> with the font-awesome style class. Chevrons appear to the
                        right side of the button text (no left-to-right support at the moment).
                        Chevron should be used when the action leads the user to some other place, like an external
                        website, a new page, a share dialog. If you want to emphasize the action with an icon, use
                        the propery <code>icon</code> instead
                    </p>
                    <ActionButton className="mx-2" title="Download" chevron='fa-chevron-right'/>
                    <ActionButton className="mx-2" title="Next" chevron='fa-arrow-right'/>
                    <ActionButton className="mx-2" title="Share" chevron='fa-share'/>

                    {sectionTitle('Button with Icon')}
                    <p className='small'>
                        Use the property <code>icon</code> with the font-awesome style class. Icons appear to the
                        left side of the button text (no left-to-right support at the moment).
                    </p>
                    <ActionButton className="mx-2" title="Add user" icon='fa-plus'
                                  type={BTN_TYPE_SOFT}/>
                    <ActionButton className="mx-2" route="/" title="Back to Home" icon='fa-arrow-left'
                                  type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK}/>

                    {sectionTitle('Button with State')}
                    <p className='small'>
                        Use the property <code>disabled</code> to render a disabled button. Use the property
                        <code>running</code> for a disabled button with a waiting spinner.
                    </p>
                    <ActionButton className="mx-2" title="Add user" icon='fa-plus' disabled={true}
                                  type={BTN_TYPE_SOFT}/>
                    <ActionButton className="mx-2" title="Add user" icon='fa-plus' running={true}
                                  type={BTN_TYPE_SOFT}/>

                    {sectionTitle('Button with Badge')}
                    <p className='small'>
                        Use the property <code>disabled</code> to render a disabled button. Use the property
                        <code>running</code> for a disabled button with a waiting spinner.
                    </p>
                    <ActionButton className="mx-2" route="/" title={<span>You have warnings<span className="badge badge-pill badge-warning ml-2 px-2">3</span></span>}/>

                    {sectionTitle('Dropdown Button')}
                    <p className='small'>
                        Put your menu items as children, and pass <code>onItemSelected</code> to listen to
                        the clicked element.
                    </p>
                    <DropdownButton className="mx-2" title="Send report"
                                    type={BTN_TYPE_SOFT}
                                    onItemSelected={(idx) => {window.alert(`You selected item #${idx}`)}}
                    >
                        <span>Item #0</span>
                        <span>Item #1</span>
                        <span>Item #2</span>
                    </DropdownButton>
                    <DropdownButton className="mx-2" title="Send report"
                                    type={BTN_TYPE_SOFT}
                                    onItemSelected={(idx) => {window.alert(`You selected item #${idx}`)}}
                    >
                        <span>Item #0</span>
                        <span>Item #1</span>
                        <span>Item #2</span>
                    </DropdownButton>
                </section>
            </>
        );
    }

}