import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUrl: "",
      shortUrl: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ originalUrl: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { originalUrl } = this.state;

    this.setState({ error: "", shortUrl: "" });

    if (!originalUrl.startsWith("http")) {
      this.setState({ error: "Please enter a valid URL starting with http or https" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/shorten", {
        originalUrl,
      });
      this.setState({ shortUrl: response.data.shortUrl, originalUrl: "" });
    } catch (err) {
      this.setState({ error: "Error shortening the URL. Please try again." });
    }
  };

  render() {
    const { originalUrl, shortUrl, error } = this.state;

    return (
      <div style={{ maxWidth: "600px", margin: "100px auto", textAlign: "center", fontFamily: "Arial" }}>
        <h2>URL Shortener</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="url"
            placeholder="Enter a URL"
            value={originalUrl}
            onChange={this.handleChange}
            required
            style={{ padding: "10px", width: "70%", marginBottom: "10px" }}
          />
          <br />
          <button type="submit" style={{ padding: "8px 20px" }}>
            Shorten
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {shortUrl && (
          <p style={{ marginTop: "20px" }}>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    );
  }
}

export default App;
