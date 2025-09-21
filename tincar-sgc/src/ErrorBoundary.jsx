import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-bold text-red-600">Ha ocurrido un error</h2>
          <p className="mt-2 text-sm">Mensaje: {this.state.error?.message}</p>
          <pre className="mt-4 bg-gray-100 p-3 rounded text-xs overflow-auto">
            {this.state.info?.componentStack || ''}
          </pre>
          <div className="mt-4">
            <button onClick={() => window.location.reload()} className="px-3 py-2 bg-tincar-gold rounded">Recargar</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
