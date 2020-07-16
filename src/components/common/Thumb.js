import React, {Component} from 'react';

export default class Thumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            thumb: undefined,
        };
    }

    componentDidMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        if (!props.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(props.file);
        });
    };

    render() {
        const { file, height = 200, width = 200 } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <div>loading...</div>; }

        return (<img src={thumb}
                     alt={file.name}
                     height={height}
                     width={width}/>
                     );
    }
}