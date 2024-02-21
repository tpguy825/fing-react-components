import React, {PureComponent} from 'react';

export default class LinkCard extends PureComponent {

    render() {
        const {action} = this.props;
        return (
            <a role={action ? "button" : "generic"} className="h-100" onClick={action}>{this.props.children}</a>
        );
    }
}
