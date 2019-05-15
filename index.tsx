import * as React from "react";
interface State {
    throw: boolean
    errorInfo: React.ErrorInfo
    error: Error
}
export type ErrorChild = React.ReactNode | ((error?: Error, errorInfo?: React.ErrorInfo) => React.ReactNode);
export default function catchable<T>(WrappedComponent: React.ComponentType<T>, errorChild: ErrorChild = null): React.ComponentType<T> {
    return class CatchableComponetn extends React.Component<T, State> {
        constructor(props) {
            super(props);
            this.state = { throw: false, errorInfo: null, error: null };
        }
        componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
            this.setState({
                errorInfo, error, throw: true
            })
        }

        private renderError = () => {
            if (!errorChild) return "<span style='color:red'>Crashed</span>"
            try {
                return typeof errorChild === "function" ? errorChild(this.state.error, this.state.errorInfo) : errorChild;
            } catch (error) {
                return "<span style='color:red'>Error Child Crashed</span>"
            }
        }

        render() {
            return this.state.throw ? this.renderError() : <WrappedComponent {...this.props} />;
        }
    }
}