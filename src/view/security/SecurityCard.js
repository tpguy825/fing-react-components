import React, { Children } from "react";
import intl from "react-intl-universal";
import SummaryCard from "../../component/summary/SummaryCard";
import SummaryCardBody from "../../component/summary/SummaryCardBody";
import SummaryCardFooter from "../../component/summary/SummaryCardFooter";
import CardPanel from "../../component/CardPanel";
import SecurityCardButton, { SecurityCardButtonGroup } from "./SecurityCardButton";
import { SCRD_STATUS_OK, SCRD_STATUS_WARN, SCRD_STATUS_FAIL, SCRD_STATUS_INACTIVE } from "../../model/Constants";
import { SI_STATUS_SUCCESS, SI_STATUS_WARNING, SI_STATUS_DANGER, SI_STATUS_SYNC } from '../../component/icons/StatusIcon';
import PremiumBadge from "./PremiumBadge";

export default class SecurityCard extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        const { title, subtitle, hasBadge } = this.props;

        const hasMoreThanOneButton = this.hasMultipleButtons();

        return <SummaryCard badgeIcon={hasBadge && <PremiumBadge />} background={this.getBackground()}>
            <SummaryCardBody reduce={hasMoreThanOneButton}>
                <CardPanel title={title} 
                    subtitle={subtitle} 
                    icon={this.getIcon()} 
                    usePlusIcon={this.props.status === SCRD_STATUS_INACTIVE} 
                />
            </SummaryCardBody>
            <SummaryCardFooter expand={hasMoreThanOneButton}>
                {this.renderActions()}
            </SummaryCardFooter>
        </SummaryCard>;
    }

    renderActions() {
        if (this.props.status === SCRD_STATUS_INACTIVE) {
            return this.renderUpsellAction();
        }

        const children = this.props.children;

        return this.hasMultipleButtons()
            ? <SecurityCardButtonGroup>{children}</SecurityCardButtonGroup>
            : children
        ;
    }

    renderUpsellAction() {
        const onAction = () => this.ref.current && this.ref.current.click();

        return <div ref={this.ref} id="security-card-button-upsell-action-marker">
            <SecurityCardButton title={intl.get("security_score_upgrade_to_unlock")} action={onAction}/>
        </div>;
    }

    getBackground() {
        return this.props.status === SCRD_STATUS_FAIL ? "bg-soft-danger" : "bg-white";
    }

    getIcon() {
        if (this.icon && this.props.status !== SCRD_STATUS_INACTIVE) {
            return this.icon;
        }
        
        switch (this.props.status) {
            case SCRD_STATUS_OK:
                return SI_STATUS_SUCCESS;

            case SCRD_STATUS_WARN:
                return SI_STATUS_WARNING;

            case SCRD_STATUS_FAIL:
                return SI_STATUS_DANGER;

            case SCRD_STATUS_INACTIVE:
                return SI_STATUS_SYNC;

            default:
                return "";
        }
    }

    hasMultipleButtons() {
        return Children.count(this.props.children) > 1;
    }
}