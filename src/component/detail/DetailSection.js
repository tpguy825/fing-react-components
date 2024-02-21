import React, {Component} from 'react';
import DetailSectionHeader from "./DetailSectionHeader";

export default class DetailSection extends Component {
    render() {
        const {title, element, className} = this.props;
        const cName = className || "my-3";
        const content = React.Children.toArray(this.props.children).map(val => <div className="mb-2">{val}</div>)
        return (
            <section className={cName}>
                <DetailSectionHeader title={title} element={element} />
                {React.Children.toArray(content)}
            </section>
        )
    }
}