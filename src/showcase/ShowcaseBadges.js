import React, {Component} from "react";
import {pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import Badge, {
    B_MD,
    B_SM,
    B_XS,
    B_LG,
    BADGE_TINT_PRIMARY,
    BADGE_TINT_SECONDARY,
    BADGE_TINT_SUCCESS,
    BADGE_TINT_WARNING,
    BADGE_TINT_DARK,
    BADGE_TINT_DANGER,
    BADGE_TINT_PINK,
    BADGE_TINT_INDIGO,
    BADGE_TINT_ORANGE
} from '../component/Badge';

const tints = [BADGE_TINT_PRIMARY, BADGE_TINT_SECONDARY, BADGE_TINT_SUCCESS, BADGE_TINT_WARNING, BADGE_TINT_DARK, BADGE_TINT_DANGER];
export default class ShowcaseBadges extends Component {
    render() {
        const marginClass = 'mr-2 mt-2';
        const text = "Badge";
        const iconClass = "fa fa-star";
        return (
            <>
                {pageNavigationBar("Badges")}

                <section className="container mt-10 mb-5">
                    
                    {sectionTitle("Normal")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} tint={t}/>
                    )}
                    {sectionTitle("Pill")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} pill tint={t}/>
                    )}
                    {sectionTitle("Soft")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} soft tint={t}/>
                    )}
                    {sectionTitle("Soft & Pill")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} soft pill tint={t}/>
                    )}
                    {sectionTitle("Reverse & Pill")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} pill reverse tint={t}/>
                    )}
                    {sectionTitle("Reverse & Soft")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} soft reverse tint={t}/>
                    )}
                    {sectionTitle("Reverse & Soft & Pill")}
                    {tints.map(t => 
                        <Badge icon={iconClass} className={marginClass} text={text} soft pill reverse tint={t}/>
                    )}
                    {sectionTitle("Without icon")}
                    {tints.map(t => 
                        <Badge className={marginClass} text={text} tint={t}/>
                    )}
                    {sectionTitle("Soft without icon")}
                    {tints.map(t => 
                        <Badge className={marginClass} text={text} soft tint={t}/>
                    )}
                    {sectionTitle("Pill without icon")}
                    {tints.map(t => 
                        <Badge className={marginClass} text={text} pill tint={t}/>
                    )}
                    {sectionTitle("Soft & Pill without icon")}
                    {tints.map(t => 
                        <Badge className={marginClass} text={text} soft pill tint={t}/>
                    )}
                    {sectionTitle("Without text")}
                    {tints.map(t => 
                        <Badge className={marginClass} icon={iconClass} tint={t}/>
                    )}
                    {sectionTitle("Soft without text")}
                    {tints.map(t => 
                        <Badge className={marginClass} icon={iconClass} soft tint={t}/>
                    )}
                    {sectionTitle("Pill without text")}
                    {tints.map(t => 
                        <Badge className={marginClass} icon={iconClass} pill tint={t}/>
                    )}
                    {sectionTitle("Soft & Pill without text")}
                    {tints.map(t => 
                        <Badge className={marginClass} icon={iconClass} soft pill tint={t}/>
                    )}
                    {sectionTitle("Without background color")}
                    <Badge className={marginClass} icon={iconClass} text={text} pill />
                    <Badge className={marginClass} icon={iconClass} text={text} pill reverse />
                    <Badge className={marginClass} text={text} pill />
                    <Badge className={marginClass} icon={iconClass} pill />
                    {sectionTitle("Different sizes")}
                    <Badge className={marginClass} icon={iconClass} text={text} pill size={B_XS} tint={tints[0]}/>
                    <Badge className={marginClass} icon={iconClass} text={text} pill size={B_SM} tint={tints[1]}/>
                    <Badge className={marginClass} icon={iconClass} text={text} pill size={B_MD} tint={tints[2]}/>
                    <Badge className={marginClass} icon={iconClass} text={text} pill size={B_LG} tint={tints[3]}/>
                    {sectionTitle("Custom colors")}
                    <Badge className={marginClass} icon={iconClass} text={text} tint={BADGE_TINT_PINK}/>
                    <Badge className={marginClass} icon={iconClass} text={text} tint={BADGE_TINT_INDIGO}/>
                    <Badge className={marginClass} icon={iconClass} text={text} tint={BADGE_TINT_ORANGE}/>
                    

                    

                </section>
            </>);
    }

}