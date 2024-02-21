import React from "react";
import NavigationBar from "../component/NavigationBar";
import ActionButton, {BTN_TINT_DARK, BTN_TYPE_GHOST} from "../component/ActionButton";

export function pageNavigationBar(title) {
    return (
        <header id="header" className="header header-sticky-top bg-white container pt-2">
            <NavigationBar
                left={<ActionButton route="/" title="Back to Home" icon='fa-arrow-left'
                                    type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true} />}
                title={title}/>
        </header>);
}

export function sectionTitle(title) {
    return <><h3 className="mt-9 text-primary">{title}</h3></>
}

export function codeBlock(...children) {
    return (<div className="bg-dark rounded-lg p-4 text-monospace font-size-1 text-white-70 mb-3">
        {children}
    </div>);
}

export function codeLine(line) {
    return <span className="d-block">{line}</span>
}
